import { Keyboard } from '../../core.js'
import { math } from '../../math/math.js'
import { Camera } from './Camera.js'

export class OrthographicCamera extends Camera {
  constructor() {
    super()

    this.type = 'Orthographic'

    const { width, height } = document.querySelector('canvas')

    this.projectionMatrix = math.Matrix4x4.Orthographic(width, height)

    this.modelMatrix = this.transform.GetMatrix()
  }

  Movement() {
    let speed = 10

    if (Keyboard.IsKeyDown('KeyA')) {
      this.transform.position.x += speed
    }

    if (Keyboard.IsKeyDown('KeyD')) {
      this.transform.position.x -= speed
    }

    if (Keyboard.IsKeyDown('KeyW')) {
      this.transform.position.y += speed
    }

    if (Keyboard.IsKeyDown('KeyS')) {
      this.transform.position.y -= speed
    }
  }

  Recalculate() {
    const { width, height } = document.querySelector('canvas')
    this.projectionMatrix = math.Matrix4x4.Orthographic(width, height)

    this.modelMatrix = this.transform.GetMatrix()
  }
}
