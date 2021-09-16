import {$} from '@core/dom'
import {Emitter} from '@core/Emitter'
import {StoreSubscriber} from '@/core/storeSubscriber'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
    this.store = options.store
    this.emitter = new Emitter()
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const options = {
        emitter: this.emitter,
        store: this.store,
      }
      const component = new Component($el, options)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())

    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init());
  }

  destroy() {
    this.subscriber.unsubscribeFormStore()
    this.components.forEach(component => component.destroy())
  }
}
