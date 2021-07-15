const FROMCHARCODE = 64
const LETTERSLENGTH = 26

export function createTable(rowsCount = 100, columnsCount = 27) {
  const resultHTML = []
  for (let i = 0; i < rowsCount; i++) {
    const row = makeRow(columnsCount, i)
    resultHTML.push(row.outerHTML)
  }

  return resultHTML.join('')
}

function makeRow(columnsCount, numRow) {
  const row = document.createElement('div')
  row.classList.add('row')

  const rowInfo = makeRowInfo(numRow)
  row.append(rowInfo)

  const rowData = makeRowData()

  if (!numRow) {
    new Array(columnsCount)
        .fill('')
        .map(getLetter)
        .map(makeColumn)
        .forEach(el => rowData.append(el))
  } else {
    new Array(columnsCount)
        .fill('')
        .map(makeCell)
        .forEach(el => rowData.append(el))
  }

  row.append(rowData)

  return row
}

function makeRowInfo(numRow) {
  const rowInfo = document.createElement('div')
  rowInfo.classList.add('row-info')
  if (numRow) {
    rowInfo.innerText = numRow
    const rowResize = document.createElement('div')
    rowResize.classList.add('row-resize')
    rowResize.setAttribute('data-resize', 'row')
    rowInfo.append(rowResize)
  }
  return rowInfo
}

function makeRowData() {
  const rowData = document.createElement('div')
  rowData.classList.add('row-data')
  return rowData
}

function makeColumn(text, index) {
  const column = document.createElement('div')
  column.classList.add('column')
  column.setAttribute('data-col', index)
  column.innerHTML = `${text}`
  const colResize = document.createElement('div')
  colResize.classList.add('col-resize')
  colResize.setAttribute('data-resize', 'col')

  column.append(colResize)
  return column
}

function makeCell(text = '', index) {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  cell.setAttribute('data-col', index)
  cell.setAttribute('contenteditable', true)
  cell.innerText = text
  return cell
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

