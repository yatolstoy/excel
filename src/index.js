import {Router} from '@core/router/router'
import {DashboardPage} from './pages/Dashboard.page'
import {ExcelPage} from './pages/Excel.page'
import './scss/index.scss'

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
})

