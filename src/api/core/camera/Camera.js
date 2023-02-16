import {  Transform } from '../../core.js'
import { math } from '../../math/math.js'

export class Camera {
  constructor() {
    this.type = 'Camera'

    this.transform = new Transform()

    this.projectionMatrix = math.Matrix4x4.Identity()
    this.modelMatrix = math.Matrix4x4.Identity()
  }

  Movement() {
  }

  GetMatrix() {
    return math.Matrix4x4.Multiply(this.projectionMatrix, this.modelMatrix)
  }

  Recalculate() {}
}
