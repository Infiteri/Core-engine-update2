import { Transform } from '../core.js'
import { math } from '../math/math.js'

export class Node2D {
  constructor(name) {
    this.name = name

    /** @type {Node2D} */
    this.parent = undefined

    this.localMatrix = math.Matrix4x4.Identity()
    this.worldMatrix = math.Matrix4x4.Identity()

    this.transform = new Transform()

    /** @type {Array.<Node2D>} */
    this.nodes = []
  }

  Add(node) {
    node.parent = this
    this.nodes.push(node)
  }

  Init() {
    for (const n of this.nodes) {
      n.Init()
    }
  }

  UploadData(shader, model) {
    shader.Use()
    shader.UploadMat4('uMeshMatrix', model.ToFloat32Array())
  }

  Render() {
    this.localMatrix = this.transform.GetMatrix()
    this.UpdateWorldMatrix(this.parent ? this.parent.worldMatrix : undefined)

    for (const n of this.nodes) {
      n.Render()
    }
  }

  Update() {
    for (const n of this.nodes) {
      n.Update()
    }
  }

  /** @private */
  UpdateWorldMatrix(parentMatrix) {
    if (parentMatrix) {
      this.worldMatrix = math.Matrix4x4.Multiply(parentMatrix, this.localMatrix)
    } else {
      this.worldMatrix.CopyFrom(this.localMatrix)
    }
  }
}
