import _ from 'lodash'
import { FETCH_USERS } from '../actions/types'

const handler = (state = {}, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return { ...state, ..._.mapKeys(action.payload, 'id') }
        default: return state
    }
}

export default handler