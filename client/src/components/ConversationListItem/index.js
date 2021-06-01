import React, { useState, useEffect } from 'react';
import shave from 'shave';
import MessageList from '../MessageList';
import {useSelector,useDispatch} from 'react-redux';
import { leaveChat } from '../../modules/ConversationList';
import axios from 'axios';

import './ConversationListItem.css';

export default function ConversationListItem ({ partner, host, sendToMessage}){
  const [showMessage, setShowMessage] = useState(false);  
  const conversationList = useSelector(state => state.conversationlist);
  const dispatch = useDispatch();
  const baseImg = process.env.REACT_APP_USER_BASE_IMAGE;
  // const [textList, setTextList] = useState(text);  
  useEffect(() => {
    shave('.conversation-snippet', 20);    
  })  

  const openMessage = () =>{
    setShowMessage(true);
  }

  const handleLeaveChat = () => {
    const isOk = window.confirm('채팅방에서 나가시겠습니까?\n나가기를 하면 대화내용이 모두 삭제되고 채팅목록에서도 삭제됩니다.');
    if(isOk){
      dispatch(leaveChat(partner));
      setShowMessage(false);
      axios(
        {          
          method:'delete',
          url:process.env.REACT_APP_USER_BASE_URL+'/leaveChat',
          data:{
            author:host,
            to:partner,
          }
        }
      )
    }
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
        handleLeaveChat={handleLeaveChat}
      />        
    </div>
  )
};
