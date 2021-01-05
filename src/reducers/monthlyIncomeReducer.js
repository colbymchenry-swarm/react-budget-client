import _ from 'lodash'
import { 
    SET_MONTHLY_INCOME,
    FETCH_MONTHLY_INCOME
 } from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case SET_MONTHLY_INCOME:
            return { ...state, [action.payload.id]: action.payload }
        case FETCH_MONTHLY_INCOME:
            return { ...state, [action.payload.id]: action.payload }
        default: return state
    }
}