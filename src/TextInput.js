import { MdSend, MdPhotoCamera } from "react-icons/md";
import React, {useState} from 'react'
import './App.css'


function TextInput(props) {
    const [text, setText] = useState('')
  
    return <div className="text-input-wrap">
        <button className="button" onClick={props.showCamera}
            style={{left:10, right:'auto'}}>
            <MdPhotoCamera size={12} className="cam-button" />
        </button>
        <input 
            value={text}
            placeholder="Message"
            onChange={e=> setText(e.target.value)}
            className="text-input"
            onKeyPress={e=> {
            if(e.key==='Enter') {
            if(text) props.onSend(text)
                setText('')}
            }
        }
        />
        <button onClick={()=> {
            if(text) props.onSend(text)
            setText('')
        }}
        className="button"
        disabled={!text}>
        <MdSend size={12} className="send-button" />
        </button>
        </div>
  
  }
  
  export default TextInput;