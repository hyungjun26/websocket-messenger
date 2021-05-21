import React from 'react';
import moment from 'moment';
import './Message.css';

export default function Message(props) {
    const {
      data,
      isMine,
      startsSequence,
      endsSequence,
      showTimestamp,
      prevCompare
    } = props;

    const friendlyTimestamp = moment(data.timestamp).format('LL') + ' ' +moment(data.timestamp).format('dddd');
    const sendTimestamp = moment(data.timestamp).format('LT')
    return (
      <div className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}>
        {
          showTimestamp &&
            <div className="timestamp">
              { friendlyTimestamp }
            </div>
        }

        <div className="bubble-container">
          {
            prevCompare && isMine && 
            <span className="sendtime">
              {sendTimestamp} 
            </span>
          }
          <div className="bubble" title={friendlyTimestamp}>
            { data.message }
          </div>
          {
            prevCompare && !isMine && 
            <span className="sendtime">
              {sendTimestamp}        
            </span>
          }          
        </div>
      </div>
    );
}