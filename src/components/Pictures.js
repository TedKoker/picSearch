import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useQuery} from '../shared-logic/shared-components'
import { addToHistory} from '../actions'
import {loadPics} from '../shared-logic/api-call'
import Modal from 'react-modal'

function Pictures() {

    const query = useQuery()
    const history = useHistory()
    const searchHistory = useSelector(state => state.searchHistory)
    const [gallery, setGallery] = useState([])
    const [galleryHistory, setGalleryHistory] = useState([])
    const [showPic, setShowPic] = useState()

    const setFullPic = (src) => {
        setShowPic(src)
    }

    const removeFullPic = () => {
        setShowPic(undefined)
    }

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
            console.log(resp.data.hits)
            const tempArr = page===1 ? [] : [...galleryHistory]
            resp.data.hits.forEach(pic => {
                tempArr.push(<div key={tempArr.length} onClick={() => {setFullPic(pic.largeImageURL)}} className="gallery__item">
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
                gallery.length > 0 ? [...gallery] : <div className="gallery__empty-results">No Results :(</div>
            }
            <Modal
                isOpen = {showPic !== undefined}
                onRequestClose = {removeFullPic}
                style={{content: {padding:"0"}}}
            >
                <img src={showPic} />
            </Modal>
        </div>
    )
}

export default Pictures