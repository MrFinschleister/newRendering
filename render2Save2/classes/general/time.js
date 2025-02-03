class Time {
    constructor(fps, fpsRefreshRate) {
        this.fps = fps
        this.fpsRefreshRate = fpsRefreshRate

        this.setInfo()
    }
    
    setInfo() {        
        this.totalTime = 0
        this.currentTime = 0

        this.totalFrameTime = 0
        this.currentFrameTime = 0

        this.totalFrames = 0
        this.currentFrames = 0
    }

    // start the timing interval at a specified rate
    start() {
        this.timestamp = performance.now()

        this.interval = setInterval(function() {
            try {
                game.time.tick()
            } catch (error) {
                alert(error.stack)
            }
        }, 1000 / this.fps)
    }

    // stop the timing interval
    stop() {
        this.currentTime = 0
        this.currentFrameTime = 0
        this.currentFrames = 0

        clearInterval(this.interval)
    }

    // perform a 'tick' with specified actions and FPS data updates
    tick() {
        let start = performance.now()

        // actual tick content start

        game.renderer.render()

        // actual tick content end

        let end = performance.now()
        
        this.totalTime += end - this.timestamp
        this.currentTime += end - this.timestamp
        this.totalFrameTime += end - start
        this.currentFrameTime += end - start
        this.totalFrames++
        this.currentFrames++

        this.timestamp = end

        game.printData()

        if (this.totalFrames >= this.fpsRefreshRate) {
            this.setInfo()
        }
    }
}