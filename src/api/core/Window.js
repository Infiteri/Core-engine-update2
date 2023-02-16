import { gl } from '../core.js'

export class Window {
  constructor(camera) {
    this.width = innerWidth
    this.height = innerHeight

    this.canvas = document.querySelector('canvas')

    this.canvas.width = this.width
    this.canvas.height = this.height

    gl.viewport(0, 0, this.width, this.height)

    this._Resize(camera)
  }

  /** @private */
  _Resize(camera) {
    window.onresize = () => {
      this.width = innerWidth
      this.height = innerHeight

      this.canvas.width = this.width
      this.canvas.height = this.height

      gl.viewport(0, 0, this.width, this.height)

      camera.Recalculate()
    }
  }
}
