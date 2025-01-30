class Polygon {
    constructor(points, fillColor, borderColor) {
        this.points = points
        this.fillStyle = fillColor || new RGBA(0, 0, 0, 75)
        this.strokeStyle = borderColor || new RGBA(0, 0, 0, 25)
    }

    clone() {
        return new Polygon(this.points, this.fillStyle, this.strokeStyle)
    }
}