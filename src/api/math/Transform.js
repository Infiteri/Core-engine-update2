import { math } from './math.js'

export class Transform {
  constructor() {
    this.position = math.Vector3.ZERO()
    this.rotation = math.Vector3.ZERO()
    this.scale = math.Vector3.ONE()
  }

  GetMatrix() {
    const translation = math.Matrix4x4.Identity()
    translation.Translate(this.position)

    const rotation = math.Matrix4x4.RotationXYZ(this.rotation)
    const scale = math.Matrix4x4.Scale(this.scale)

    return math.Matrix4x4.Multiply(
      math.Matrix4x4.Multiply(translation, rotation),
      scale
    )
  }
}
