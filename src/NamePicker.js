import React, {useState, useRef, useEffect} from 'react'
import './App.css'
import { MdCheckBox, MdEdit } from "react-icons/md";

// useEffect (()=>{
//     localStorage.getItem(name)
//     if(n)
// }, [])

function NamePicker(props) {
    const [editName, setEditName] = useState(false)
    const [name, setName] = useState('')
    const inputEl = useRef(null)

    if (editName) {
        return <div className="user">
        <input value={name}
            ref={inputEl}
            placeholder="Your name"
            onChange={e=> setName(e.target.value)}
            className="input-name"
        />
        <button onClick={()=> setEditName(false)}
            className="ok-button">
            <MdCheckBox size={15} /> 
       </button>
        </div>
    } else {
        return <div
        className="user">
        {name || "Username"}
        <button onClick={()=> {setEditName(true)}}
            className="edit-button">
            <MdEdit size={15}/>
        </button>
    </div>
    }
    
    }

export default NamePicker;