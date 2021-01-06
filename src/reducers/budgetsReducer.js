import _ from 'lodash'
import { 
    CREATE_BUDGET,
    EDIT_BUDGET,
    FETCH_BUDGETS,
    DELETE_BUDGET,
    FETCH_BUDGET
 } from '../actions/types'

const handler = (state = {}, action) => {
    switch (action.type) {
        case CREATE_BUDGET:
            return { ...state, [action.payload.id]: action.payload }
        case EDIT_BUDGET:
            return { ...state, [action.payload.id]: action.payload }
        case FETCH_BUDGET:
            return { ...state, [action.payload.id]: action.payload }
        case FETCH_BUDGETS:
            return { ...state, ..._.mapKeys(action.payload, 'id') }
        case DELETE_BUDGET:
            return _.omit(state, action.payload)
        default: return state
    }
}

export default handler