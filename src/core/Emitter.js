export class Emitter {
  constructor() {
    this.listeners = {}
  }

  emit(event, ...args) {
    if (!this.listeners[event]) return false
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
  }

  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = this.listeners[event].filter(el => el !== fn)
    }
  }
}
