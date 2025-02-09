class Polygon {
    constructor(points, fillColor) {
        this.points = points
        this.fillStyle = fillColor || new RGBA(0, 0, 0, 123)

        this.colorR = this.fillStyle.r
        this.colorG = this.fillStyle.g
        this.colorB = this.fillStyle.b
        this.colorA = this.fillStyle.a
    }

    breakTriangles() {
        this.facesRendered = 0
        for (let x = 0; x < this.points.length; x++) {
            let newPoint = this.points[x].scaleZ(game.renderer.scalar, game.camera.viewOrigin)
            newPoint.x += game.renderer.halfWidth
            newPoint.y = game.renderer.halfHeight - newPoint.y
            this.points[x] = newPoint.round()
        }

        for (let x = 0; x < this.points.length - 2; x++) {
            let p1
            let p2
            let p3

            if (x & 1) {
                p1 = this.points[x]
                p2 = this.points[x + 2]
                p3 = this.points[x + 1]
            } else {
                p1 = this.points[x]
                p2 = this.points[x + 1]
                p3 = this.points[x + 2]
            }

            this.traceTriangle(p1.x, p2.x, p3.x, p1.y, p2.y, p3.y, p1.z, p2.z, p3.z)
        }
    }

    traceTriangle(x1, x2, x3, y1, y2, y3, z1, z2, z3) {
        let colorR = this.colorR
        let colorG = this.colorG
        let colorB = this.colorB
        let colorA = this.colorA

        let width = game.renderer.width
        let height = game.renderer.height

        let minX = Math.min(x1, x2, x3)
        let minY = Math.min(y1, y2, y3)
        let maxX = Math.max(x1, x2, x3)
        let maxY = Math.max(y1, y2, y3)
        let minZ = Math.min(z1, z2, z3)
        let avgZ = (z1 + z2 + z3) / 3
        let colorA2 = colorA * (avgZ / game.renderer.scalar)

        const normal = ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3)) << 0

        if (normal <= 0 || minZ <= 0 || maxX < 0 || minX >= width || maxY < 0 || minY >= height) {
            return
        }

        this.facesRendered++

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

        const part1 = (y2 - y3) / normal
        const part2 = (x3 - x2) / normal
        const part3 = x3 * part1 + y3 * part2
        const part4 = (y3 - y1) / normal
        const part5 = (x1 - x3) / normal
        const part6 = x3 * part4 + y3 * part5

        let index1 = (minY * width + minX) * 4
        let a1 = minX * part1 + minY * part2 - part3
        let b1 = minX * part4 + minY * part5 - part6
        let c1 = 1 - a1 - b1

        let width2 = width * 4

        for (let x = minX; x < maxX; x++) {
            let index2 = index1
            let a2 = a1 + 0.001
            let b2 = b1 + 0.001
            let c2 = c1 + 0.001
            for (let y = minY; y < maxY; y++) {
                if (a2 >= 0 && b2 >= 0 && c2 >= 0) {
                    game.renderer.putPixel(index2, colorR, colorG, colorB, colorA2, avgZ)
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