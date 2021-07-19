import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {TableSelection} from './Table.selection';
import {startResize} from './resize';
import {$} from '../../core/dom';
import {matrix, nextSelector} from './table.functions';

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
    })
    this.resize = {}
  }

  static className = 'excel__table'
  toHTML() {
    return createTable()
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:1"]')
    this.selection.select($cell)
  }

  onMousedown(event) {
    startResize(this.$root, event)
    const $target = $(event.target)
    if (event.shiftKey) {
      const $cells = matrix($target, this.selection.current)
          .map(id => this.$root.find(`[data-id="${id}"]`))
      this.selection.selectGroup($cells)
    } else {
      this.selection.select($target)
    }
  }

  onMouseup() {

  }

  onKeydown(event) {
    const keys = ['Enter',
      'Tab',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight']
    const key = event.key
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const newCell = this.$root.find(nextSelector(key, id))
      this.selection.select(newCell)
    }
  }
}
