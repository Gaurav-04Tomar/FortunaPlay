import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Register from './register.jsx';
import Signin from './signin.jsx';
import { Router } from 'react-router-dom';

function Navba(){
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const props={
        open:open,
        handleOpen:handleOpen,
        handleClose:handleClose,
  }
    return(
    <>
    <div className='flex flex-row justify-between bg-gray-800 p-2  text-white'>
    <h1>FortunaPlay</h1>
    <Stack spacing={2} direction="row">
       <Button variant="text" color='inherit' onClick={handleOpen1}>Sign in</Button>
       <Button variant="contained" onClick={handleOpen}>Register</Button>
    </Stack>
    </div>
    <Register {...props}/>
    <Signin open={open1} handleOpen={handleOpen1} handleClose={handleClose1}/>
    </>
    );
}

export default Navba;