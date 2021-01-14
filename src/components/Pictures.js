import React, { useEffect, useRef, useState } from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {useQuery} from '../shared-logic/shared-components'
import {searchPicsAction, addToHistory} from '../actions'
import {loadPics} from '../shared-logic/api-call'

// function Pictures() {

//     const query = useQuery()
//     const history = useHistory()
//     const dispatch = useDispatch()
//     const searchHistory = useSelector(state => state.searchHistory)
//     const picsArray = useSelector(state => state.picsArray)
//     const [gallery, setGallery] = useState([])
//     const gallryElement = useRef()


//     useEffect(() => {
//         // const q = query.get("q")

//         // if(!q) {
//         //     history.goBack()
//         // }
        
//         // if(q !== searchHistory[0] || searchHistory.length === 0) {
//         //     dispatch(searchPicsAction({search: q}))
//         // }

//         // return() => {
//         //     setGallery([])
//         // }

//     }, [])

//     useEffect(() => {

//         const tempPics = loadPics(query.get("q"), 1).then(resp => {
//             console.log("use effect", resp)
//         })
//         // console.log(tempPics)

//         function scrollPagination() {
//             if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//                 dispatch(searchPicsAction({search: query.get("q")}, gallryElement.current.children.length/50 + 1))
//             }
//         }
//         window.addEventListener('scroll',scrollPagination)
        

//         return () => {
//             window.removeEventListener("scroll", scrollPagination)
//         }
//     }, [searchHistory])

//     useEffect(() => {
//         if(picsArray) {
//             let tempArr =  gallery &&  query.get("q") === searchHistory[0] ? [...gallery] : []
//             picsArray.forEach((pic) => {
//                 tempArr.push(<div key={tempArr.length} className="gallery__item">
//                     <img  src={pic.previewURL} />
//                 </div>)
//                 setGallery(tempArr)
//             });
//         }
//     },[picsArray])

//     return(
//         <div ref={gallryElement} className="gallery">
//             {
//                 gallery.map(item => item)
//             }
//         </div>
//     )
// }

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
                console.log(galleryHistory.length / 50)
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