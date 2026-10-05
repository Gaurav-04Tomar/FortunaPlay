import Slider from '@mui/material/Slider';
import { useState,useRef, useEffect } from 'react';
import { Button } from '@mui/material';
import Chance from 'chance';
import { SharedContext } from '../home';
import Createbt from '../../custhook/createbt';
import { useContext } from 'react';
import Balupdate from '../../custhook/Balupdate';
const chance= new Chance();

export default function Dice() {
  
  const {setpoints,points,wins,loss,setwins,setloss} = useContext(SharedContext);
  const [firstrender,setfirstrender]=useState(true);
    const [inp,setinp]=useState(0);
    const [mult,setmult]=useState(((1-.01)/.05).toFixed(4));
    const [prob,setprob]=useState(((1-.01)/.05).toFixed(4));
    const [val,setval]=useState(50);
    const [winstr,setwinstr]=useState("");
    const [mrk,setmrk]=useState('50');
    useEffect(()=>{
      if(firstrender){
        setfirstrender(false);
      }
      else{
      Balupdate(points)
      }
    },[points])
    useEffect(()=>{
      setprob(parseFloat(((100-val)/100).toFixed(4)));
    },[val])
    useEffect(()=>{
      setmult(parseFloat(((1-.01)/prob).toFixed(4)));
    },[prob])
    useEffect(()=>{
      if(inp>points){
        setinp(points);
        console.log(inp,points);
      }
    },[points])
    const clck=()=>{
      let min=0;
      let max=100;
      let random=chance.integer({min,max});

      if(random>=val){
         setwinstr("You won");
         setmrk(random);
         setwins(wins+1);
         Createbt(mult,inp,"Dice");
         setpoints(parseFloat((points-inp+inp*mult).toFixed(2)));
      }
      else{
         setwinstr("You lost");
         setloss(loss+1);
         setmrk(random);
         Createbt(0,inp,"Dice");
         setpoints(parseFloat((points-inp).toFixed(2)));
      }
    }

    const marks = [
      {
        value: mrk,
        label:mrk,
      },
    ];
  return (
    <>
      <div className='flex bg-gray-900 justify-center items-center w-full'>
      <div className='w-2/6 h-full flex flex-row align-middle items-center justify-center bg-gray-800 mr-2'><Button onClick={clck}>Bet</Button>
      <input className="bg-black" type="number" min='0' max={`${points}`} value={inp} onChange={(e)=>{let value = parseFloat(e.target.value);
        if (value > points) {
            value = points;
        }
        setinp(value);}}/>
      </div>
      <div className='w-4/6 h-full  flex flex-col items-center justify-center p-6 bg-gray-800 mr-2'>
        <Slider
      sx={{
        color: 'yellow',
        '& .MuiSlider-thumb': {
          borderRadius: '1px',
        },
        '& .MuiSlider-track': {
          backgroundColor: 'red', 
        },
        '& .MuiSlider-mark': {
          backgroundColor: 'white',
          borderRadius:'50%',
          transition:'.5s',
          width: '12px', 
          height: '12px',
        },
        '& .MuiSlider-markLabel': {
          color: 'white',
          transition:'.5s',
        },
      }}
        track={'inverted'}
        defaultValue={50}
        value={val}
        step={1}
        min={0}
        max={100}
        valueLabelDisplay="on"
        marks={marks}
        onChange={(e,v)=>{
          if(v>=98)
            setval(98)
          else if(v<=2)
            setval(2)
          else
          setval(v)}}
      />
      <div className='flex flex-row items-center align-middle justify-between'>
      <div className='my-4 mx-6 w-1/4 p-2 border'>{mult}</div>
      <div className='my-4 mx-6 w-1/4 p-2 border'>{prob}</div>
      </div>
      <h1>{winstr}</h1>
      </div>
      </div>
      </>
  );
}