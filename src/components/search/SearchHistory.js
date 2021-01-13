import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {searchPicsAction} from '../../actions'

function SearchHistory() {

    const searchHistory = useSelector(state => state.searchHistory)
    const dispatch = useDispatch()

    const handleClick = (e) => {
        dispatch(searchPicsAction({search: e.target.getAttribute("value")}))
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