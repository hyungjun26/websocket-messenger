import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import './LoginForm.css'
import Register from '../Register'
import axios from 'axios';
import { login, userid } from '../../modules/UserData'

export default function LoginForm() {
    const [openRegister, setOpenRegister] = useState(false);
    const [password, setPassword] = useState("");
    const [inputId, setInputId] = useState("");
    
    const dispatch = useDispatch();

    const enterMessanger = () => {
        //setLogin(true);
        axios({
            method:"post",
            url: process.env.REACT_APP_USER_BASE_URL + "/login",
            data:{
                id:inputId,
                password:password
            }
        })
        .then((response)=>{
            if(response.data === 100){
                alert("ID를 다시 확인해주세요.")
                return;
            }else if(response.data === 200){
                alert("Password를 다시 확인해주세요.")
                return;
            }
            window.sessionStorage.setItem("userId", inputId);
            window.sessionStorage.setItem("login", true);
            dispatch(userid(inputId));
            dispatch(login(true));
        })
    }



    const handleRegister = () =>{
        setOpenRegister(true);
    }

    return (
        <div className="form-container">
            <p className="title">Messenger</p>
            <input className="login-input" onChange={e=>setInputId(e.target.value)} placeholder="ID"/>
            <input className="login-input" onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password"/>
            <button className="btn-login" onClick={enterMessanger}>Login</button>
            <div className="hr"/>
            <button onClick={handleRegister} className="register">Register as a member?</button>
            <Register open={openRegister} setOpen={setOpenRegister}/>
        </div>
    )
}
