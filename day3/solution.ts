import fs from "fs";

const data = fs.readFileSync('./day3/inputDay3.txt', 'utf-8')
// const data = `00100
// 11110
// 10110
// 10111
// 10101
// 01111
// 00111
// 11100
// 10000
// 11001
// 00010
// 01010`
const strings: string[] = data.split("\n");
// const nums: number[] = strings.map(string => Number(string))

type acc = { 0: number, 1: number }

let gammaString = "";
let epsilonString = "";

const calculateDecimal = (binary: string) => {
    let decimal = 0;
    for (let i = 0; i < binary.length; i++) {
        decimal += Number(binary[i]) * 2 ** (binary.length - i - 1);
    }
    return decimal;
}

const solution = () => {
    for (let i = 0; i < strings[0].length; i++) {
        const acc = strings.reduce((acc: acc, num: string) => {
            if (num[i] === "0") {
                console.log('num[i]>0', num[i]);
                return {
                    ...acc,
                    0: acc[0] + 1,
                }
            } else {
                console.log('num[i]<0', num[i]);
                return {
                    ...acc,
                    1: acc[1] + 1,
                }
            }
        }, { 0: 0, 1: 0 })
        if (acc[0] > acc[1]) {
            gammaString = gammaString + "0"
        } else {
            gammaString = gammaString + "1"
        }
    }
    for (let char of gammaString) {
        if (char === "0") {
            epsilonString = epsilonString + "1";
        } else {
            epsilonString = epsilonString + "0";
        }
    }
    return calculateDecimal(epsilonString) * calculateDecimal(gammaString);
}

const calculateGamma = (i: number, binaries: string[]): any => {
    if (binaries.length === 1) { return calculateDecimal(binaries[0]) }
    let filtered = [];
    console.log('i', i);
    console.log('strings', strings);
    const acc = binaries.reduce((acc: acc, num: string) => {
        if (num[i] === "0") {
            console.log('num[i]===0', num[i]);
            return {
                ...acc,
                0: acc[0] + 1,
            }
        } else {
            console.log('num[i]===1', num[i]);
            return {
                ...acc,
                1: acc[1] + 1,
            }
        }
    }, { 0: 0, 1: 0 });
    if (acc[0] > acc[1]) {
        console.log('acc[0]>acc[1]', acc[0] > acc[1]);
        filtered = binaries.filter(binary => binary[i] === "0")
        console.log('filtered', filtered);
    } else {
        console.log('acc[0]<=acc[1]', acc[0] < acc[1]);
        filtered = binaries.filter(binary => binary[i] === "1")
        console.log('filtered', filtered);
    }
    i += 1
    return calculateGamma(i, filtered);
}

const calculateEpsilon = (i: number, binaries: string[]): any => {
    if (binaries.length === 1) { return calculateDecimal(binaries[0]) }
    let filtered = [];
    const acc = binaries.reduce((acc: acc, num: string) => {
        if (num[i] === "0") {
            console.log('num[i]>0', num[i]);
            return {
                ...acc,
                0: acc[0] + 1,
            }
        } else {
            console.log('num[i]<0', num[i]);
            return {
                ...acc,
                1: acc[1] + 1,
            }
        }
    }, { 0: 0, 1: 0 });
    if (acc[0] <= acc[1]) {
        filtered = binaries.filter(binary => binary[i] === "0")
    } else {
        console.log('acc[0]<acc[1]', acc[0] < acc[1]);
        filtered = binaries.filter(binary => binary[i] === "1")
    }
    i += 1;
    return calculateEpsilon(i, filtered)
}

const solution2 = calculateEpsilon(0, strings) * calculateGamma(0, strings);

console.log('solution2', solution2);


