const data = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`

const dataSets = data
    .split("\n")
    .map(set =>
        set
            .trim()
            .split("->")
            .map(coordinate =>
                coordinate
                    .trim()
                    .split(",")
                    .map(char => Number(char.trim()))
            )
    );
console.log('dataSets', dataSets);