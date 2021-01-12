import {SEARCH_HISTORY, PICS_ARRAY} from '../actions/types'

export default function(state={}, action) {
    switch(action.type) {
        case SEARCH_HISTORY:
            let array = [...state.searchHistory]
            array.unshift(action.payload)
            if(array && array.length > 3) {
                array.pop()
            }
            return {...state, searchHistory: array}

        case PICS_ARRAY:
            return {...state, picsArray: action.payload}
        
        default:
            return state
    }
}