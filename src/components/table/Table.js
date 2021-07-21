import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {TableSelection} from './Table.selection';
import {startResize} from './resize';
import {$} from '../../core/dom';
import {matrix, nextSelector} from './table.functions';
import * as actions from '../../redux/actions'

export class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
    this.resize = {}
  }

  static className = 'excel__table'
  toHTML() {
    return createTable(this.$state())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:1"]')
    this.selectCell($cell)

    this.$on('formula:input', (data) => {
      const $current = this.selection.current
      $current.text(data)
    })

    this.$on('formula:enterPressed', () => {
      this.selection.select(this.selection.current)
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:textChanged', $cell.text())
  }

  async resizeTable(event) {
    const data = await startResize(this.$root, event)
    if (data.type === 'col') {
      this.$dispatch(actions.tableResize(data))
    }
  }

  onMousedown(event) {
    const $target = $(event.target)
    if ($target.data.resize) {
      this.resizeTable(event)
      return
    }
    if (!this.selection.current.isSameEl($target)) {
      this.$emit('table:textChanged', this.selection.current.text())
    }
    if (event.shiftKey) {
      const $cells = matrix($target, this.selection.current)
          .map(id => this.$root.find(`[data-id="${id}"]`))
      this.selection.selectGroup($cells)
    } else {
      this.selectCell($target)
    }
  }

  onInput() {
    this.$emit('table:textChanged', this.selection.current.text())
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
      const $cell = this.$root.find(nextSelector(key, id))
      this.selectCell($cell)
    }
  }
}
