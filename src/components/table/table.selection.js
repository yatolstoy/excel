export class TableSelection {
  static className = 'selected'

  constructor($root) {
    this.$root = $root
    this.current = null
    this.group = []
  }

  select($el) {
    this.clear()
    this.group.push($el)
    this.current = $el
    $el.focus().addClass(TableSelection.className)
  }

  selectGroup($cells = []) {
    this.clear()
    this.group = $cells
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }

  clear() {
    this.group.forEach(el => el.removeClass(TableSelection.className))
    this.group = []
  }

  get selectedIds() {
    return this.group.map($el => $el.id())
  }

  applyStyle(style) {
    this.group.forEach($el => $el.css(style))
  }
}

