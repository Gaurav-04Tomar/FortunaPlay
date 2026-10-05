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
  height: '50%',
  top: '50%',
  left: '50%',
  backgroundColor: "rgb(31 41 55)",
  transform: 'translate(-50%, -50%)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Register({ open, handleOpen, handleClose }) {
  const username=useRef(null);
  const password=useRef(null);
  const[divv,setdivv]=useState("");
  const navigate = useNavigate();
  const handleRegister = async() => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/register",
        {
          name: username.current.value,
          pass: password.current.value
        },
        { withCredentials: true }
      )
      handleClose();
      navigate('/home');
    } catch (error) {
      setdivv("Something went wrong. Try again!!");
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
            <Button variant="contained" onClick={handleRegister}>Register</Button>
            <div>{divv}</div>
        </div>
      </Modal>
    </>
  );
}