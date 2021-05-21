import React, {useEffect, useState} from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import 'moment/locale/ko'
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
//import {useSelector, useDispatch} from 'react-redux';
//import { insertPartner, insertMessage } from '../../modules/ConversationList'


import './MessageList.css';

//const MY_USER_ID = 'apple';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MessageList(props) {
  //const [messages, setMessages] = useState([])
  //const list = useSelector(state => state.conversationlist);
  //const dispatch = useDispatch();
  const {showMessage, setShowMessage, partner, list, host, sendToMessage} = props;
  const [inputMessage, setInputMessage] = useState();
  useEffect(() => {
    //getMessages();
    // console.log(list);
  },[])

  const handleClose = () => {
    setShowMessage(false);
    // console.log("close");
  };
  
  // const getMessages = () => {
  //    var tempMessages = [
  //       {
  //         id: 1,
  //         author: 'apple',
  //         message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
  //         timestamp: new Date().getTime()
  //       },        
  //     ]
  //     //setMessages([...messages, ...text])
  // }

  const sendMessages = () => {
    // console.log(inputMessage);
    let temp = [];
    temp.push({
      author:host,
      message:inputMessage
      //timestamp: new Date().getTime()
    })
    //setTextList(text.concat(temp));
    //setMessages(messages.concat(temp));
    sendToMessage(host, partner, inputMessage)
  }

  // const receptMessages = () => {
  //   const input = '상대방 메시지 입니다.'
  //   let temp = [];
  //   temp.push({
  //     author:name,
  //     message:input,
  //     timestamp: new Date().getTime()
  //   })
  //   setMessages(messages.concat(temp));
  // }

  const renderMessages = () => {
    moment.locale('ko');
    let i = 0;
    let messageCount = list.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = list[i - 1];
      let current = list[i];
      let next = list[i + 1];
      let isMine = current.author === host;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;
      let prevCompare = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        // if (previousDuration.as('day') < 1) {
        //   showTimestamp = false;
        // }         
        
        const prevDateParts = previousMoment._d;
        const currentDateParts = currentMoment._d;
        // console.log(previousMoment);
        // console.log(currentDateParts);
        //console.log(prevDateParts[0]+" "+ currentDateParts[0] +" "+ prevDateParts[1] +" "+ currentDateParts[1] +" "+ prevDateParts[2] +" "+ currentDateParts[2]);
        // console.log(previousMoment);
        if(prevDateParts.getYear() === currentDateParts.getYear() && prevDateParts.getMonth() === currentDateParts.getMonth() && prevDateParts.getDay() === currentDateParts.getDay()){
          showTimestamp = false;
          console.log(false);
        }
          
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }        
        const currentDateParts = currentMoment._d;
        const nextDateParts = nextMoment._d;
        if(currentDateParts.getYear() === nextDateParts.getYear() && currentDateParts.getMonth() === nextDateParts.getMonth() 
        && currentDateParts.getDay() === nextDateParts.getDay() && currentDateParts.getHours() === nextDateParts.getHours() && currentDateParts.getMinutes() === nextDateParts.getMinutes()){
            prevCompare = false;
          }
        
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
          prevCompare={prevCompare}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

    return(
      <Dialog fullScreen open={showMessage} TransitionComponent={Transition}>
        <div className="message-list">
          <Toolbar
            title={partner}
            leftItems={[
              <ToolbarButton action={handleClose} key="back" icon="ion-ios-arrow-back" />
            ]}
            rightItems={[
              <ToolbarButton key="exit" icon="ion-md-exit"/>              
            ]}
          />

          <div className="message-list-container">{renderMessages()}</div>

          <Compose 
            rightItems={[
              <ToolbarButton action={sendMessages} key="send" icon="ion-ios-send"/>
            ]}
            host={host}
            name={partner}
            setInputMessage={setInputMessage}
            sendMessages={sendMessages}
            inputMessage={inputMessage}
          />          
        </div>
      </Dialog>
    );
}