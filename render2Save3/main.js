let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let game = new Manager()

let objectModel = {
    shape: "cube",
    location: new Vector3(0, 0, 500),
    dimensions: new Vector3(250, 250, 250),
    rotations: new Vector3(0, 0, 0),
    color: new RGBA(50, 50, 100, 255),
    numFaces: 8,
}

let objects = [
]

function addObject() {
    objects.push(Object.assign({}, objectModel))
}

function removeObject() {
    objects.pop()
}

function onload() {
    try {
        let numObjs = 1

        for (let n = 0; n < numObjs; n++) {
            addObject()
        }

        game.constructObjects()
        game.finaliseObjects()
        //testPerformance()
    } catch (error) {
        alert(error.stack)
    }
}