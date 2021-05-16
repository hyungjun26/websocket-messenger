import React, {useState, useEffect, useRef} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';
import Button from '@material-ui/core/Button'
import SockJsClient from 'react-stomp';


import './ConversationList.css';


export default function ConversationList({userName}) {
  const [conversations, setConversations] = useState([]);
  const $websocket = useRef(null); 
  const baseUrl = 'http://localhost:8000/user';
  const name = 'test user';

  const sendToMessage = (from, to, msg) =>{
    const m = {message:msg, author:from};
    $websocket.current.sendMessage("/app/send/"+to, JSON.stringify(m));
  }

  useEffect(() => {
    getConversations()
  },[])

 
 const getConversations = () => {
    // axios.get('https://randomuser.me/api/?results=20').then(response => {
    //     console.log(response);
    //     let newConversations = response.data.results.map(result => {
    //       return {
    //         photo: result.picture.large,
    //         name: `${result.name.first} ${result.name.last}`,
    //         text: 'Hello world! This is a long message that needs to be truncated.'
    //       };
    //     });
    //     setConversations([...conversations, ...newConversations])
    // });
    
    axios({
      method:"get",
      url:baseUrl+'/fetchAllUsers/'+ name
    })
    .then((response) => {
      console.log(response);
      let newConversations = response.data.map(res => {
        return {
          photo:"https://randomuser.me/api/portraits/men/12.jpg",
          name:res.partner,
          text:[...res.messageList]
        }
      })
      console.log(newConversations);
      setConversations([...conversations, ...newConversations])
    })
    .catch((error) => {
      
    })
  }

    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenger"          
          leftItems={[
            // <ToolbarButton key="cog" icon="ion-ios-cog" />
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />          
          ]}
          rightItems={[
            <Button color="primary">Log out</Button>
          ]}
        />
        <ConversationSearch />
        {
          conversations.map(conversation => 
            <ConversationListItem             
              key={conversation.name}
              photo={conversation.photo}
              name={conversation.name}
              text={conversation.text}
              host={name}
              sendToMessage={sendToMessage}
            />
          )
        }
        <SockJsClient
          url={baseUrl}
          topics={['/topics/sendTo', '/topics/template', '/topics/api']}
          onMessage={msg => {
            console.log(msg);
          }}
          ref={$websocket}
        />
      </div>
    );
}