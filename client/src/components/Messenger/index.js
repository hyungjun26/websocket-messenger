import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ConversationList from '../ConversationList';
import LoginForm from '../LoginForm';
import './Messenger.css';
import { login, userid } from '../../modules/UserData'

export default function Messenger() {
  const userData = useSelector(state => state.userdata)
  const dispatch = useDispatch();

  useEffect(()=>{
    let isLogin = window.sessionStorage.getItem("login")
    if(isLogin){
      dispatch(login(true));
      dispatch(userid(window.sessionStorage.getItem("userId")));
    }
  },[])
    return (
      <div className="messenger">        
        {userData.isLogin ? 
          (<div className="scrollable sidebar">
            <ConversationList userId={userData.userId}/>
          </div>):
          (<div className="login-container">
            <div className="inner-container">              
              <LoginForm/>
            </div>
          </div>)}        
      </div>
    );
}