import {StoreSubscriber} from '@/core/storeSubscriber'
import {$} from '@core/dom'
import {Emitter} from '@core/Emitter'
import {changeDateOpenSheet} from '../../redux/actions'
import {preventDefault} from '@core/utils'

export class Excel {
  constructor(options) {
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

  init() {
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', preventDefault)
    }
    this.store.dispatch(changeDateOpenSheet(new Date().getTime()))
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init());
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
    document.removeEventListener('contextmenu', preventDefault)
  }
}


