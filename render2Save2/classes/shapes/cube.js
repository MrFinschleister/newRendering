class Cube {
    constructor(obj) {
        this.loc = obj.location
        this.dims = obj.dimensions
        this.rots = obj.rotations
    }

    constructFaces() {
        let halfDims = this.dims.scalarMultiplication(0.5)
        let rots = this.rots
        let loc = this.loc

        let points = [
            new Vector3(this.loc.x - halfDims.x, this.loc.y + halfDims.y, this.loc.z + halfDims.z),
            new Vector3(this.loc.x - halfDims.x, this.loc.y + halfDims.y, this.loc.z - halfDims.z),
            new Vector3(this.loc.x + halfDims.x, this.loc.y + halfDims.y, this.loc.z - halfDims.z),
            new Vector3(this.loc.x + halfDims.x, this.loc.y + halfDims.y, this.loc.z + halfDims.z),
            new Vector3(this.loc.x - halfDims.x, this.loc.y - halfDims.y, this.loc.z + halfDims.z),
            new Vector3(this.loc.x - halfDims.x, this.loc.y - halfDims.y, this.loc.z - halfDims.z),
            new Vector3(this.loc.x + halfDims.x, this.loc.y - halfDims.y, this.loc.z - halfDims.z),
            new Vector3(this.loc.x + halfDims.x, this.loc.y - halfDims.y, this.loc.z + halfDims.z),
        ]

        for (let x = 0; x < points.length; x++) {
            let sel = points[x]

            sel = sel.rotateDeg(rots, loc)
            sel = sel.rotateDeg(game.camera.rotations, game.camera.origin)

            points[x] = sel
        }

        let top = new Polygon([points[0], points[1], points[2], points[3]], new RGBA(255, 0, 0, 75))
        let bottom = new Polygon([points[4], points[5], points[6], points[7]], new RGBA(0, 0, 255, 75))
        let left = new Polygon([points[0], points[1], points[5], points[4]])
        let right = new Polygon([points[3], points[2], points[6], points[7]])
        let front = new Polygon([points[2], points[1], points[5], points[6]])
        let back = new Polygon([points[0], points[3], points[7], points[4]])

        this.faces = [top, bottom, left, right, front, back]
    }
}