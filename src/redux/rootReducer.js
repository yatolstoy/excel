import {CHANGE_TEXT, TABLE_RESIZE} from './types'

export function rootReducer(state, action) {
  let preventState
  let field
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colResize' : 'rowResize'
      preventState = state[field] || {}
      state[field] = {
        ...preventState,
        [action.data.id]: action.data.value,
      }
      break;
    case CHANGE_TEXT:
      preventState = state['dataState']
      preventState[action.data.id] = action.data.value
      return {...state, currentText: action.data.value, dataState: preventState}
    default:
      return state
  }
  return state
}
