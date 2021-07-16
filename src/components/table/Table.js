import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '@core/dom'

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
    const $target = $(event.target)
    this.$root
        .findAll('.selected')
        .forEach(el => el.classList.remove('selected'))
    if ($target.hasClass('cell')) {
      $target.addClass('selected')
    }
  }

  onMousedown(event) {
    startResize(this.$root, event)
  }
}


