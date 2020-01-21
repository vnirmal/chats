import React, {useState} from 'react'
import './App.css'

function NamePicker(props) {
    const [editName, setEditName] = useState(false)
    const [name, setName] = useState('')
    if (editName) {
        return <div className="user">
        <input value={name}
            placeholder="Your name"
            onChange={e=> setName(e.target.value)}
            className="input-name"
        />
        <button onClick={()=> setEditName(false)}
            className="edit-button">
            OK 
       </button>
        </div>
    } else {
        return <div
        className="user">
        {name || "Username"}
        <button onClick={()=> {
            setEditName(true)}}
            className="edit-button">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/23/Edit-icon-grey.png"
            alt = "edit"
            className="icon"
            width="12"
            height="12">
            </img>
        </button>
    </div>
    }
    
    }

export default NamePicker;