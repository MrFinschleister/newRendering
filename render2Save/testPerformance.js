let iterations1 = 10
let iterations2 = 100

function testPerformance() {
    let time1 = performance.now()

    for (let x = 0; x < iterations1; x++) {

        for (let y = 0; y < iterations2; y++) {

        }
    }

    let time2 = performance.now()

    for (let x = 0; x < iterations1; x++) {

        for (let y = 0; y < iterations2; y++) {

        }
    }

    let time3 = performance.now()

    let f1 = (time2 - time1) / iterations1
    let f2 = (time3 - time2) / iterations1

    alert("Time 1: " + f1 + " \nTime 2: " + f2 + " \nDifference: " + (f1 - f2) + ", " + (f1 / f2) * 100 + "%")
}