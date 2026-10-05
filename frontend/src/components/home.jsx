import Newnav from "./newnav";
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Link, Outlet, redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { Loss, Win } from "../custhook/statupdate";
export const SharedContext = React.createContext();
const Home = () => {
    const navigate=useNavigate();
    const {res}=useLoaderData();
    console.log(res);
    const location = useLocation();
    const [wins,setwins]=useState();
    const [loss,setloss]=useState();
    const [total,settotal]=useState();
    const [showElements, setShowElements] = useState(true);
    const [points,setpoints]=useState(0);
    const [username,setusername]=useState("");
    const contextValue = { setpoints, username,points,setwins,setloss,wins,loss};
    const [list,setlist]=useState([]);
    
    useEffect(()=>{
      console.log(res);
      let lisst=[];
      lisst.push(<tr key="-1" ><th className=' w-1/3'>Game</th><th className=' w-1/3'>Multiplier</th><th className=' w-1/3'>Points used</th></tr>)
      for(let i=0;i<res.data.d.length;i++){
        lisst.push(<tr className={`text-center ${i % 2 ? 'bg-gray-900' : 'bg-gray-800'} m-11`} key={i}><td>{res.data.d[i].game}</td><td className={`${res.data.d[i].multiplier ? 'text-yellow-400' : 'text-red-600'}`}>{res.data.d[i].multiplier}</td><td>{res.data.d[i].amount}</td></tr>)
      }
      setlist(lisst);
    },[])
    
    useEffect(()=>{
      settotal(wins+loss);   
    },[wins,loss])
    
    useEffect(()=>{
      Win(wins);
    },[wins])

    useEffect(()=>{
      Loss(loss);
    },[loss])


    useEffect(()=>{const d=async()=>{
        try {
          const res = await axios.get("http://localhost:4000/api/safe", {
            withCredentials: true, 
          });
          console.log(res);
          setpoints(res.data.points);
          setusername(res.data.username);
          setwins(res.data.wins);
          setloss(res.data.loss);
        } catch (error) {
        }
    }
  d();}, []);
    useEffect(() => {
      const hideElementsPaths = ['/home/mines', '/home/dice'];
      setShowElements(!hideElementsPaths.includes(location.pathname.toLowerCase()));
    }, [location]);
    
    const logout=async()=>{
      try {
        const res= await axios.post("http://localhost:4000/api/logout",{},{withCredentials:true});
        navigate('/');
      } catch (error) {
        console.log(error.message);
      }
    }

    return (
      <SharedContext.Provider value={contextValue}>
        <div className='flex flex-row m-0 w-screen h-screen bg-gray-900'>
          <div className='flex flex-col items-center align-middle justify-evenly w-1/5 bg-gray-800'>
          <div className="flex flex-col items-center align-middle justify-center bg-gray-900 p-8 rounded-md">
          <h1 className="text-2xl font-bold">Your Stats</h1>
          <h1 className="mt-9 text-lg font-extralight">Times played</h1>
          <h1 className="text-blue-400 bg-gray-800 px-3 rounded-md mt-1 font-extrabold">{total}</h1>
          <h1 className="mt-9 text-lg font-extralight">Wins </h1>
          <h1 className="text-yellow-300 bg-gray-800 px-3 rounded-md mt-1 font-extrabold">{wins}</h1>
          <h1 className="mt-9 text-lg font-extralight">Loses</h1>
          <h1 className="text-red-500 bg-gray-800 px-3 rounded-md mt-1 font-extrabold"> {loss}</h1>
          </div>
          <Button variant="contained" sx={{
        backgroundColor: '#F44336',
        '&:hover': {
          backgroundColor: '#D32F2F',
        },
        color: '#212121',
        textTransform: 'none',
      }} onClick={logout}>Logout</Button>
          </div>
          <div className='flex flex-col w-full'>
            <Newnav info={{username,points}}/>
            {showElements && (
              <>
              <div className="bg-gray-800 mt-2 px-7 py-1 text-center">Games</div>
              </>
            )}
            <div className='h-auto flex flex-row bg-gray-900 mb-2 mt-2'>
              {showElements && (
              <>
              <div className='h-auto flex flex-row align-middle justify-center items-center bg-gray-900 mb-2 mt-2'>
              <Link to='mines'><img className="w-80 mt-2 ml-6 mr-2 hover:opacity-65 rounded-md" src="src\assets\Designer.jpeg" alt="Mines" /></Link>
              <Link to='dice'><img className="w-80 mt-2 mx-2 hover:opacity-65 rounded-md" src="src\assets\dice.jpeg" alt="Dice" /></Link>
              </div>
              </>
            )}
              <Outlet />
            </div >
            {showElements && (
              <div className='flex flex-col h-auto overflow-hidden '>
                <h1 className="bg-gray-800 my-2 px-7 py-1 text-center">Your recent Games</h1>
                <div className='flex flex-col overflow-scroll h-auto hide-scrollbar ml-2'>
                <table>
                {list}
                </table>
                </div>
              </div>
            )}
          </div>
        </div>
        </SharedContext.Provider>
    );
  };
  
  export default Home;