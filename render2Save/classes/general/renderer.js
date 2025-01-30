class Renderer {
    constructor(canvas, ctx, scalar) {
        this.canvas = canvas
        this.ctx = ctx
        
        this.scalar = scalar
    } 

    setCanvas() {
        this.width = this.canvas.clientWidth
        this.height = this.canvas.clientHeight
        this.arrLength = this.width * this.height

        this.canvas.width = this.canvas.clientWidth
        this.canvas.height = this.canvas.clientHeight
        this.ctx.translate(this.width / 2, this.height / 2)
        this.ctx.scale(1, -1)
    }

    drawPolygon(obj) {
        this.ctx.fillStyle = obj.fillStyle
        this.ctx.strokeStyle = obj.strokeStyle

        let points = obj.points
        let p1 = points[points.length - 1]

        this.ctx.beginPath()
        this.ctx.moveTo(p1.x, p1.y)

        for (let x = 0; x < points.length; x++) {
            this.ctx.lineTo(points[x].x, points[x].y)
        }

        this.ctx.fill()
        this.ctx.stroke()
    }

    tracePolygon(obj) {
        let points = obj.points
        
        for (let i = 1; i < points.length - 1; i++) {
            let p2 = points[i]
            let p3 = points[i + 1]

            this.traceTriangle(points[0], p2, p3, obj.fillStyle)
        }
    }

    traceTriangle(p1, p2, p3, fillStyle) {
        let colorR = fillStyle.r
        let colorG = fillStyle.g
        let colorB = fillStyle.b
        let colorA = fillStyle.a

        let e1 = new Edge(p1, p2, p3)
        let e2 = new Edge(p2, p3, p1)
        let e3 = new Edge(p3, p1, p2)

        let edges = [e1, e2, e3]

        edges.sort((a, b) => a.edge.getMagnitude() + b.edge.getMagnitude())

        let selEdge = edges[0]

        let sel1 = selEdge.v1.clone()
        let edge1 = selEdge.edge
        let mag1 = edge1.getMagnitude()
        edge1 = edge1.scalarMultiplication(1 / mag1)

        for (let i1 = 0; i1 < mag1; i1++) {
            sel1.vRDifference(edge1)

            let sel2 = sel1.clone()
            let edge2 = sel2.vectorDifference(selEdge.v3)
            let mag2 = edge2.getMagnitude()
            edge2 = edge2.scalarMultiplication(1 / mag2)

            for (let i2 = 0; i2 < mag2; i2++) {
                sel2.vRDifference(edge2)

                let x = Math.round(sel2.x + this.width / 2)
                let y = Math.round(this.height / 2 - sel2.y)

                if (x * 4 < 0) {
                    if (mag1.x > 0 || mag2.x > 0) {
                        continue
                    } else {
                        break
                    }
                } else if (x > this.width) {
                    if (mag1.x < 0 || mag2.x < 0) {
                        continue
                    } else {
                        break
                    }

                }

                let truePos = ((y * this.width) + x) * 4

                let currA = this.data[truePos + 3]

                if (currA == 0) {
                    this.data[truePos] = colorR
                    this.data[truePos + 1] = colorG
                    this.data[truePos + 2] = colorB
                    this.data[truePos + 3] = colorA
                } else {
                    this.data[truePos] = fillStyle.combineR(this.data[truePos], currA)
                    this.data[truePos + 1] = fillStyle.combineG(this.data[truePos + 1], currA)
                    this.data[truePos + 2] = fillStyle.combineB(this.data[truePos + 2], currA)
                    this.data[truePos + 3] = fillStyle.combineA(currA)
                }

                if (true) {
                    continue
                }
            }
        }
    }

    render() {
        this.data = new Uint8ClampedArray(this.arrLength * 4)
                
        let cameraViewOrigin = game.camera.origin.vectorSum(game.camera.viewOffset)

        let shapes = {
            "cube": Cube,
        }

        for (let x = 0; x < objects.length; x++) {
            let obj = objects[x]

            let sel = new shapes[obj.shape](obj)
            sel.constructFaces()

            let faces = sel.faces

            for (let f = 0; f < faces.length; f++) {
                let selFace = faces[f].clone()

                let points = selFace.points

                for (let p = 0; p < points.length; p++) {
                    let selPoint = points[p].clone()

                    selPoint = selPoint.rotateDeg(sel.rots, sel.loc)
                    selPoint = selPoint.rotateDeg(game.camera.rotations, game.camera.origin)
                    selPoint = selPoint.scaleZ(this.scalar, cameraViewOrigin)

                    points[p] = selPoint
                }

                this.tracePolygon(selFace)
            }
        }

        this.imageData = new ImageData(this.data, this.width)
        this.ctx.putImageData(this.imageData, 0, 0)
    }
}