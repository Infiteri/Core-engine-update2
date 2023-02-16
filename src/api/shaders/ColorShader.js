import { Shader } from '../graphics/Shader.js'

const vs = `
  attribute vec3 aVertexPosition;

  uniform mat4 uCameraMatrix;
  uniform mat4 uMeshMatrix;

  void main() {
    gl_Position = uCameraMatrix * uMeshMatrix * vec4(aVertexPosition, 1);
  }
`

const fs = `
  precision mediump float;

  uniform vec4 uColor;

  void main() {
    gl_FragColor = uColor;
  }
`

export class ColorShader extends Shader {
  constructor() {
    super('ColorShader', vs, fs)
  }
}
