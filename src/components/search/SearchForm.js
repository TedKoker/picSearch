import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {searchPicsAction} from '../../actions/index'
import {required} from '../../shared-logic/validators'

function SearchForm() {


    const [formFields] = useState([
        {name: "search", text: "What do you want to search?", validators: [required]}
    ])
    const dispatch = useDispatch()

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
            /**Call the action */
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
        <form onSubmit={handleSubmit}>
            {formFields.map((feild, index) => 
                <div key={index}>
                    <label htmlFor={feild.name}>{feild.text}</label> 
                    <input
                        index={index}
                        type="text" 
                        name={feild.name} 
                        id={feild.name} 
                        onChange={handleChange} 
                        valid={feild.validators.length === 0 ? 1 : 0}/>
                </div>
            )}
            <button type="submit">Search</button>
        </form>
    )
}

export default SearchForm