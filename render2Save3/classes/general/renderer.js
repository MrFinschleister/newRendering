class Renderer {
    constructor(canvas, ctx, scalar) {
        this.canvas = canvas
        this.ctx = ctx
        
        this.scalar = scalar
    } 

    setCanvas() {
        this.width = this.canvas.clientWidth
        this.height = this.canvas.clientHeight
        this.halfWidth = this.width / 2
        this.halfHeight = this.height / 2
        this.arrLength = this.width * this.height

        this.canvas.width = this.width
        this.canvas.height = this.height
        this.ctx.translate(this.halfWidth, this.halfHeight)
        this.ctx.scale(1, -1)
    }

    putPixel(truePos, r, g, b, a, z) {
        let z1 = this.zValues[truePos / 4]
        let a1 = this.data[truePos + 3]

        if (a1 == 0 || z < z1) {
            this.data[truePos] = r
            this.data[truePos + 1] = g
            this.data[truePos + 2] = b
            this.data[truePos + 3] = a * (z / this.scalar) * 1.1

            this.zValues[truePos / 4] = z
        } else {
            return
        }
    }

    render() {
        this.ctx.clearRect(-1 * this.halfWidth, -1 * this.halfHeight, this.width, this.height)
        this.data = new Uint8ClampedArray(this.arrLength * 4)
        this.zValues = new Int16Array(this.arrLength)
            
        let shapes = {
            "cube": Cube,
            "circle": Circle,
            "sphere": Sphere,
        }

        let faces = []

        for (let x = 0; x < objects.length; x++) {
            let obj = objects[x]

            let sel = new shapes[obj.shape](obj)

            sel.constructFaces()

            faces = faces.concat(sel.faces)
        }

        faces = faces.filter((a) => a.avgZ() > 0)
        faces.sort((a, b) => a.avgZ() - b.avgZ())

        for (let x = 0; x < faces.length; x++) {
            let sel = faces[x]

            sel.breakTriangles()
        }

        this.imageData = new ImageData(this.data, this.width)
        this.ctx.putImageData(this.imageData, 0, 0)
    }
}