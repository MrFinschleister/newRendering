let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let game = new Manager()

let objectModel = {
    shape: "cube",
    location: new Vector3(0, 0, 500),
    dimensions: new Vector3(50, 50, 50),
    rotations: new Vector3(0, 0, 0),
    color: new RGBA(50, 50, 100, 255),
    numFaces: 576,
}

let objects = [
]

function addObject() {
    let newObject = Object.assign({}, objectModel)

    objects.push(newObject)
}

function removeObject() {
    objects.pop()
}

function onload() {
    try {
        let numObjs = 1

        for (let n = 0; n < numObjs; n++) {
            addObject(n)
        }

        game.constructObjects()
        game.finaliseObjects()
        //testPerformance()
    } catch (error) {
        alert(error.stack)
    }
}