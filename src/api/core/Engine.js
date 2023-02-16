import * as core from '../core.js'

export class Engine {
  constructor() {
    //Setup handlers
    core.Keyboard.Init()

    this.camera = new core.OrthographicCamera()

    this.camera.transform.position.x = 500
    this.camera.transform.position.y = 250

    this.renderer = new core.Renderer()
    this.window = new core.Window(this.camera)
  }

  Run() {
    this.renderer.Init()
  }

  Render() {
    this.renderer.Render()

    core.ShaderManager.UpdateShader(this.camera)

    this.camera.Movement()
  }
}
