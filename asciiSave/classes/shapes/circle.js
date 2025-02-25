class Circle {
    constructor(obj){
        this.loc = obj.location
        this.dims = obj.dimensions
        this.rots = obj.rotations
        this.color = obj.color
    }

    constructFaces() {
        let halfDims = this.dims.scalarMultiplication(0.5)
        let rots = this.rots
        let loc = this.loc

        let numFaces = 16

        let initial = new Vector3(loc.x, loc.y + halfDims.y, loc.z)

        let points = [loc.rotateDeg(game.camera.rotations, game.camera.origin)]
        this.faces = []

        for (let x = 0; x < numFaces + 1; x++) {
            let newPoint = initial.rotateDeg(new Vector3(0, 0, (360 / numFaces) * x), loc)
            newPoint = newPoint.rotateDeg(rots, loc)
            newPoint = newPoint.rotateDeg(game.camera.rotations, game.camera.origin)

            points[x + 1] = newPoint
        }

        let triangleStrip = []

        for (let x = 1; x < points.length; x++) {
            triangleStrip.push(x)
            triangleStrip.push(0)
        }for (let x = 1; x < points.length; x++) {
            triangleStrip.push(0)
            triangleStrip.push(x)
        }

        this.faces[0] = new Polygon(triangleStrip.map(a => points[a]), this.color)
    }
}