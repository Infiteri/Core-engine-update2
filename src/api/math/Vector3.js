export class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  static ZERO() {
    return new Vector3(0, 0, 0)
  }

  static ONE() {
    return new Vector3(1, 1, 1)
  }
}
