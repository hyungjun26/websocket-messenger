import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default function AddPartner({open, setOpen, handleAddPartner, userId}) {
    const [partnerId, setPartnerId] = useState("");
    const handleClose = () => {
        setOpen(false);
    }
    const handleRegisterPartner = () =>{
        axios({
            method:"get",
            url:"http://localhost:8000/user/search/"+userId+"/"+partnerId
        })
        .then((response)=>{
            if(response.data===101){
                alert("존재하지 않는 사용자입니다.")
            } else if(response.data===102){ 
                alert("이미 추가된 사용자입니다.")
            } else {
                handleAddPartner(partnerId);
                handleClose();
            }
        })
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Partner Register</DialogTitle>
                <DialogContent>                
                    <TextField
                        onChange={e=>setPartnerId(e.target.value)}
                        autoFocus
                        margin="dense"
                        id="userid"
                        label="Partner ID"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>                
                    <Button onClick={handleRegisterPartner} color="primary">
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
