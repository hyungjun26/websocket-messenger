import React from 'react';
//import {Route, Link} from 'react-router-dom';
import Messenger from '../Messenger';
import './App.css';
import Socket from '../Socket';

export default function App() {
    return (
      <div className="App">
        <header className="App-header">
          <Socket/>
          {/* <Messenger /> */}
          {/* <Route path="/" component={Messenger} exact />
          <Route path="/message" component={MessageList} exact /> */}
        </header>        
      </div>
    );
}