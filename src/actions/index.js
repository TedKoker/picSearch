import {SEARCH_HISTORY} from './types'

export const addToHistory = (formObj) => {

    const {search} = formObj

    return {
        type: SEARCH_HISTORY,
        payload: search
    }
}