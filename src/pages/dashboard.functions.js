import {storage} from '../core/utils'

export function toHTML(el) {
  const model = storage(el)
  const id = el.split(':')[1]
  const dateStr = new Date(+model.dateOpen).toLocaleDateString('ru-RU')
  const timeStr = new Date(+model.dateOpen).toLocaleTimeString('ru-RU')
  return `
  <li class="db__record">
    <a href="#excel/${id}">${model.tableTitle}</a>
    <strong>${dateStr} ${timeStr}</strong>
  </li>
`
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) continue
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()

  if (!keys.length) return `<p>Вы пока не создали ниодной таблицы</p>`
  return `
  <div class="db__list-header">
    <span>Название</span>
    <span>Дата открытия</span>
  </div>

  <ul class="db__list">
  ${keys.map(toHTML).join('')}
  </ul>
  `
}
