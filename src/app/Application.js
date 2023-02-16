import * as core from '../api/core.js'
import { Mesh } from '../api/core.js'
import { Node2D } from '../api/objects/Node2D.js'
import { Scene } from '../api/scene/Scene.js'

export class Application {
  constructor() {
    //Main loading gets kicked off when running the engine
    this.engine = new core.Engine()
    this.renderer = this.engine.renderer

    this.scene = new Scene(this.engine.camera)

    const node = new Node2D('Parent')
    this.node = node

    node.transform.position.x = 0
    node.transform.position.y = 0

    node.Add(new Mesh('xx'))

    this.scene.Add(node)
  }

  /** @private */
  Init() {
    this.engine.Run()
    this.scene.Init()

    this.Loop()
  }

  /** @private */

  Loop() {
    this.Render()
    this.Update()

    requestAnimationFrame(this.Loop.bind(this))
    
  }

  /** @private */
  Render() {
    this.engine.Render()
    this.scene.Render()
  }

  /** @private */
  Update() {
    this.scene.Update()
  }

  Run() {
    this.Init()
  }
}
