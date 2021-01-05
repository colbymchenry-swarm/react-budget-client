import _ from 'lodash'
import { 
    CREATE_TRANSACTION,
    DELETE_TRANSACTION,
    FETCH_TRANSACTIONS
 } from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_TRANSACTION:
            return { ...state, [action.payload.id]: action.payload }
        case FETCH_TRANSACTIONS:
            return { ...state, ..._.mapKeys(action.payload, 'id') }
        case DELETE_TRANSACTION:
            return _.omit(state, action.payload)
        default: return state
    }
}