import React from 'react'
import './LoginForm.css'
import Button from '@material-ui/core/Button';

export default function LoginForm({setNickname, setLogin}) {

    const enterMessanger = () => {
        setLogin(true);
    }

    const register = () =>{
        console.log("register!");
    }

    return (
        <div className="form-container">
            <p className="title">Messanger</p>
            <input className="login-input" onChange={e=>setNickname(e.target.value)} placeholder="ID"/>
            <input className="login-input" placeholder="Password"/>
            <button className="btn-login" onClick={enterMessanger}>Enter</button>
            <div className="hr"/>
            <button onClick={register} className="register">Register as a member?</button>
        </div>
    )
}
