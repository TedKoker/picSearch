import React from 'react'
import {useQuery} from '../../shared-logic/shared-components'
import {useHistory} from 'react-router-dom'
import SearchForm from './SearchForm'
import SearchHistory from './SearchHistory'

function SerchComponent() {

    const query = useQuery()
    const history = useHistory()

    return (
        <div className={query.get("q") ? "search search__small" : "search"}>
            <SearchForm smallFormClass = {query.get("q") ? true : false}/>
            {
                query.get("q") ? <div onClick={()=>{history.push("/")}} className="search__back">&larr;</div> : <SearchHistory />
            }
        </div>
    )
}

export default SerchComponent