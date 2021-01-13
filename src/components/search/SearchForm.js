import React, { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {searchPicsAction} from '../../actions/index'
import {required} from '../../shared-logic/validators'

function SearchForm({smallFormClass}) {


    const [formFields] = useState([
        {name: "search", text: "What do you want to search?", validators: [required]}
    ])
    const dispatch = useDispatch()
    const history = useHistory()
    const [classSelection, setClassSelection] = useState({
        form: "",
        button: ""
    })

    useEffect(() => {
        const tempObj = {...classSelection}
        tempObj.form = smallFormClass ? "form form__small" : "form"
        tempObj.button = smallFormClass ? "button button--light button--small" : "button button--light button--big"
        setClassSelection(tempObj)
    }, [smallFormClass])

    const handleSubmit = (e) => {
        e.preventDefault();
        const formObj = {}
        let formValid = true
        formFields.forEach(field => {
            formObj[field.name] = e.target[field.name] ? e.target[field.name].value : undefined
            if(!e.target[field.name].getAttribute("valid")) {
                formValid = false
            }
        })

        if(formValid) {
            dispatch(searchPicsAction(formObj))
            history.push(`/search?q=${formObj.search}`)
        }
    }

    const handleChange = (e) => {
        const index = e.target.getAttribute("index")
        const validatorsArr = formFields[index].validators
        e.target.setAttribute("valid", 1)
        if(validatorsArr.length > 0) {
            validatorsArr.forEach(callback => {
                if(callback(e.target.value)) {
                    e.target.setAttribute("valid", 0)
                }
            })
        }
    }

    return(
        <form onSubmit={handleSubmit} className={classSelection.form}>
            {formFields.map((feild, index) => 
                <div key={index} className="form__item">
                    <input
                        index={index}
                        type="text" 
                        name={feild.name} 
                        id={feild.name} 
                        onChange={handleChange} 
                        placeholder={smallFormClass ? "search" : " "}
                        valid={feild.validators.length === 0 ? 1 : 0}/>
                    <label htmlFor={feild.name}>{feild.text}</label> 
                </div>
            )}
            <div className="form__button">
                <button className={classSelection.button} 
                    type="submit">Search</button>
            </div>
        </form>
    )
}

export default SearchForm