import { Keyboard } from '../../core.js'
import { math } from '../../math/math.js'

import { Camera } from './Camera.js'

export class PerspectiveCamera extends Camera {
  constructor() {
    super()

    this.type = 'Perspective'

    this.initialSetup = {
      fov: 90,
      far: 1000,
      near: -1,
    }

    //Initial setup
    this.projectionMatrix = math.Matrix4x4.Perspective(
      this.initialSetup.fov,
      this.initialSetup.near,
      this.initialSetup.far
    )

    this.transform.position.z = -6

    this.modelMatrix = this.transform.GetMatrix()
  }

  Movement() {
    let speed = 0.5

    if (Keyboard.IsKeyDown('KeyA')) {
      this.transform.position.x += speed
    }

    if (Keyboard.IsKeyDown('KeyD')) {
      this.transform.position.x -= speed
    }

    if (Keyboard.IsKeyDown('KeyW')) {
      this.transform.position.y -= speed
    }

    if (Keyboard.IsKeyDown('KeyS')) {
      this.transform.position.y += speed
    }
  }

  GetMatrix() {
    return math.Matrix4x4.Multiply(this.projectionMatrix, this.modelMatrix)
  }

  Recalculate() {
    const { fov, far, near } = this.initialSetup
    this.projectionMatrix = math.Matrix4x4.Perspective(fov, far, near)

    this.modelMatrix = this.transform.GetMatrix()
  }
}
