class Camera {
    constructor(origin, viewOffset) {
        this.origin = origin
        this.viewOffset = viewOffset || new Vector3()
        this.rotations = new Vector3(0, 0, 0)
    }
}