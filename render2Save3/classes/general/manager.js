class Manager {
    constructor() {
        this.canvas = canvas
        this.ctx = ctx
        this.origin = new Vector3(0, 0, 0)
        this.fps = 60
        this.fpsRefreshRate = 60
        this.scalar = 500
    }

    constructObjects() {
        this.time = new Time(this.fps, this.fpsRefreshRate)
        this.renderer = new Renderer(this.canvas, this.ctx, this.scalar)
        this.camera = new Camera(this.origin.clone(), new Vector3(0, 0, 0))
        this.controller = new Controller(this.canvas, document.body)
    }

    finaliseObjects() {
        this.renderer.setCanvas()
        this.controller.startListening()
        this.time.start()
    }

    printData() {
        document.getElementById('timePerFrame').innerHTML = "Time per frame (ms): " + (this.time.currentFrameTime / this.time.currentFrames).toFixed(2)
        document.getElementById('framesPerSecond').innerHTML = "Frames per second: " + (this.time.totalFrames / (this.time.totalTime / 1000)).toFixed(0)
        document.getElementById('globalRotations').innerHTML = "Global Rotations: " + this.camera.rotations.getVector()
        document.getElementById('numObjects').innerHTML = "Objects: " + objects.length
    }
}