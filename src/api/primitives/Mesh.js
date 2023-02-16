import * as core from '../../api/core.js'
import { Camera } from '../core/camera/Camera.js'
import { Color } from '../graphics/Color.js'
import { math } from '../math/math.js'
import { Node2D } from '../objects/Node2D.js'

export class Mesh extends Node2D {
  static nameID = 0

  constructor(name = 'Mesh' + Mesh.nameID) {
    super(name)

    //Graphics
    this.shader = core.ShaderManager.GetShader('ColorShader')
    this.color = new Color(0, 125, 255, 1)

    this.size = 200

    this.buffer = new core.Buffer(3)
  }

  Init() {
    this.data = [
      0,
      0,
      0,

      0,
      this.size,
      0,

      this.size,
      this.size,
      0,

      this.size,
      this.size,
      0,

      this.size,
      0,
      0,

      0,
      0,
      0,
    ]

    //Upload to GPU
    this.buffer.PushBackData(this.data)
    this.buffer.AddAttribute(new core.AttributeInfo(0, 0, 3))
    this.buffer.Upload()

    super.Init()
  }

  /**
   * @param {Camera} camera
   */
  Render() {
    //Drawing
    this.shader.Use()

    this.shader.UploadVec4v('uColor', this.color.ToFloat32Array())

    this.UploadData(
      this.shader,
      math.Matrix4x4.Multiply(this.parent.worldMatrix, this.worldMatrix)
    )

    this.buffer.Bind()
    this.buffer.Draw()

    super.Render()
  }

  Update() {
    super.Update()
  }
}
