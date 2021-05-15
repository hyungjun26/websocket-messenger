import React, {useState, useEffect} from 'react';
import shave from 'shave';
import Modal from '../Modal';
import MessageList from '../MessageList';

import './ConversationListItem.css';

export default function ConversationListItem(props) {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    shave('.conversation-snippet', 20);
  })

  const openMessage = () =>{
    setShowMessage(true);
    console.log(name);
  }
    const { photo, name, text } = props.data;

    return (
      <div>
        <div onClick={openMessage} className="conversation-list-item">
          <img className="conversation-photo" src={photo} alt="conversation" />
          <div className="conversation-info">
            <h1 className="conversation-title">{ name }</h1>
            <p className="conversation-snippet">{ text }</p>
          </div>        
        </div>
        {/* <Modal showMessage={showMessage} setShowMessage={setShowMessage} /> */}
        <MessageList showMessage={showMessage} setShowMessage={setShowMessage} name={name}/>
      </div>
            
    );
}