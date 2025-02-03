class Controller {
    constructor(targetMouse, targetKey) {
        this.targetMouse = targetMouse
        this.targetKey = targetKey

        this.width = targetMouse.clientWidth
        this.height = targetMouse.clientHeight
    }

    startListening() {
        this.targetMouse.addEventListener('mousemove', game.controller.mousemove)
        this.targetKey.addEventListener('keydown', game.controller.keydown)
    }

    stopListening() {
        this.targetMouse.removeEventListener('mousemove', game.controller.mousemove)
        this.targetKey.removeEventListener('keydown', game.controller.keydown)
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

    keydown(e) {
        if (!e.ctrlKey) {
            e.preventDefault()   
        }

        let increment = 1

        if (e.code == "ArrowLeft") {
            game.camera.rotations.y -= increment
        } else if (e.code == "ArrowRight") {
            game.camera.rotations.y += increment
        } else if (e.code == "ArrowUp") {
            game.camera.rotations.x += increment
        } else if (e.code == "ArrowDown") {
            game.camera.rotations.x -= increment
        }
    }
}