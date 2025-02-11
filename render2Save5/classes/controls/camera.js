class Camera {
    constructor(origin, viewOffset) {
        this.origin = origin
        this.viewOffset = viewOffset || new Vector3()
        this.viewOrigin = this.origin.vectorSum(this.viewOffset)
        this.rotations = new Vector3(0, 0, 0)
    }

    rotateX(inc) {
        this.rotations.x += inc
    }

    rotateY(inc) {
        this.rotations.y += inc
    }

    rotateZ(inc) {
        this.rotations.z += inc
    }
}