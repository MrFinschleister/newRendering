class Cube {
    constructor(obj) {
        this.loc = obj.location
        this.dims = obj.dimensions
        this.rots = obj.rotations
        this.color = obj.color
    }

    constructFaces() {
        let halfDims = this.dims.scalarMultiplication(0.5)
        let rots = this.rots
        let loc = this.loc

        let pointConfig = [
            new Vector3( +1, +1, -1), // + + - 
            new Vector3( -1, +1, -1), // - + -
            new Vector3( +1, -1, -1), // + - -
            new Vector3( -1, -1, -1), // - - -

            new Vector3( +1, +1, +1), // + + +
            new Vector3( -1, +1, +1), // - + + 
            new Vector3( +1, -1, +1), // + - +
            new Vector3( -1, -1, +1), // - - +
        ]

        let facesConfig = [3, 7, 1, 5, 4, 7, 6, 3, 2, 1, 0, 4, 2, 6]

        let points = []
        this.faces = []

        for (let x = 0; x < pointConfig.length; x++) {
            let newPoint = loc.vectorSum(pointConfig[x].vectorMultiplication(halfDims))
            newPoint = newPoint.rotateDeg(rots, loc)
            newPoint = newPoint.rotateDeg(game.camera.rotations, game.camera.origin)

            points[x] = newPoint
        }

        this.faces[0] = new Polygon(facesConfig.map(a => points[a]), this.color)
    }
}