import { 
    SIGN_IN, 
    SIGN_OUT,
    CREATE_BUDGET,
    DELETE_BUDGET,
    EDIT_BUDGET,
    FETCH_BUDGET,
    FETCH_BUDGETS,
    CREATE_TRANSACTION,
    DELETE_TRANSACTION,
    FETCH_TRANSACTIONS,
    CREATE_INCOME,
    DELETE_INCOME,
    FETCH_INCOMES,
    FETCH_USERS,
    SET_MONTHLY_INCOME,
    FETCH_MONTHLY_INCOME
} from './types'

import transactions from '../apis/transactions'
import budgets from '../apis/budgets'
import users from '../apis/users'
import history from '../history'

export const signIn = userId => {
   return {
        type: SIGN_IN,
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const createUser = (formValues) => async (dispatch, getState) => {
    const { userId } = getState().auth
    const response = await users.post('/', { ...formValues, google_id: userId })
}

export const createBudget = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth
    const response = await budgets.post('/', { ...formValues, google_id: userId })

    dispatch({
        type: CREATE_BUDGET,
        payload: response.data
    })

    history.push('/budgets/list')
}

export const fetchBudget = id => async dispatch => {
    const response = await budgets.get(`/get`, { params: { id } })

    dispatch({
        type: FETCH_BUDGET,
        payload: response.data
    })
}

export const fetchBudgets = () => async (dispatch, getState) => {
    const { userId } = getState().auth
    const response = await budgets.get('/list', { params: { google_id: userId } })

    dispatch({
        type: FETCH_BUDGETS,
        payload: response.data
    })
}

export const deleteBudget = id => async dispatch => {
    await budgets.post('/delete', { id })

    dispatch({
        type: DELETE_BUDGET,
        payload: id
    })

    history.push('/budgets/list')
}

export const editBudget = (id, formValues) => async dispatch => {
    const response = await budgets.post(`/update`, {...formValues, id })

    dispatch({
        type: EDIT_BUDGET,
        payload: response.data
    })

    history.push('/budgets/list')
}



export const createTransaction = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth
    const response = await transactions.post('/', { ...formValues, google_id: userId })

    dispatch({
        type: CREATE_TRANSACTION,
        payload: response.data
    })

    history.push('/dashboard')
}

export const deleteTransaction = id => async dispatch => {
    await transactions.post('/delete', { id })

    dispatch({
        type: DELETE_TRANSACTION,
        payload: id
    })

    history.push('/dashboard')
}

export const fetchTransactions = () => async (dispatch, getState) => {
    const { userId } = getState().auth
    const response = await transactions.get('/list', { params: { google_id: userId } })

    dispatch({
        type: FETCH_TRANSACTIONS,
        payload: response.data
    })
}


export const createIncome = formValues => async (dispatch, getState) => {
    // const { userId } = getState().auth
    // const date = new Date().getTime()
    // const response = await budgets.post('/incomes', { ...formValues, userId, date })

    // dispatch({
    //     type: CREATE_INCOME,
    //     payload: response.data
    // })

    // history.push('/dashboard')
}

export const fetchIncomes = () => async dispatch => {
    // const response = await budgets.get('/incomes')

    // dispatch({
    //     type: FETCH_INCOMES,
    //     payload: response.data
    // })
}

export const deleteIncome = id => async dispatch => {
    // await budgets.delete(`/incomes/${id}`)

    // dispatch({
    //     type: DELETE_INCOME,
    //     payload: id
    // })

    // history.push('/dashboard')
}

export const setMonthlyIncome = (id, formValues) => async (dispatch, getState) => {
    // const { userId } = getState().auth
    // let response = null;

    // if(id !== null) {
    //     response = await budgets.patch(`/users/${id}`, { ...formValues, userId })
    // } else {
    //     response = await budgets.post(`/users`, { ...formValues, userId })
    // }

    // dispatch({
    //     type: SET_MONTHLY_INCOME,
    //     payload: response.data
    // })
}

export const fetchMonthlyIncome = (id) => async dispatch => {
    // try {
    //     const response = await budgets.get(`/users/${id}`).then(({json}) => {
    //         if(json.data.statusCode != 200) {
    //             // invalid
    //         }
    //      })
    //     dispatch({
    //         type: FETCH_MONTHLY_INCOME,
    //         payload: response.data
    //     })
    // } catch (err) {
    //     console.log(err)
    // }
}