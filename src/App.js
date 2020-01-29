import React, {useState, useEffect} from 'react'
import './App.css'
import NamePicker from './NamePicker'
import TextInput from './TextInput'
import {db, useDB} from './db';
import {BrowserRouter, Route } from "react-router-dom";
import { MdChatBubbleOutline } from "react-icons/md";
import Camera from 'react-snap-pic';
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

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
  const [showCamera, setShowCamera] = useState(false)

  async function takePicture(img) {
    setShowCamera(false)
    const imgID = Math.random().toString(36).substring(7)
    var storageRef = firebase.storage().ref()
    var ref = storageRef.child(imgID + '.jpg')
    await ref.putString(img, 'data_url')
    db.send({ img: imgID, name, ts: new Date(), room })
  }
  
  return <main>
    
    {showCamera && <Camera takePicture={takePicture} />}
    
    <header> 
      <div className="title"> 
        <MdChatBubbleOutline
            alt = "logo"
            className="logo" />
      </div>
      <NamePicker onSave={setName} />
    </header>

    <div className="messages">
      {messages.map((m,i)=> <Message key={i} m={m} name={name}/>)}
    </div>

    <TextInput onSend={(text)=> {
      db.send({
        text, name, ts: new Date(), room
      })
    }} 
      showCamera={()=>setShowCamera(true)}
    />
       
  </main>
  
  
}

const bucket = 'https://firebasestorage.googleapis.com/v0/b/chat-438.appspot.com/o/'
const suffix = '.jpg?alt=media'

function Message({m, name}) {
  return <div className="message-wrap"
  from={m.name===name?'me':'you'}>
  <div className="msg-name">{m.name}</div>
  <div className="message"> 
  <div className="msg-text">{m.text}</div>
  {m.img && <img src={bucket+m.img+suffix} alt="pic"/> }
  </div>
  </div>
}

export default App;
