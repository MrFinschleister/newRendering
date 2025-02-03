class Polygon {
    constructor(points, fillColor, borderColor) {
        this.points = points
        this.fillStyle = fillColor || new RGBA(0, 0, 0, 112)
        this.strokeStyle = borderColor || new RGBA(0, 0, 0, 112)

        this.triangles = []
    }

    avgZ() {
        return this.points.reduce((a, b) => a + b.z, 0) / this.points.length
    }

    clone() {
        return new Polygon(this.points, this.fillStyle, this.strokeStyle)
    }

    breakTriangles() {
        for (let x = 0; x < this.points.length; x++) {
            this.points[x] = this.points[x].scaleZ(game.renderer.scalar, game.camera.viewOrigin)
        }

        let p1 = this.points[0]

        for (let x = 0; x < this.points.length - 1; x++) {
            let p2 = this.points[x]
            let p3 = this.points[x + 1]

            this.triangles.push(new Triangle(p1.floor(), p2.floor(), p3.floor()))
        }
    }

    traceTriangles() {
        let colorR = this.fillStyle.r
        let colorG = this.fillStyle.g
        let colorB = this.fillStyle.b
        let colorA = this.fillStyle.a

        let halfWidth = game.renderer.halfWidth << 0
        let halfHeight = game.renderer.halfHeight << 0
        let width = game.renderer.width

        for (let t = 0; t < this.triangles.length; t++) {
            let sel = this.triangles[t]

            let p1 = sel.p1
            let p2 = sel.p2
            let p3 = sel.p3

            const x1 = p1.x
            const y1 = p1.y
            const x2 = p2.x
            const y2 = p2.y
            const x3 = p3.x
            const y3 = p3.y

            let minX = Math.min(x1, x2, x3)
            let minY = Math.min(y1, y2, y3)
            let maxX = Math.max(x1, x2, x3)
            let maxY = Math.max(y1, y2, y3)

            let minZ = Math.min(p1.z, p2.z, p3.z)

            if (minZ <= 0 || maxX < -halfWidth || maxY < -halfHeight || minX > halfWidth || minY > halfHeight) {
                continue
            }

            if (minX < -halfWidth) {
                minX = -halfWidth
            }
            if (minY < -halfHeight) {
                minY = -halfHeight
            }
            if (maxX > halfWidth) {
                maxX = halfWidth
            }
            if (maxY > halfHeight) {
                maxY = halfHeight
            }

            const area = ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3))
            
            for (let x = minX; x < maxX; x++) {
                let index = (halfHeight - minY) * width + (x + minX)

                for (let y = minY; y < maxY; y++) {
                    index += width

                    const part1 = x - x3
                    const part2 = y - y3

                    const a = ((y2 - y3) * part1 + (x3 - x2) * part2) / area
                    const b = ((y3 - y1) * part1 + (x1 - x3) * part2) / area
                    const c = 1 - a - b

                    if (a > 0 && b > 0 && c > 0) {
                        let index = (halfHeight - y) * width + (x + halfWidth)

                        game.renderer.putPixel(index * 4, colorR, colorG, colorB, colorA)
                    }
                }
            }
        }
    }
}