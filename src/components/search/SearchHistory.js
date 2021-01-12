import React from 'react'
import {useSelector} from 'react-redux'

function SearchHistory() {

    const searchHistory = useSelector(state => state.searchHistory)

    return (
        <div>
            <ul>
                {searchHistory.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
    )
}

export default SearchHistory