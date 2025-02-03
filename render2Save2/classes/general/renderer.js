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

    putPixel(truePos, r, g, b, a) {
        let a1 = this.data[truePos + 3]

        if (a1 == 0) {
            this.data[truePos] = r
            this.data[truePos + 1] = g
            this.data[truePos + 2] = b
            this.data[truePos + 3] = a
        } else if (a1 < 255) {
            let r1 = this.data[truePos]
            let g1 = this.data[truePos + 1]
            let b1 = this.data[truePos + 2]

            let part1 = (255 - a)

            this.data[truePos] = (r1 * part1 + r * a) / 255
            this.data[truePos + 1] = (g1 * part1 + g * a) / 255
            this.data[truePos + 2] = (b1 * part1 + b * a) / 255
            this.data[truePos + 3] = 255 - ((255 - a1) * part1 / 255)
        }
    }

    render() {
        this.ctx.clearRect(-1 * this.halfWidth, -1 * this.halfHeight, this.width, this.height)
        this.data = new Uint8ClampedArray(this.arrLength * 4)
            
        let shapes = {
            "cube": Cube,
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
            sel.traceTriangles()
        }

        this.imageData = new ImageData(this.data, this.width)
        this.ctx.putImageData(this.imageData, 0, 0)
    }
}