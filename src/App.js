import React, {useState} from 'react';
import './App.css';

function App() {
  return <main>

    <header> 
      Chats
     <img src = "https://i.ya-webdesign.com/images/speaking-clipart-quotation-9.png"
        alt = "logo"
        className="logo" />
    
    
    </header>
    <TextInput onSend={t=> console.log(t)} />
    
  </main>
}

function TextInput(props) {
  const [text, setText] = useState('')

  return <div className="text-input-wrap">
    <input value={text}
      placeholder="Message"
      onChange={e=> setText(e.target.value)}
      className="text-input"
    
    />
    <button onClick={()=> {
      props.onSend(text)
      setText('')
    }}
    className="button">
    <img src = "https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-up-01-512.png"
        alt = "icon"
        className="icon" />
    </button>
    
  </div>

}


export default App;
