import React from 'react';
import './Compose.css';

export default function Compose(props) {
  const {setInputMessage, sendMessages, inputMessage} = props;

  

  const onChange = (e) => {
    setInputMessage(e.target.value);
  }
  
  const handleKeyPress = (e) => {
    if(inputMessage.length===0 || inputMessage===undefined)return;
    if(e.key === 'Enter'){
      sendMessages();
    }
  }
    return (
      <div className="compose">
        <input
          type="text"
          value={inputMessage||''}
          className="compose-input"
          placeholder="Type a message"
          onChange={onChange}
          onKeyPress={handleKeyPress}
        />

        {
          props.rightItems
        }
      </div>
    );
}