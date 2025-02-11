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
        let a1 = this.data[truePos + 3]

        if (a1 != 0) {
            let z1 = this.zValues[truePos / 4]

            if (z > z1) {
                return
            }
        }
        
        this.data[truePos] = r
        this.data[truePos + 1] = g
        this.data[truePos + 2] = b
        this.data[truePos + 3] = a

        this.zValues[truePos / 4] = z
    }

    render() {
        let faces = []

        let shapes = {
            "cube": Cube,
            "circle": Circle,
            "sphere": Sphere,
        }

        for (let x = 0; x < objects.length; x++) {
            let obj = objects[x]

            let sel = new shapes[obj.shape](obj)

            sel.constructFaces()

            for (let y = 0; y < sel.faces.length; y++) {
                sel.faces[y].adjustPoints()

                faces.push(sel.faces[y])
            }
        }

        let width = this.width
        let height = this.height
        let scalar = this.scalar

        let width2 = width * 4

        let data = new Uint8ClampedArray(width2 * height)
        let zValues = new Uint16Array(width * height)

        for (let f = 0; f < faces.length; f++) {
            let sel = faces[f]
            let points = sel.points

            let colorR = sel.colorR
            let colorG = sel.colorG
            let colorB = sel.colorB
            let colorA = sel.colorA

            for (let p = 0; p < points.length - 2; p++) {
                let p1
                let p2
                let p3

                if (p & 1) {
                    p1 = points[p]
                    p2 = points[p + 2]
                    p3 = points[p + 1]
                } else {
                    p1 = points[p]
                    p2 = points[p + 1]
                    p3 = points[p + 2]
                }

                let x1 = p1.x
                let x2 = p2.x
                let x3 = p3.x
                let y1 = p1.y
                let y2 = p2.y
                let y3 = p3.y
                let z1 = p1.z
                let z2 = p2.z
                let z3 = p3.z

                let minX = Math.min(x1, x2, x3)
                let minY = Math.min(y1, y2, y3)
                let maxX = Math.max(x1, x2, x3)
                let maxY = Math.max(y1, y2, y3)
                let minZ = Math.min(z1, z2, z3)
                let avgZ = (z1 + z2 + z3) / 3
                let colorA2 = colorA * (avgZ / scalar)

                const normal = ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3)) << 0

                if (!(normal <= 0 || minZ <= 0 || maxX < 0 || minX >= width || maxY < 0 || minY >= height)) {
                    if (minX < 0) {
                        minX = 0
                    }
                    if (maxX >= width) {
                        maxX = width - 1
                    }
                    if (minY < 0) {
                        minY = 0
                    }
                    if (maxY >= height) {
                        maxY = height - 1
                    }

                    const part1 = (y2 - y3)
                    const part2 = (x3 - x2)
                    const part3 = (x3 * part1 + y3 * part2)
                    const part4 = (y3 - y1)
                    const part5 = (x1 - x3)
                    const part6 = (x3 * part4 + y3 * part5)

                    let index1 = (minY * width + minX) * 4 
                    let a1 = (minX * part1 + minY * part2 - part3)
                    let b1 = (minX * part4 + minY * part5 - part6)
                    let c1 = (normal - a1 - b1)

                    const rangeX = maxX - minX
                    const rangeY = maxY - minY

                    for (let x = 0; x < rangeX; x++) {
                        let index2 = index1
                        let a2 = a1
                        let b2 = b1
                        let c2 = c1
                        for (let y = 0; y < rangeY; y++) {
                            if (a2 >= 0 && b2 >= 0 && c2 >= 0) {
                                let flag2 = true

                                if (data[index2 + 3] != 0) {
                                    if (zValues[index2 / 4] < avgZ) {
                                        flag2 = false
                                    }
                                }

                                if (flag2) {
                                    data[index2] = colorR
                                    data[index2 + 1] = colorG
                                    data[index2 + 2] = colorB
                                    data[index2 + 3] = colorA2
        
                                    zValues[index2 / 4] = avgZ
                                }
                            }

                            index2 += width2
                            a2 += part2
                            b2 += part5
                            c2 -= part2 + part5
                        }

                        index1 += 4
                        a1 += part1
                        b1 += part4
                        c1 -= part1 + part4
                    }
                }
            }
        }

        this.ctx.putImageData(new ImageData(data, width), 0, 0)
    }
}