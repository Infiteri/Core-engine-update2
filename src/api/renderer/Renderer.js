import { gl, Shader } from '../core.js'

export class Renderer {
  constructor() {}

  /**
   * Returns a instance of a shader
   *
   * @param {string} name
   * @param {string} vsSource
   * @param {string} fsSource
   */
  CreateShader(name, vsSource, fsSource) {
    return new Shader(name, vsSource, fsSource)
  }

  Init() {}

  Render() {
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  }
}
