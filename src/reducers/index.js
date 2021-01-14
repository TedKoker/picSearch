import {SEARCH_HISTORY, PICS_ARRAY} from '../actions/types'

export default function(state={}, action) {
    switch(action.type) {
        case SEARCH_HISTORY:
            let array = [...state.searchHistory]
            if(array[0] !== action.payload) {
                array.unshift(action.payload)
            }
            if(array && array.length > 3) {
                array.pop()
            }
            return {...state, searchHistory: array}
        
        default:
            return state
    }
}