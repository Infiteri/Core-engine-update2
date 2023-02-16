import { gl } from '../core.js'

export class AttributeInfo {
  constructor(location, offset, size) {
    this.location = location
    this.offset = offset
    this.size = size
  }
}

export class Buffer {
  constructor(
    elementSize,
    dataType = gl.FLOAT,
    targetBufferType = gl.ARRAY_BUFFER,
    mode = gl.TRIANGLES
  ) {
    this.elementSize = elementSize
    this.dataType = dataType
    this.targetBufferType = targetBufferType
    this.mode = mode

    //Extra data
    this.hasAttributeLocation = false
    this.buffer = gl.createBuffer()
    this.stride = 0
    this.typeSize = 0
    this.attributes = []
    this.data = []

    //typeSize
    switch (dataType) {
      case gl.FLOAT:
      case gl.INT:
      case gl.UNSIGNED_INT:
        this.typeSize = 4
        break

      case gl.SHORT:
      case gl.UNSIGNED_SHORT:
        this.typeSize = 2
        break

      case gl.BYTE:
      case gl.UNSIGNED_BYTE:
        this.typeSize = 1
        break

      default:
        throw new Error('Unrecognized data type: ' + this.dataType.toString())
    }

    this.stride = this.elementSize * this.typeSize
  }

  Delete() {
    gl.deleteBuffer(this.buffer)
  }

  Upload() {
    gl.bindBuffer(this.targetBufferType, this.buffer)

    let bufferData

    switch (this.dataType) {
      case gl.FLOAT:
        bufferData = new Float32Array(this.data)
        break

      case gl.INT:
        bufferData = new Int32Array(this.data)
        break

      case gl.UNSIGNED_INT:
        bufferData = new Uint32Array(this.data)
        break

      case gl.SHORT:
        bufferData = new Int16Array(this.data)
        break

      case gl.UNSIGNED_SHORT:
        bufferData = new Uint16Array(this.data)

        break

      case gl.BYTE:
        bufferData = new Int8Array(this.data)
        break

      case gl.UNSIGNED_BYTE:
        bufferData = new Uint8Array(this.data)
        break

      default:
        bufferData = new Float32Array(this.data)
        break
    }

    gl.bufferData(this.targetBufferType, bufferData, gl.STATIC_DRAW)
  }

  Bind(normalized = false) {
    gl.bindBuffer(this.targetBufferType, this.buffer)

    if (this.hasAttributeLocation) {
      for (const it of this.attributes) {
        gl.vertexAttribPointer(
          it.location,
          it.size,
          this.dataType,
          normalized,
          this.stride,
          it.offset * this.typeSize
        )

        gl.enableVertexAttribArray(it.location)
      }
    }
  }

  Unbind() {
    for (const it of this.attributes) {
      gl.disableVertexAttribArray(it.location)
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
  }

  AddAttribute(info) {
    this.hasAttributeLocation = true

    this.attributes.push(info)
  }

  PushBackData(data) {
    for (const d of data) {
      this.data.push(d)
    }
  }

  Draw() {
    if (this.targetBufferType === gl.ARRAY_BUFFER)
      gl.drawArrays(this.mode, 0, this.data.length / this.elementSize)
    else if (this.targetBufferType === gl.ELEMENT_ARRAY_BUFFER)
      gl.drawElements(this.mode, this.data.length, this.dataType, 0)
  }
}
