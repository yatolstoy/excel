import {TABLE_RESIZE} from './types'

export function rootReducer(state, action) {
  let preventColResize
  switch (action.type) {
    case TABLE_RESIZE:
      preventColResize = state.colResize || {}
      state.colResize = {...preventColResize,
        [action.data.id]: action.data.value}
      break;
    default:
      return state
  }
  return state
}
