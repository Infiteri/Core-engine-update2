import { Debug } from '../debug/Debug.js'

const gl = document.querySelector('canvas').getContext('webgl')

export class Shader {
  /**
   * (OpenGL) Shader instance
   *
   * @param {string} name
   * @param {string} vsSource
   * @param {string} fsSource
   */
  constructor(name, vsSource, fsSource) {
    this.name = name //Identifier

    if (vsSource === undefined) {
      Debug.CFatal(
        `The vsSource has not been defined while creating shader: ${name}`
      )
    }
    if (fsSource === undefined) {
      Debug.CFatal(
        `The fsSource has not been defined while creating shader: ${name}`
      )
    }

    const vertexShader = this._Load(gl.VERTEX_SHADER, vsSource)
    const fragmentShader = this._Load(gl.FRAGMENT_SHADER, fsSource)

    this.program = this._LoadProgram(vertexShader, fragmentShader)

    this.attributes = {}
    this.uniforms = {}

    this.DetectAttributes()
    this.DetectUniforms()
  }

  UploadVec4(name, vec4) {
    const loc = this.GetUniformLocation(name)
    gl.uniform4f(loc, vec4.x, vec4.y, vec4.z, vec4.w)
  }

  UploadVec4v(name, data) {
    const loc = this.GetUniformLocation(name)
    gl.uniform4fv(loc, data)
  }

  GetAttributeLocation(name) {
    if (this.attributes[name] === undefined)
      throw new Error(
        `Unable to find attribute: ${name} in shader named: ${this.name}`
      )

    return this.attributes[name]
  }

  GetUniformLocation(name) {
    if (this.uniforms[name] === undefined)
      throw new Error(
        `Unable to find uniform: ${name} in shader named: ${this.name}`
      )

    return this.uniforms[name]
  }

  /** @private */
  DetectAttributes() {
    const count = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES)

    for (let i = 0; i < count; i++) {
      const attribute = gl.getActiveAttrib(this.program, i)

      if (!attribute) break

      this.attributes[attribute.name] = gl.getAttribLocation(
        this.program,
        attribute.name
      )
    }
  }

  /** @private */
  DetectUniforms() {
    const count = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS)

    for (let i = 0; i < count; i++) {
      const uniform = gl.getActiveUniform(this.program, i)

      if (!uniform) break

      this.uniforms[uniform.name] = gl.getUniformLocation(
        this.program,
        uniform.name
      )
    }
  }

  UploadMat4(name, data) {
    const loc = this.GetUniformLocation(name)
    gl.uniformMatrix4fv(loc, false, data)
  }

  /** @private */
  _LoadProgram(vertexShader, fragmentShader) {
    const shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      Debug.CFatal(
        `Unable to initialize the shader program: ${gl.getProgramInfoLog(
          shaderProgram
        )}`
      )
      return null
    }

    return shaderProgram
  }

  /** @private */
  _Load(type, source) {
    const shaderType =
      type === gl.VERTEX_SHADER ? 'VERTEX_SHADER' : 'FRAGMENT_SHADER'

    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      Debug.CFatal(
        `An error occurred compiling the ${shaderType} shader in shader instance named: ${
          this.name
        } ${gl.getShaderInfoLog(shader)}`
      )

      gl.deleteShader(shader)
      return null
    }

    return shader
  }

  Use() {
    gl.useProgram(this.program)
  }

  Destroy() {}
}
