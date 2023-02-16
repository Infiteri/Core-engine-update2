export class Vector4 {
  constructor(x = 0, y = 0, z = 0, w = 0) {
    this.x = x
    this.y = y
    this.z = z
    this.w = w
  }

  static ZERO() {
    return new Vector4(0, 0, 0, 0)
  }

  static ONE() {
    return new Vector4(1, 1, 1, 1)
  }
}
