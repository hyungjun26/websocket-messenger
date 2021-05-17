import React from 'react'

export default function LoginForm({setNickname, setLogin}) {

    const enterMessanger = () => {
        setLogin(true);
    }

    return (
        <div>
            <input onChange={e=>setNickname(e.target.value)}/>
            <button onClick={enterMessanger}>Enter</button>
        </div>
    )
}
