import {useState, useEffect} from 'react'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

let store
const coll = 'messages'

function useDB(room) {
    const [messages, setMessages] = useState([])
    function add(m) {
        setMessages(current => {
            const msgs = [m, ...current]
            msgs.sort((a,b)=> b.ts.seconds - a.ts.seconds)
            return msgs
        })
    }
    function remove(id) {
        setMessages(current=> current.filter(m=> m.id!==id))
    }
    useEffect(() => {
        store.collection(coll)
        .where('room','==',room)
        .onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [])
    return messages
}

const db = {}
db.send = function(msg) {
    return store.collection(coll).add(msg)
}
db.delete = function(id) {
    return store.collection(coll).doc(id).delete()
}

export { db, useDB }

const firebaseConfig = {
    apiKey: "AIzaSyDyQIDlsw0aEznP951tg6pDt0sJ25JVQ0U",
    authDomain: "chat-438.firebaseapp.com",
    databaseURL: "https://chat-438.firebaseio.com",
    projectId: "chat-438",
    storageBucket: "chat-438.appspot.com",
    messagingSenderId: "391000101133",
    appId: "1:391000101133:web:8fdabfcd581b414cd4a044",
    measurementId: "G-CVCGHZM4B0"
  };

firebase.initializeApp(firebaseConfig)
store = firebase.firestore()