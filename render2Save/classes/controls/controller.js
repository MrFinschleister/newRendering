class Controller {
    constructor(target) {
        this.target = target

        this.width = target.clientWidth
        this.height = target.clientHeight
    }

    startListening() {
        this.target.addEventListener('mousemove', game.controller.mousemove)
    }

    stopListening() {
        this.target.removeEventListener('mousemove', game.controller.mousemove)
    }

    mousemove(e) {
        try {
            let totalRotation = 360

            let locX = e.offsetX
            let locY = e.offsetY

            let ratioX = locX / this.width
            let ratioY = locY / this.height

            game.camera.rotations.x = -1 * (ratioY * totalRotation) - totalRotation / 2
            game.camera.rotations.y = (ratioX * totalRotation) - totalRotation / 2
        } catch (error) {
            alert(error.stack)
        }
    }
}