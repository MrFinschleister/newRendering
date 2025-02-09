class Edge {
    constructor(v1, v2, v3) {
        this.v1 = v1
        this.v2 = v2
        this.v3 = v3

        this.edge = v1.vectorDifference(v2)
    }
}