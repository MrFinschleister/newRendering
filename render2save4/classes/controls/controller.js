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

        let rotIncrements = new Vector3(1, 1, 1)

        let events = {
            "ArrowLeft": function() {
                game.camera.rotateY(-rotIncrements.y)
            },
            "ArrowRight": function() {
                game.camera.rotateY(rotIncrements.y)
            },
            "ArrowUp": function() {
                game.camera.rotateX(rotIncrements.x)
            },
            "ArrowDown": function() {
                game.camera.rotateX(-rotIncrements.x)
            },
            "Digit1": function() {
                game.time.actions.push(() => {
                    for (let x = 0; x < objects.length; x++) {
                        objects[x].rotations = objects[x].rotations.vectorSum(rotIncrements)
                    }
                })
            },
            "Digit2": function() {
                game.time.actions.push(() => {
                    for (let x = 0; x < objects.length; x++) {
                        objects[x].location.x += (Math.random() * 10) - 5
                        objects[x].location.y += (Math.random() * 10) - 5
                        objects[x].location.z += (Math.random() * 10) - 5
                    }
                })
            },
            "Backspace": function() {
                game.time.actions = [() => {game.renderer.render()}]
            },
            "Enter": function() {
                game.time.pause()
            },
            "Period": function() {
                game.time.tick()
            },
            "Equal": function() {
                addObject()
            },
            "Minus": function() {
                removeObject()
            }
        }

        if (events[e.code]) {
            events[e.code]()
        }
    }
}