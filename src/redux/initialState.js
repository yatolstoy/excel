import {storage} from '../core/utils'

const defaultState = {
  rowsCount: 100,
  columnsCount: 30,
  currentText: '',
  dataState: {},
}

export const initialState = (storage('excel-app')) ?
storage('excel-app') :
defaultState
