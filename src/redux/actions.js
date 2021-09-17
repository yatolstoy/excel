import {
  CHANGE_TEXT,
  CHANGE_STYLES,
  TABLE_RESIZE,
  APPLY_STYLE,
  CHANGE_HEADER,
  CHANGE_DATE_OPEN_SHEET} from './types'

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

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data,
  }
}

export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data,
  }
}

export function changeHeader(data) {
  return {
    type: CHANGE_HEADER,
    data,
  }
}

export function changeDateOpenSheet(data) {
  return {
    type: CHANGE_DATE_OPEN_SHEET,
    data,
  }
}
