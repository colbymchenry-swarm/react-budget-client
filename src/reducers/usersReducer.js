import _ from 'lodash'
import { CREATE_USER, FETCH_USER } from '../actions/types'

const handler = (state = {}, action) => {
    switch (action.type) {
        case CREATE_USER:
            return action.payload
        case FETCH_USER:
            return action.payload
        default: return state
    }
}

export default handler