import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useQuery} from '../shared-logic/shared-components'
import { addToHistory} from '../actions'
import {loadPics} from '../shared-logic/api-call'

function Pictures() {

    const query = useQuery()
    const history = useHistory()
    const searchHistory = useSelector(state => state.searchHistory)
    const [gallery, setGallery] = useState([])
    const [galleryHistory, setGalleryHistory] = useState([])

    useEffect(() => {
        const q = query.get("q")

        if(!q) {
            history.push("/")
        } else {
            addToHistory({search: q})
        }
    }, [])

    const loadGallery = (page) => {
        loadPics(query.get("q"), page).then(resp => {
            const tempArr = page===1 ? [] : [...galleryHistory]
            resp.data.hits.forEach(pic => {
                tempArr.push(<div key={tempArr.length} className="gallery__item">
                    <img  src={pic.previewURL} />
                </div>)
            })
            setGalleryHistory(tempArr)
        })
    }

    useEffect(() => {

        loadGallery(1)
        
    }, [searchHistory])

    useEffect(() => {

        setGallery(galleryHistory)

        function scrollPagination() {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                loadGallery(galleryHistory.length / 50 + 1)
            }
        }
        window.addEventListener('scroll',scrollPagination)
        

        return () => {
            window.removeEventListener("scroll", scrollPagination)
        }
    }, [galleryHistory])


    return(
        <div className="gallery">
            {
                [...gallery]
            }
        </div>
    )
}

export default Pictures