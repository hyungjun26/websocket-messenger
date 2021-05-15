import React, {useRef, useEffect} from 'react'
import SockJsClient from 'react-stomp';

export default function Socket(userName) {
    const url = "http://localhost:8000/chat"
    let $websocket = useRef(null);    

    const handleMessage = (msg) => {
        console.log(msg);
    };
    const handleClickSendTo = () => { $websocket.current.sendMessage('/sendTo'); }; 
    const handleClickSendTemplate = () => { $websocket.current.sendMessage('/Template'); };
    return (
        <div>
            <SockJsClient 
                url="http://localhost:8000/chat" 
                topics={['/topics/sendTo', '/topics/template', '/topics/api']} 
                onMessage={msg => { console.log(msg); }} ref={$websocket} 
            /> 
            <button onClick={handleClickSendTo}>SendTo</button> 
            <button onClick={handleClickSendTemplate}>SendTemplate</button>
        </div>
    )
}
