import React, {useState, useEffect} from 'react'
import './App.css'
import NamePicker from './NamePicker'
import {db, useDB} from './db';
import {BrowserRouter, Route } from "react-router-dom";

function App() {
  useEffect (()=> {
    const {pathname} = window.location
    if (pathname.length<2) window.location.pathname='home'
  }, [])
  return <BrowserRouter>
    <Route path="/:room" component={Room}/>
  </BrowserRouter>
}

function Room(props) {
  const {room} = props.match.params
  const [name, setName] = useState('')
  const messages = useDB(room)

  return <main>

    <header> 
      <div className="title"> 
        Chats
        <img src = "https://i.ya-webdesign.com/images/speaking-clipart-quotation-9.png"
            alt = "logo"
            className="logo" />
      </div>
      <NamePicker onSave={setName} />
    </header>

    <div className="messages">
      {messages.map((m,i)=>{
        return <div key={i} className="message-wrap"
          from={m.name===name?'me':'you'}>
          <div className="msg-name">{m.name}</div>
          <div className="message"> 
          <div className="msg-text">{m.text}</div>
          </div>
        </div>
      })}
    </div>

    <TextInput onSend={(text)=> {
      db.send({
        text, name, ts: new Date(), room
      })
    }} />
    
  </main>
}

function TextInput(props) {
  const [text, setText] = useState('')

  return <div className="text-input-wrap">
    <input 
      value={text}
      placeholder="Message"
      onChange={e=> setText(e.target.value)}
      className="text-input"
      onKeyPress={e=> {
      if(e.key==='Enter') {
        if(text) props.onSend(text)
          setText('')
        }
      }}
    />
    <button onClick={()=> {
      if(text) props.onSend(text)
      setText('')
    }}
    className="button"
    disabled={!text}>
    <img src = "https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-up-01-512.png"
        alt = "icon"
        className="icon" />
    </button>
  </div>

}



export default App;
