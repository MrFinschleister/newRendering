class Polygon {
    constructor(points, fillColor) {
        this.points = points
        this.fillStyle = fillColor || new RGBA(0, 0, 0, 123)

        this.colorR = this.fillStyle.r
        this.colorG = this.fillStyle.g
        this.colorB = this.fillStyle.b
        this.colorA = this.fillStyle.a
    }

    adjustPoints() {
        this.facesRendered = 0
        for (let x = 0; x < this.points.length; x++) {
            let newPoint = this.points[x].scaleZ(game.renderer.scalar, game.camera.viewOrigin)
            newPoint.x += game.renderer.halfWidth
            newPoint.y = game.renderer.halfHeight - newPoint.y

            this.points[x] = newPoint.round()
        }
    }
}