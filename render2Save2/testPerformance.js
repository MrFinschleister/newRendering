let iterations1 = 10000
let iterations2 = 10000

function testPerformance() {
    let time1 = 0

    for (let x = 0; x < iterations1; x++) {
        let start = performance.now()
        for (let y = 0; y < iterations2; y++) {
            let a = 5
            let b = 8
            let c = a / b
        }
        time1 += performance.now() - start
    }

    let time2 = 0

    for (let x = 0; x < iterations1; x++) {
        let start = performance.now()
        for (let y = 0; y < iterations2; y++) {
            let a = 5
            let b = 0.125
            let c = a * b
        }
        time2 += performance.now() - start
    }

    let f1 = time1 / iterations1
    let f2 = time2 / iterations1

    alert("Total Time: " + (f1 + f2) * iterations1 + "\nTime 1: " + f1 + " \nTime 2: " + f2 + " \nDifference: " + (f1 - f2) + ", " + (f1 / f2) * 100 + "%")
}