import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { addToHistory} from '../../actions'

function SearchHistory() {

    const searchHistory = useSelector(state => state.searchHistory)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleClick = (e) => {
        dispatch(addToHistory({search: e.target.getAttribute("value")}))
        history.push(`/search?q=${e.target.getAttribute("value")}`)
    }

    return (
        <div className="search-history">
            <ul>
                {searchHistory.map((item, index) => <li key={index} value={item} onClick={handleClick}>{item}</li>)}
            </ul>
        </div>
    )
}

export default SearchHistory