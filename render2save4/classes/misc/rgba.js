class RGBA {
    constructor(r, g, b, a) {
        this.r = r << 0
        this.g = g << 0
        this.b = b << 0
        this.a = a << 0
    }

    combine(color2) {
        let a = 255 - ((255 - this.a) * (255 - color2.a) / 255)
        let r  = (this.r * (255 - color2.a) + color2.r * color2.a) / 255
        let g = (this.g * (255 - color2.a) + color2.g * color2.a) / 255
        let b  = (this.b * (255 - color2.a) + color2.b * color2.a) / 255

        return new RGBA(r, g, b, a)
    }

    combineR(r, a) {
        return (this.r * (255 - 4) + r * a) / 255
    }

    combineG(g, a) {
        return (this.g * (255 - 4) + g * a) / 255
    }

    combineB(b, a) {
        return (this.b * (255 - 4) + b * a) / 255
    }

    combineA(a) {
        return 255 - ((255 - this.a) * (255 - a) / 255)
    }

    toString() {
        return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")"
    }
}