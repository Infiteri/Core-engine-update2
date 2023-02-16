import { Vector3 } from './Vector3.js'
import { Matrix4x4 } from './Matrix4x4.js'
import { Vector4 } from './Vector4.js'

export const math = {
  Vector3,
  Vector4,
  Matrix4x4,

  //Math utils

  /**
   * Returns a random number from 0 to 1
   *
   * @returns {number} Output
   */
  Random() {
    return Math.random()
  },

  /**
   * Returns a random ROUNDED number from 0 to 1
   *
   * @returns {number} Output
   */
  RoundRandom() {
    return Math.round(Math.random())
  },

  /**
   * Returns a random number in between 2 ranges
   *
   * @param {number} min The minimum
   * @param {number} max The maximum
   * @returns {number} Output
   */
  RandomRange(min, max) {
    return Math.random() * (max - min) + min
  },

  /**
   * Returns a random ROUNDED number in between 2 ranges
   *
   * @param {number} min The minimum
   * @param {number} max The maximum
   * @returns {number} The output
   */
  RandomRoundRange(min, max) {
    return Math.round(this.RandomRange(min, max))
  },
}
