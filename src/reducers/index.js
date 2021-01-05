import { combineReducers } from 'redux'
import authReducer from './authReducer'
import budgetsReducer from './budgetsReducer'
import incomeReducer from './incomeReducer'
import monthlyIncomeReducer from './monthlyIncomeReducer'
import transactionsReducer from './transactionsReducer'
import usersReducer from './usersReducer'

export default combineReducers({
    auth: authReducer,
    budgets: budgetsReducer,
    transactions: transactionsReducer,
    incomes: incomeReducer,
    monthlyIncome: monthlyIncomeReducer,
    users: usersReducer
})