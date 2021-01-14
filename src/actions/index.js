import {SEARCH_HISTORY, PICS_ARRAY} from './types'
import axios from 'axios'

export const searchPicsAction = (formObj, page) => async dispatch => {

    const {search} = formObj
    let res
    if(!page) {
        page = 1
    }
    
    res = await axios.get(`https://pixabay.com/api/?key=19861954-ae9b65d828f6ad091ad5cb99c&q=${search}&per_page=50&page=${page}`,)
    
    dispatch( {
        type: PICS_ARRAY,
        payload: res.data.hits
    })

    dispatch( {
        type: SEARCH_HISTORY,
        payload: search
    })
}

export const addToHistory = (formObj) => {

    const {search} = formObj

    return {
        type: SEARCH_HISTORY,
        payload: search
    }
}