import React, { useState, useEffect } from 'react';
import shave from 'shave';
import MessageList from '../MessageList';
import {useSelector} from 'react-redux';
//import { insertPartner, insertMessage } from '../../modules/ConversationList'

import './ConversationListItem.css';

export default function ConversationListItem ({ partner, host, sendToMessage}){
  const [showMessage, setShowMessage] = useState(false);  
  const conversationList = useSelector(state => state.conversationlist);
  //const dispatch = useDispatch();
  const baseImg = process.env.REACT_APP_USER_BASE_IMAGE;
  // const [textList, setTextList] = useState(text);  
  useEffect(() => {
    shave('.conversation-snippet', 20);    
  })  
  const openMessage = () =>{
    setShowMessage(true);
  }
  return (
    <div>
      <div onClick={openMessage} className="conversation-list-item">
        <img className="conversation-photo" src={baseImg} alt="conversation" />
        <div className="conversation-info">
          <h1 className="conversation-title">{ partner }</h1>
          <p className="conversation-snippet">{ conversationList[partner].length === 0 ? "" : conversationList[partner][conversationList[partner].length-1].message }</p>
        </div>        
      </div>
      <MessageList 
        showMessage={showMessage} 
        setShowMessage={setShowMessage} 
        partner={partner} 
        host={host} 
        list={conversationList[partner]}
        sendToMessage={sendToMessage}
        //setTextList={setTextList}
      />        
    </div>
  )
};
