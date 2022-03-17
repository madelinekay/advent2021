import fs from 'fs'

const data = fs.readFileSync('./01-input.txt', 'utf-8')
const nums: number[] = data.split("\n").map(string => Number(string));

const part1 = (array: number[]) => {
  let increase: number = 0
  for (let i = 0; i < array.length; i++) {
    if (array[i + 1] > array[i]) {
      increase++
    }
  }

  return increase;
}


const part2 = () => {

  const arraySumOfThree: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const sumOfThree = nums[i] + nums[i + 1] + nums[i + 2]
    arraySumOfThree.push(sumOfThree)
  }
  console.log('sumOfThree', arraySumOfThree);
  return arraySumOfThree;
}

const arraySumOfThree = part2();
