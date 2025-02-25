let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let game = new Manager()

let objectModel = {
    shape: "sphere",
    location: new Vector3(0, 0, 500),
    dimensions: new Vector3(250, 250, 250),
    rotations: new Vector3(0, 0, 0),
    color: new RGBA(50, 50, 100, 255),
    numFaces: 144,
}

let objects = [
]

function addObject() {
    let shape = objectModel.shape
    let location = objectModel.location.vectorSum(new Vector3(Math.round((Math.random() * 100) - 50), Math.round((Math.random() * 100) - 50), Math.round((Math.random() * 100) - 50)))
    let dimensions = objectModel.dimensions.clone()
    let rotations = objectModel.rotations.clone()
    let color = objectModel.color.clone()
    let numFaces = objectModel.numFaces

    let newObject = {
        shape: shape,
        location: location,
        dimensions: dimensions,
        rotations: rotations,
        color: color,
        numFaces: numFaces,
    }

    objects.push(newObject)
}

function removeObject() {
    objects.pop()
}

function onload() {
    try {
        let numObjs = 10

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