import fs from 'fs'

type direction = { direction: string, degree: number }
const data = fs.readFileSync('./day2/input.txt', 'utf-8')

const directions: direction[] = data.split("\n").map(string => {
    const split = string.split(" ");
    return { direction: split[0], degree: +split[1] }
});
console.log('directions', directions);


let horizontalPosition: number = 0;
let depth: number = 0;
let aim: number = 0;

const calculatePosition = () => {
    for (let i = 0; i < directions.length; i++) {
        if (directions[i].direction === "forward") {
            horizontalPosition += directions[i].degree;
        }
        if (directions[i].direction === "up") {
            depth -= directions[i].degree;
        }
        if (directions[i].direction === "down") {
            depth += directions[i].degree;
        }
    }
    return horizontalPosition * depth;
}

const calculatePositionWithAim = () => {
    for (let i = 0; i < directions.length; i++) {
        if (directions[i].direction === "forward") {
            horizontalPosition += directions[i].degree;
            depth += aim * directions[i].degree;
        }
        if (directions[i].direction === "up") {
            aim -= directions[i].degree;
        }
        if (directions[i].direction === "down") {
            aim += directions[i].degree;
        }
    }
    console.log('horizontalPosition, depth', horizontalPosition, depth);
    return depth * horizontalPosition;
}

console.log('calculatePositionWithAim()', calculatePositionWithAim());