const FROMCHARCODE = 64
const LETTERSLENGTH = 26

export function createTable(rowsCount = 100, columnsCount = 27) {
  const resultHTML = []
  for (let i = 0; i < rowsCount; i++) {
    const row = makeRow(columnsCount, i)
    resultHTML.push(row)
  }
  return resultHTML.join('')
}

function makeRow(columnsCount, numRow) {
  const rowInfo = makeRowInfo(numRow)
  let row = ''

  if (!numRow) {
    row = new Array(columnsCount)
        .fill('')
        .map(getLetter)
        .map(makeColumn)
        .join('')
  } else {
    row = new Array(columnsCount)
        .fill('')
        .map(makeCell)
        .join('')
  }

  const rowData = makeRowData(row)

  return `<div class="row" data-type="resizable" data-row="${numRow}">
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

function makeColumn(text, index) {
  return `<div class="column" data-type="resizable" data-col="${index}">
            ${text}
            <div class="col-resize" data-resize="col">
            </div>
          </div>`
}

function makeCell(text = '', col) {
  return `<div class="cell" data-col="${col}" contenteditable>
            ${text}
          </div>`
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

