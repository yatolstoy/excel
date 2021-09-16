import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {TableSelection} from './Table.selection';
import {startResize} from './resize';
import {$} from '../../core/dom';
import {matrix, nextSelector} from './table.functions';
import * as actions from '../../redux/actions'
import {defaultStyles} from '../../constants';
import {parse} from '@core/parse'

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

    this.$on('formula:input', (text) => {
      const $current = this.selection.current
      $current.attr('data-value', text)
          .text(parse(text))
      this.updateTextInStore(text)
    })

    this.$on('formula:enterPressed', () => {
      this.selection.select(this.selection.current)
    })

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      console.log(this.selection)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds,
      }))
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:textChanged', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(event) {
    try {
      const data = await startResize(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }

  onMousedown(event) {
    const $target = $(event.target)
    if ($target.data.resize) {
      this.resizeTable(event)
      return
    }
    if (!this.selection.current.isSameEl($target)) {
      this.$emit('table:textChanged', this.selection.current)
    }
    if (event.shiftKey) {
      const $cells = matrix($target, this.selection.current)
          .map(id => this.$root.find(`[data-id="${id}"]`))
      this.selection.selectGroup($cells)
    } else {
      this.selectCell($target)
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value,
    }))
  }

  onInput() {
    this.updateTextInStore(this.selection.current.text())
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
