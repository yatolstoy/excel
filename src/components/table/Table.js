import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {TableSelection} from './table.selection';

import {startResize} from './resize';

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'click'],
    })
    this.resize = {}
  }

  static className = 'excel__table'
  toHTML() {
    return createTable()
  }

  onClick(event) {
    const selection = new TableSelection(this.$root)
    selection.select(event)
  }

  onMousedown(event) {
    startResize(this.$root, event)
  }
}


