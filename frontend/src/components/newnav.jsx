import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Balupdate from '../custhook/Balupdate';

function Newnav({info}){
    const gen=()=>{
        if(info.points==0){
        Balupdate(1000);
        window.location.reload();
        }
        else{
            alert("Balance should be zero to generate 1000 Points.");
        }
    }
    return(
    <>
    <div className='flex flex-row justify-between bg-gray-800 p-2  text-white ml-2'>
    <h1 className=' pl-1 font-semibold text-lg mr-4 text-emerald-600'>FortunaPlay</h1>
    <Stack spacing={2} direction="row">
       <div className='flex flex-col text-center justify-center align-middle text-yellow-200 font-bold'>{info.points}</div>
       <Button variant="contained" sx={{
        textTransform: 'none',
      }} onClick={gen}>Generate</Button>
    </Stack>
    <div className='flex flex-row items-center justify-center align-middle'>
    <h1 className='font-thin'>Welcome, </h1>
    <h1 className=' pl-1 font-semibold text-lg mr-4'>{info.username}</h1>
    </div>
    </div>
    </>
    );
}

export default Newnav;