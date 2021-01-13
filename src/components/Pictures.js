import React, { useEffect, useRef, useState } from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {useQuery} from '../shared-logic/shared-components'
import {searchPicsAction} from '../actions'
import userEvent from '@testing-library/user-event'

function Pictures() {

    const query = useQuery()
    const history = useHistory()
    const dispatch = useDispatch()
    const searchHistory = useSelector(state => state.searchHistory)
    const picsArray = useSelector(state => state.picsArray)
    const [gallery, setGallery] = useState([])
    const gallryElement = useRef()

    useEffect(() => {
        const q = query.get("q")
        if(!q) {
            history.goBack()
        }

        if(q !== searchHistory[0] || searchHistory.length === 0) {
            dispatch(searchPicsAction({search: q}, true))
        }

        const scrollEfect = window.addEventListener('scroll', (e) => {
            if ((window.innerHeight + window.scrollY) > document.body.offsetHeight) {
                console.log(gallryElement.current.children.length)
                dispatch(searchPicsAction({search: q}, true, gallryElement.current.children.length/50 + 1))
            }
        })
    },[])

    useEffect(() => {
        const tempArr =  gallery ? [...gallery] : []
        if(picsArray) {
            picsArray.forEach((pic) => {
                tempArr.push(<div key={tempArr.length} className="gallery__item">
                    <img  src={pic.previewURL} />
                </div>)
                setGallery(tempArr)
            });
        }
    },[picsArray])

    const handleScrollPagination = (e) => {
        console.log(e)
    }

    return(
        <div ref={gallryElement} className="gallery" onScroll={handleScrollPagination}>
            {
                gallery.map(item => item)
            }
        </div>
    )
}

export default Pictures