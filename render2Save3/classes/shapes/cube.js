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

        let facesConfig = [
            //{p: [3, 7, 1, 5, 4, 7, 6, 3, 2, 1, 0, 4, 2, 6], c: this.color,},
            //{p: [0, 1, 2, 3, 6, 2, 0, 4, 5, 1, 3, 7, 6, 4], c: this.color},
            {p: [0, 1, 2, 3, 6, 7, 4, 5,], c: this.color,},
            {p: [7, 3, 5, 1, 4, 0, 6, 2,], c: this.color,},
        ]

        let points = []
        this.faces = []

        for (let x = 0; x < pointConfig.length; x++) {
            let newPoint = loc.vectorSum(pointConfig[x].vectorMultiplication(halfDims))
            newPoint = newPoint.rotateDeg(rots, loc)
            newPoint = newPoint.rotateDeg(game.camera.rotations, game.camera.origin)

            points[x] = newPoint
        }

        for (let x = 0; x < facesConfig.length; x++) {
            let sel = facesConfig[x]

            this.faces[x] = new Polygon(sel.p.map(a => points[a].round()), this.color)
        }
    }
}