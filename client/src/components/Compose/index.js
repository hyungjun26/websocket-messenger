import React from 'react';
import './Compose.css';

export default function Compose(props) {
  const {setInputMessage, sendMessages, inputMessage} = props;

  

  const onChange = (e) => {
    console.log(e.target.value);
    setInputMessage(e.target.value);
  }

  const onReset = () => {
    setInputMessage("");
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      sendMessages();
      onReset();
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