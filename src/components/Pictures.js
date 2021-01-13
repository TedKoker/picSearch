import React, { useEffect, useRef, useState } from 'react'
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
    const gallryElement = useRef()


    useEffect(() => {
        const q = query.get("q")
        console.log(gallery)
        if(!q) {
            history.goBack()
        }
        
        if(q !== searchHistory[0] || searchHistory.length === 0) {
            dispatch(searchPicsAction({search: q}))
        }

        return() => {
            console.log("hello")
            setGallery([])
        }

    }, [])

    useEffect(() => {
        function scrollPagination() {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                dispatch(searchPicsAction({search: query.get("q")}, gallryElement.current.children.length/50 + 1))
            }
        }
        window.addEventListener('scroll',scrollPagination)
        

        return () => {
            window.removeEventListener("scroll", scrollPagination)
        }
    }, [searchHistory])

    useEffect(() => {
        if(picsArray) {
            let tempArr =  gallery &&  query.get("q") === searchHistory[0] ? [...gallery] : []
            picsArray.forEach((pic) => {
                tempArr.push(<div key={tempArr.length} className="gallery__item">
                    <img  src={pic.previewURL} />
                </div>)
                setGallery(tempArr)
            });
        }
    },[picsArray])

    return(
        <div ref={gallryElement} className="gallery">
            {
                gallery.map(item => item)
            }
        </div>
    )
}

export default Pictures