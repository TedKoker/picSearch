import React from 'react'
import {useQuery} from '../../shared-logic/shared-components'
import SearchForm from './SearchForm'
import SearchHistory from './SearchHistory'

function SerchComponent() {

    const query = useQuery()

    return (
        <div className={query.get("q") ? "search search__small" : "search"}>
            <SearchForm smallFormClass = {query.get("q") ? "form__small" : ""}/>
            {
                query.get("q") ? null : <SearchHistory />
            }
            
        </div>
    )
}

export default SerchComponent