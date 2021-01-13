import {SEARCH_HISTORY, PICS_ARRAY} from './types'
import axios from 'axios'

export const searchPicsAction = (formObj, dontAddToHistory) => async dispatch => {

    const {search} = formObj
    let res

    res = await axios.get(`https://pixabay.com/api/?key=19861954-ae9b65d828f6ad091ad5cb99c&q=${search}`,)
    console.log(res.data.hits)

    dispatch( {
        type: PICS_ARRAY,
        payload: res.data.hits
    })

    if(!dontAddToHistory) {
        dispatch( {
            type: SEARCH_HISTORY,
            payload: search
        })
    }
}