import {Page} from '@core/Page'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@/core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {debounce, storage} from '@/core/utils'
import {
  // initialState,
  normalizeInitialState,
} from '@/redux/initialState'

function storageName(param) {
  return 'excel:'+param
}

export class ExcelPage extends Page {
  getRoot() {
    // const store = createStore(rootReducer, initialState)
    const state = storage(storageName(this.params[1]))
    const store = createStore(rootReducer, normalizeInitialState(state))

    const stateListener = debounce(state => {
      storage(storageName(this.params[1]), state)
    }, 500)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
