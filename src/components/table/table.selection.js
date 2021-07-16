import {$} from '@core/dom'

export class TableSelection {
  constructor($root) {
    this.$root = $root
  }

  select(event) {
    const $target = $(event.target)
    const col = $target.closest('[data-col]').data.col
    const row = $target.closest('[data-row]').data.row

    this.$root.findAll('.selected')
        .forEach(el => $(el).removeClass('selected'))

    if (col && row) $target.addClass('selected')
  }

  selectGroup() {

  }
}
