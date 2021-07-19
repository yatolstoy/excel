export function nextSelector(key, {col, row}) {
  const MIN_VALUE_COL = 0
  const MIN_VALUE_ROW = 1
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break;
    case 'ArrowRight':
    case 'Tab':
      col++
      break;
    case 'ArrowUp':
      if (row > MIN_VALUE_ROW) row--
      break;
    case 'ArrowLeft':
      if (col > MIN_VALUE_COL) col--
      break;

    default:
      break;
  }
  return `[data-id="${col}:${row}"]`
}

export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => {
      acc.push(`${col}:${row}`)
    })
    return acc
  }, [])
}

function range(start, end) {
  if (start > end) {
    [start, end] = [end, start]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index)
}
