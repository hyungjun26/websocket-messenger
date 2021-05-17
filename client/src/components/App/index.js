import React, {useState} from 'react';
//import {Route, Link} from 'react-router-dom';
import Messenger from '../Messenger';
import './App.css';
import LoginForm from '../LoginForm';

export default function App() {
  const [nickname, setNickname] = useState(null);
  const [login, setLogin] = useState(false);  
    return (
      <div className="App">
        <header className="App-header">
          {/* <Socket/> */}
          {login?<Messenger nickname={nickname}/>:<LoginForm setNickname={setNickname} setLogin={setLogin}/>}
          {/* <Messenger /> */}
          {/* <Route path="/" component={Messenger} exact />
          <Route path="/message" component={MessageList} exact /> */}
        </header>        
      </div>
    );
}