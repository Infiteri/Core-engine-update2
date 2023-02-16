export class Color {
  constructor(r, g, b, a) {
    this.r = r / 255
    this.g = g / 255
    this.b = b / 255
    this.a = a
  }

  ToArray() {
    return [this.r, this.g, this.b, this.a]
  }

  ToFloat32Array() {
    return new Float32Array(this.ToArray())
  }
}
