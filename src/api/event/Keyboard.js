/**
 * Keyboard event handlers
 *
 * @static Class
 */

export class Keyboard {
  /** @type {Object.<string, function>} */
  static keydown = {}

  static currentKey = null

  /**
   * The init method kicks off the event handlers
   */
  static Init() {
    //Key down handler
    addEventListener('keydown', event => {
      Keyboard.currentKey = event.code

      const key = Keyboard.keydown[event.code]

      if (key) {
        key(event)
      }
    })

    addEventListener('keyup', () => {
      Keyboard.currentKey = null
    })
  }

  /**
   * Returns the key down
   *
   * @returns {string} The currently held down code (KeyA, KeyW)
   */
  static GetKey() {
    return Keyboard.currentKey
  }

  /**
   * Returns whether or not the passed code is down
   *
   * @param {string} code The key code (KeyA, KeyD)
   * @returns {boolean} Whether or not the current is pressed
   */
  static IsKeyDown(code) {
    return Keyboard.currentKey === code
  }

  /**
   * Registers a key down callback
   *
   * @param {string} code The code of the key (KeyA, KeyD)
   * @param {function} handler The event handler
   */
  static OnKeyDown(code, handler) {
    Keyboard.keydown[code] = handler
  }
}
