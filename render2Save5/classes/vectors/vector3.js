class Vector3 {
    constructor(x, y, z) {
        this.x = x || 0
        this.y = y || 0
        this.z = z || 0
    }

    // return a copy of the current vector
    clone() {
        return new Vector3(this.x, this.y, this.z)
    }

    // return an array with vector contents
    getVector() {
        return [this.x, this.y, this.z]
    }

    // return vector magnitude
    getMagnitude() {
        return Math.sqrt((this.x ** 2) + (this.y ** 2) + (this.z ** 2))
    }

    // return vector magnitude ignoring Z axis
    getMagnitude2d() {
        return Math.sqrt((this.x ** 2) + (this.y ** 2))
    }

    // multiply the current vector by a scalar
    scalarMultiplication(scalar) {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar)
    }

    // multiply the current vector by a provided vector
    vectorMultiplication(v2) {
        return new Vector3(this.x * v2.x, this.y * v2.y, this.z * v2.z)
    }

    // add a provided vector to the current vector
    vectorSum(v2) {
        return new Vector3(this.x + v2.x, this.y + v2.y, this.z + v2.z)
    }

    // subtract a provided vector from the current vector
    vectorDifference(v2) {
        return new Vector3(this.x - v2.x, this.y - v2.y, this.z - v2.z)
    }

    // return the dot product of the current vector and a provided vector
    dotProduct(v2) {
        return (this.x * v2.x) + (this.y * v2.y) + (this.z * v2.z)
    }

    // rounds the vector
    round() {
        return new Vector3((this.x + 0.5) << 0, (this.y + 0.5) << 0, (this.z + 0.5) << 0)
    }

    // floors the vector
    floor() {
        return new Vector3(this.x << 0, this.y << 0, this.z << 0)
    }

    // rotate the current vector by a provided degree amount about a provided origin
    rotateDeg(degs, origin) {
        let rads = degs.scalarMultiplication(Math.PI / 180)

        return this.rotateRad(rads, origin)
    }

    // rotate the current vector by a provided radian amount about a provided origin
    rotateRad(rads, origin) {
        let v1 = this.vectorDifference(origin)

        rads.x = rads.x % 360
        rads.y = rads.y % 360
        rads.z = rads.z % 360

        let cx = Math.cos(rads.x)
        let sx = Math.sin(rads.x)
        let cy = Math.cos(rads.y)
        let sy = Math.sin(rads.y)
        let cz = Math.cos(rads.z)
        let sz = Math.sin(rads.z)

        let zx = rads.z != 0 ? v1.x * cz - v1.y * sz : v1.x
        let zy = rads.z != 0 ? v1.y * cz + v1.x * sz : v1.y

        let yx = rads.y != 0 ? zx * cy - v1.z * sy : zx
        let yz = rads.y != 0 ? v1.z * cy + zx * sy : v1.z

        let xy = rads.x != 0 ? zy * cx - yz * sx : zy
        let xz = rads.x != 0 ? yz * cx + zy * sx : yz

        v1.x = yx
        v1.y = xy
        v1.z = xz

        return v1.vectorSum(origin)
    }

    // scales the vector based on its Z value
    scaleZ(scalar, origin) {
        let newV = this.vectorDifference(origin).scalarMultiplication(scalar / this.z)
        newV.z = this.z

        return newV

    }
}