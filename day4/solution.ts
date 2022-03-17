import * as fs from "fs";

const data = fs.readFileSync('./day4/input4.txt', 'utf-8');
const blocks: string[] = data.split("\n\n")
const bingoNumbers: number[] = blocks[0].split(",").map(string => Number(string))

type Square = { number: number, checked: boolean }
type Board = Square[][]
let bingoBoards: Board[] = blocks
    .slice(1)
    .map(board => board.trim().split("\n")
        .map(slice => slice.split(" ")
            .filter(str => str !== '')
            .map((string): Square => ({ number: Number(string), checked: false }))
        ));


type Bingo = { board: Board, index: number, bingoNumber: number }
const calculateBingoScore = (bingoWinner: Bingo) => {
    let uncheckedSum = 0;
    for (let row of bingoWinner.board) {
        for (let cell of row) {
            if (cell.checked === false) {
                uncheckedSum += cell.number
            }
        }
    }
    return uncheckedSum * bingoWinner.bingoNumber;
}

const isThereBingo = (bingoBoard: Board, bingoNumber: number): any => {

    for (let row of bingoBoard) {
        let count = 0;
        for (let square of row) {
            if (square.checked) {
                count += 1;
            }
            if (count == 5) {
                return { board: bingoBoard, index: bingoBoards.indexOf(bingoBoard), bingoNumber };
            }
        }

        for (let i = 0; i < bingoBoard[0].length; i++) {
            let count = 0
            for (let row of bingoBoard) {
                if (row[i].checked) {
                    count += 1;
                }
                if (count == 5) {
                    return { board: bingoBoard, index: bingoBoards.indexOf(bingoBoard), bingoNumber };
                }
            }
        }
    }
    return null;
}

const updateBoard = (board: Board, bingoNumber: any) => {
    let changed = false;
    const updated = board.map(row => row.map(cell => {
        if (cell.number == bingoNumber) {
            changed = true;
            return { ...cell, checked: true }
        } else {
            return cell;
        }
    }))
    let isWinner = null
    if (changed) {
        isWinner = isThereBingo(updated, bingoNumber)
    }
    return { board: updated, isWinner };
}

const bingo = (boards: Board[], bingoNumbers: number[]) => {
    for (let updatedBoards = boards, numberIndex = 0; numberIndex < bingoNumbers.length; numberIndex += 1) {
        let newBoards: Board[] = [];
        for (let board of updatedBoards) {
            let updated = updateBoard(board, bingoNumbers[numberIndex]);
            if (updated.isWinner) {
                return calculateBingoScore(updated.isWinner)
            } else {
                newBoards.push(updated.board)
            }
        }
        updatedBoards = newBoards;
    }
}

const absoluteLoser = (boards: Board[], bingoNumbers: number[]) => {
    let winners: Bingo[] = []
    for (let updatedBoards = boards, numberIndex = 0; numberIndex < bingoNumbers.length; numberIndex += 1) {
        let newBoards: Board[] = [];
        for (let board of updatedBoards) {
            let updated = updateBoard(board, bingoNumbers[numberIndex]);
            if (updated.isWinner) {
                winners.push(updated.isWinner)
                if (winners.length == bingoBoards.length) {
                    return calculateBingoScore(winners.at(-1));
                }
            } else {
                newBoards.push(updated.board)
            }
        }
        updatedBoards = newBoards;
    }
    return calculateBingoScore(winners.at(-1));
}
