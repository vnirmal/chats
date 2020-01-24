import React, {useState, useRef, useEffect} from 'react'
import './App.css'
import { MdCheckBox, MdEdit } from "react-icons/md";


function NamePicker(props) {
    const [showName, setShowName] = useState(false)
    const [name, setName] = useState('')
    const inputEl = useRef(null)

    function save() {
        setTimeout(()=> {
          inputEl.current.focus()
        }, 50)
        if(name && !showName) {
            props.onSave(name)
            localStorage.setItem('name', name)
        }
        setShowName(!showName)
    }

    useEffect(()=>{
        const n = localStorage.getItem('name')
        if(n) {
            setName(n)
            save()
        }
    }, [])
    
    return <div className="edit-username">
    <input 
        value={name} 
        ref={inputEl}
        className="input-name"
        style={{display: showName ? 'none' : 'flex'}}
        onChange={e=> setName(e.target.value)}
        onKeyPress={e=> {
        if(e.key==='Enter') save()
      }}
    />

    {showName && <div>{name}</div>}

    <button onClick={save} className="name-button">
      {showName ? <MdEdit /> : <MdCheckBox />}
    </button>
  </div>
}
    // if (editName) {
    //     return <div className="user">
    //     <input value={name}
    //         // ref={inputEl}
    //         placeholder="Your name"
    //         onChange={e=> setName(e.target.value)}
    //         className="input-name"
    //     />
    //     <button onClick={()=> setEditName(false)}
    //         className="ok-button">
    //         <MdCheckBox size={15} /> 
    //    </button>
    //     </div>
    // } else {
    //     return <div
    //     className="user">
    //     {name || "Username"}
    //     <button onClick={()=> {setEditName(true)}}
    //         className="edit-button">
    //         <MdEdit size={15}/>
    //     </button>
    // </div>
    // }
    

export default NamePicker;