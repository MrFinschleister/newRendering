let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let game = new Manager()

let objects = [
    {
        shape: "cube",
        location: new Vector3(0, 0, 500),
        dimensions: new Vector3(250, 250, 250),
        rotations: new Vector3(0, 0, 0),
    },
]

function onload() {
    try {
        let numObjs = 0

        for (let n = 0; n < numObjs; n++) {
            objects.push(Object.assign({}, objects[0]))
        }

        game.constructObjects()
        game.finaliseObjects()
        //testPerformance()
    } catch (error) {
        alert(error.stack)
    }
}