import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default function Register({open, setOpen}) {
    
    const [userInfo, setUserInfo] = useState({});

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (e) => {
        if(e.target.id==='userid'){
            setUserInfo({
                ...userInfo,
                id:e.target.value
            })
        }
        if(e.target.id==='name'){
            setUserInfo({
                ...userInfo,
                name:e.target.value
            })
        }
        if(e.target.id==='pwd'){
            setUserInfo({
                ...userInfo,
                password:e.target.value
            })
        }        
    }

    const handleRegisterNow = () => {
        if(userInfo.id.length===0||userInfo.id===undefined){
            alert("ID를 입력해주세요.");
            return;
        }
        if(userInfo.name.length===0||userInfo.name===undefined){
            alert("이름을 입력해주세요.");
            return;
        }
        if(userInfo.password.length===0||userInfo.password===undefined){
            alert("Password를 입력해주세요.");
            return;
        }
        axios({
            method:"post",
            url:process.env.REACT_APP_USER_BASE_URL+"/register",
            data:{
                id:userInfo.id,
                name:userInfo.name,
                password:userInfo.password
            }
        })
        .then((response)=>{
            if(response.data){
                if(!alert("등록되었습니다.")){
                    handleClose();
                }                
            } else {
                alert("이미 사용중인 ID입니다.")
            }
        })
        .catch((error) => {
        })
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Register</DialogTitle>
                <DialogContent>                
                    <TextField
                        onChange={handleChange}
                        autoFocus
                        margin="dense"
                        id="userid"
                        label="ID"
                        type="text"
                        fullWidth
                    />
                    <TextField    
                        onChange={handleChange}                    
                        margin="dense"
                        id="pwd"
                        label="Password"
                        type="password"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>                
                    <Button onClick={handleRegisterNow} color="primary">
                        Register now
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>    
        </div>
    )
}
