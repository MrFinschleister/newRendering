class Sphere {
    constructor(obj){
        this.loc = obj.location
        this.dims = obj.dimensions
        this.rots = obj.rotations
        this.color = obj.color
        this.numFaces = obj.numFaces
    }

    constructFaces() {
        let halfDims = this.dims.scalarMultiplication(0.5)
        let rots = this.rots
        let loc = this.loc

        let numFaces = this.numFaces

        let points = []

        let startingPoint = new Vector3(loc.x + halfDims.x, loc.y, loc.z)

        for (let x = 0; x < numFaces; x++) {
            let newPoint1 = startingPoint.rotateDeg(new Vector3((360 / numFaces) * x, 0, 0), loc)
            for (let y = 0; y < numFaces; y++) {
                let newPoint2 = newPoint1.rotateDeg(new Vector3(0, (360 / numFaces) * y, 0), loc)
                for (let z = 0; z < numFaces; z++) {
                    let newPoint3 = newPoint2.rotateDeg(new Vector3(0, 0, (360 / numFaces) * z), loc)

                    points.push(newPoint3)
                }
            }
        }

        for (let x = 0; x < points.length; x++) {
            let newPoint = points[x]

            newPoint = newPoint.rotateDeg(rots, loc)
            newPoint = newPoint.rotateDeg(game.camera.rotations, game.camera.origin)

            points[x] = newPoint
        }

        let triangleStrip = []

        for (let x = numFaces; x < points.length; x++) {
            triangleStrip.push(points[x])
            triangleStrip.push(points[x - numFaces])
        }

        this.faces = [new Polygon(triangleStrip, this.color)]
    }
}