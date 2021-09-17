import {defaultStyles, defaultTitle} from '../constants'
import {storage} from '../core/utils'

const defaultState = {
  tableTitle: defaultTitle,
  rowsCount: 100,
  columnsCount: 30,
  currentText: '',
  dataState: {},
  currentStyles: defaultStyles,
  stylesState: {},
  dateOpen: new Date().getTime(),
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
})

export const initialState = (storage('excel-app')) ?
normalize(storage('excel-app')) :
defaultState

export function normalizeInitialState(state) {
  return state ? normalize(state) : defaultState
}
