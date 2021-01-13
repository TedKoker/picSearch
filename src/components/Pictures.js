import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {useQuery} from '../shared-logic/shared-components'
import {searchPicsAction} from '../actions'

function Pictures() {

    const query = useQuery()
    const history = useHistory()
    const dispatch = useDispatch()
    const searchHistory = useSelector(state => state.searchHistory)
    const picsArray = useSelector(state => state.picsArray)
    const [gallery, setGallery] = useState([])

    useEffect(() => {
        const q = query.get("q")
        if(!q) {
            history.goBack()
        }

        if(q !== searchHistory[0] || searchHistory.length === 0) {
            dispatch(searchPicsAction({search: q}, true))
        }
    },[])

    useEffect(() => {
        if(picsArray) {
            setGallery(picsArray)
        }
    },[picsArray])

    return(
        <div className="gallery">
            {
                gallery.map((pic, index) => <img key={index} src={pic.userImageURL} />)
            }
        </div>
    )
}

export default Pictures