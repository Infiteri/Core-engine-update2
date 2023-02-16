import { Node2D } from '../objects/Node2D.js'

export class Scene {
  constructor(camera) {
    this.camera = camera
    this.root = new Node2D('__ROOT__')
  }

  Add(node) {
    this.root.Add(node)
  }

  Init() {
    this.root.Init()
  }

  Render() {
    this.camera.Recalculate()
    this.root.Render()
  }

  Update() {
    this.root.Update()
  }
}
