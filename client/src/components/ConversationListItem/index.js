import React, {useState, useEffect} from 'react';
import shave from 'shave';
import MessageList from '../MessageList';

import './ConversationListItem.css';

export default function ConversationListItem({ photo, name, text, host, sendToMessage }) {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    shave('.conversation-snippet', 20);
  })

  console.log(text);
  const openMessage = () =>{
    setShowMessage(true);
    console.log(name);
  }
    return (
      <div>
        <div onClick={openMessage} className="conversation-list-item">
          <img className="conversation-photo" src={photo} alt="conversation" />
          <div className="conversation-info">
            <h1 className="conversation-title">{ name }</h1>
            <p className="conversation-snippet">{ text[text.length-1].message }</p>
          </div>        
        </div>
        {/* <Modal showMessage={showMessage} setShowMessage={setShowMessage} /> */}
        <MessageList 
          showMessage={showMessage} 
          setShowMessage={setShowMessage} 
          name={name} 
          host={host} 
          text={text}
          sendToMessage={sendToMessage}
        />
      </div>
            
    );
}