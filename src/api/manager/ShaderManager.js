import { Debug, Shader } from '../core.js'
import { shaders } from '../shaders/shaders.js'

export class ShaderManager {
  /** @type {Object.<string, Shader>} */
  static shaders = {}

  static UpdateShader(camera) {
    Object.values(ShaderManager.shaders).forEach(shader => {
      shader.Use()
      shader.UploadMat4('uCameraMatrix', camera.GetMatrix().ToFloat32Array())
    })
  }

  static GetShader(name) {
    const shader = ShaderManager.shaders[name]

    if (shader) {
      return shader
    } else {
      Debug.CFatal('Unable to get shader: ' + name)
    }
  }

  /**
   * @param {Shader} shader
   */
  static LoadShader(shader) {
    const exists = ShaderManager.shaders[shader.name]

    if (exists) {
      Debug.CWarn('cannot load shader: ' + shader.name + ' found duplicate')
      return
    } else {
      //Doesn't exist so add it
      ShaderManager.shaders[shader.name] = shader
    }
  }

  static LoadBaseShaders() {
    ShaderManager.LoadShader(new shaders.ColorShader())
  }
}

ShaderManager.LoadBaseShaders()
