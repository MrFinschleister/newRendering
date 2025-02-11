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

        let numVertices = Math.sqrt(this.numFaces) << 0

        let points = []

        let radius = halfDims.x

        for (let x = 0; x <= numVertices; x++) {
            for (let y = 0; y <= numVertices; y++) {
                let theta = 2 * Math.PI * (x / numVertices)
                let phi = Math.PI / 2 - Math.PI * (y / numVertices)

                let newX = this.loc.x + (radius * Math.cos(phi)) * Math.cos(theta)
                let newY = this.loc.y + (radius * Math.cos(phi)) * Math.sin(theta)
                let newZ = this.loc.z + radius * Math.sin(phi)
                
                points.push(new Vector3(newX, newY, newZ))
            }
        }

        for (let x = 0; x < points.length; x++) {
            let newPoint = points[x]

            newPoint = newPoint.rotateDeg(rots, loc)
            newPoint = newPoint.rotateDeg(game.camera.rotations, game.camera.origin)

            points[x] = newPoint
        }

        let strip1 = []

        for (let x = numVertices; x < points.length; x++) {
            strip1.push(points[x])
            strip1.push(points[x - numVertices])
        }

        this.faces = [new Polygon(strip1, this.color)]
    }
}