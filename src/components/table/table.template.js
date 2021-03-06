import {toInlineStyles} from '@core/utils'
import {defaultStyles} from '../../constants'
import {parse} from '@core/parse'
const FROMCHARCODE = 64
const LETTERSLENGTH = 26

export function createTable(state) {
  const resultHTML = []
  for (let i = 0; i < state.rowsCount; i++) {
    const row = makeRow(state.columnsCount, i, state)
    resultHTML.push(row)
  }
  return resultHTML.join('')
}

function withWidthFrom(state) {
  return (text, index) => {
    const width = getWidthStyle(state, index)
    return {
      text,
      index,
      style: width ? `style="width:${getWidthStyle(state, index)}` : '',
    }
  }
}

function makeRow(columnsCount, numRow, state) {
  const rowInfo = makeRowInfo(numRow)
  let row = ''
  const colState = state.colResize || {}
  const rowState = state.rowResize || {}
  if (!numRow) {
    row = new Array(columnsCount)
        .fill('')
        .map(getLetter)
        .map(withWidthFrom(colState))
        .map(makeColumn)
        .join('')
  } else {
    row = new Array(columnsCount)
        .fill('')
        .map(makeCell(numRow, state))
        .join('')
  }

  const rowData = makeRowData(row)
  return `<div class="row" 
              data-type="resizable" 
              data-row="${numRow}" 
              style="${(rowState[numRow]) ? 'height:'+rowState[numRow] : ''};"
          >
          ${rowInfo}
          ${rowData}
         </div>`
}

function makeRowInfo(numRow) {
  const resizer = `<div class="row-resize" data-resize="row"></div>`
  return `<div class="row-info">
            ${numRow ? numRow : ''}
            ${numRow ? resizer : ''}
          </div>`
}

function makeRowData(row) {
  return `<div class="row-data">${row}</div>`
}

function makeColumn({text, index, style}) {
  return `<div  class="column" 
                ${style}' 
                data-type="resizable" 
                data-col="${index}">
            ${text}
            <div class="col-resize" data-resize="col">
            </div>
            </div>`
}

function makeCell(row, state) {
  return function(_, col) {
    const width = getWidthStyle(state.colResize, col)
    const id = `${col}:${row}`
    const data = state.dataState[id] || ''
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    })
    'font-weight: bold; text...'
    return `<div  class="cell" 
                  contenteditable
                  data-col="${col}" 
                  data-id="${id}"
                  data-value="${data || ''}"
                  style="${styles}; width:${width}">
    ${parse(data)}
  </div>`
  }
}

function getWidthStyle(state, index) {
  return (state && state[index]) ? `${state[index]};"` : ''
}


function getLetter(_, number) {
  number++
  let output = ''
  while (number) {
    let a = (number) % LETTERSLENGTH
    a = (a === 0) ? LETTERSLENGTH : a
    output = getLetterFromNumber(a) + output
    number = Math.floor(number / LETTERSLENGTH)
    number = (a === LETTERSLENGTH) ? 0 : number
  }
  return output
}

function getLetterFromNumber(num) {
  return String.fromCharCode(FROMCHARCODE + num)
}

