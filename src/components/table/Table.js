import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mouseup', 'click'],
    })
    this.resize = {}
  }

  static className = 'excel__table'
  toHTML() {
    return createTable()
  }

  onClick(event) {
    document
        .querySelectorAll('.selected')
        .forEach(el => el.classList.remove('selected'))
    if (event.target.classList.contains('cell')) {
      event.target.classList.add('selected')
    }
  }

  onMousedown(event) {
    const typeResize = event.target.dataset.resize
    if (typeResize) {
      this.resize.el = event.target
      this.resize.type = typeResize

      this.resizer = document.createElement('div')
      this.resizer.classList.add('resizer')
      if (typeResize == 'col') {
        this.resizer.style.top = 0
        this.resizer.style.bottom = 0
        this.resizer.style.width = `1px`
        this.resizer.style.left = event.clientX + 'px'
      } else if (typeResize == 'row') {
        this.resizer.style.left = 0
        this.resizer.style.right = 0
        this.resizer.style.top = event.pageY - this.$root.$el.offsetTop + 'px'
        this.resizer.style.height = `1px`
      }
      this.$root.$el.append(this.resizer)

      this.resize.el.style.opacity = 1

      this.leftOffset = event.target.parentElement.offsetLeft
      this.resizing = this.resizing.bind(this)
      this.$root.on('mousemove', this.resizing)
    }
  }

  onMouseup() {
    if (this.resizer) {
      const el = this.resize.el.parentElement
      if (this.resize.type == 'col') {
        el.style.width = `${this.resizedElementWidth}px`
        const colNum = this.resize.el.parentElement.dataset.col
        document.querySelectorAll(`[data-col="${colNum}"]`).
            forEach(el => {
              el.style.width = `${this.resizedElementWidth}px`
            })
      } else if (this.resize.type == 'row') {
        el.parentElement.style.height = `${this.resizedElementHeight}px`
      }
      this.$root.off('mousemove', this.resizing)
      this.resize.el.style = ''
      this.resizer.remove()
      this.resizer = null
    }
  }

  resizing(event) {
    if (this.resize.type == 'col') {
      this.resizedElementWidth = event.clientX - this.leftOffset
      this.resizer.style.left = `${event.clientX}px`
    } else if (this.resize.type == 'row') {
      const position = event.pageY
      const elementOffset = this.resize.el.parentElement.offsetTop
      const windowOffset = this.$root.$el.offsetTop
      this.resizedElementHeight = position - elementOffset - windowOffset
      this.resizer.style.top = `${event.pageY - windowOffset}px`
    }
  }
}


