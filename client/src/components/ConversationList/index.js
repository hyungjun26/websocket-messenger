import React, {useState, useEffect, useRef} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';
import Button from '@material-ui/core/Button'
import SockJsClient from 'react-stomp';
import AddPartner from '../AddPartner';
import './ConversationList.css';
import {useSelector, useDispatch} from 'react-redux';
import { insertPartner, insertMessage, receive } from '../../modules/ConversationList'

export default function ConversationList({userId}) {
  const conversationList = useSelector(state => state.conversationlist);
  // const [conversations, setConversations] = useState([]);
  const [addPartner, setAddPartner] = useState(false);
  const $websocket = useRef(null); 
  const baseUrl = 'http://localhost:8000/user';
  let topics = ['/topic/'+userId];
  const dispatch = useDispatch();

  useEffect(() => {
    getConversations()
  },[])

 const getConversations = () => {
    axios({
      method:"get",
      url:baseUrl+'/fetchAllUsers/'+ userId
    })
    .then((response) => {
      for (const key in response.data) {
        dispatch(insertPartner(
          {
            photo:"https://kicolearn.s3.ap-northeast-2.amazonaws.com/items/blank.png",
            partner: response.data[key].partner,
            list:[...response.data[key].messageList]
          }
        ))
        // console.log(conversationList);
      }           
    })
    .catch((error) => {
      
    })    
  }
  const sendToMessage = (from, to, msg) =>{
    const m = {message:msg, author:from, to:to, timestamp: new Date().getTime()};
    $websocket.current.sendMessage("/app/send", JSON.stringify(m));
    dispatch(insertMessage(m));
  }

  const recevieMessage = (msg) => {
    // console.log(msg);
    dispatch(receive(msg));    
  }
  
  const handleAddPartner = (name)=> {
    dispatch(insertPartner({
      photo:"https://kicolearn.s3.ap-northeast-2.amazonaws.com/items/blank.png",
      partner:name,
      list:[]
    }))
  }

  const handleOpenAddPartner = () => {
    setAddPartner(true);
  }

  const handleLogOut = () => {
    window.localStorage.removeItem("login");
    window.localStorage.removeItem("userId");
    window.location.reload();
  }

    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenger"          
          leftItems={[
            <ToolbarButton action={handleOpenAddPartner} key="add" icon="ion-ios-add-circle-outline" />          
          ]}
          rightItems={[
            <Button onClick={handleLogOut} key="out" color="primary">Log out</Button>
          ]}
        />
        <ConversationSearch />
        { 
          Object.keys(conversationList).map((key) => 
            <ConversationListItem             
              key={key}
              //photo={conversation.photo}
              partner={key}
              //list={conversationList[key]}
              host={userId}
              sendToMessage={sendToMessage}
            />
          )
        }
        <AddPartner userId={userId} open={addPartner} setOpen={setAddPartner} handleAddPartner={handleAddPartner}/>
        <SockJsClient
          url="http://localhost:8000/chat"
          topics={topics}
          onMessage={msg => {
            recevieMessage(msg);
          }}
          ref={$websocket}
        />
      </div>
    );
}