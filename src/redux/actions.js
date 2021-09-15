import {CHANGE_TEXT, TABLE_RESIZE} from './types'

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data: {
      id: data.id,
      value: data.value,
      type: data.type,
    },
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  }
}
