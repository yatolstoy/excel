import {DomListener} from '@core/DOMListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []
    this.unsub = []
    this.store = options.store
    this.prepare()
  }

  prepare() {

  }

  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $subscribe(fn) {
    const unsub = this.store.subscribe(fn)
    this.unsub.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $state() {
    return this.store.getState()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
    this.unsub.forEach(unsub => unsub.unsubscribe())
  }
}
