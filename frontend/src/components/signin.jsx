import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: "column",
  alignContent:"center",
  justifyContent: "center",
  alignItems:"center",
  width:'25%',
  height: '30%',
  top: '50%',
  left: '50%',
  backgroundColor: "rgb(31 41 55)",
  transform: 'translate(-50%, -50%)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Signin({ open, handleOpen, handleClose }) {
  const username=useRef(null);
  const password=useRef(null);
  const [c,setc]=useState("");
  const navigate = useNavigate();
  const handleSignIn = async() => {
    const res = await axios.get('http://localhost:4000/api/login', {
      params: {
        name: username.current.value,
        pass: password.current.value,
      },
      withCredentials: true,
    });
    console.log(res)
    if(res.data.message==="login successful"){
    handleClose();
    navigate('/home');
    }
    else{
    setc("something went wrong try again");
    }
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
            <input className='m-5 rounded-sm' type="text" placeholder='Enter your username' ref={username}/>
            <input className='m-5 rounded-sm' type="password" placeholder='Enter password' ref={password}/>
           <Button variant="contained" onClick={handleSignIn}>Sign in</Button>
           <div>{c}</div>
        </div>
      </Modal>
    </>
  );
}