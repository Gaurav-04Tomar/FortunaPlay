import { useEffect, useState } from 'react';
import Navba from './navba';
import { useLoaderData } from 'react-router-dom';
function Landing() {
  const {res}=useLoaderData();
  const [list,setlist]=useState([]);
  console.log(res.data.length);
  useEffect(()=>{
    let lisst=[];
    lisst.push(<tr key="-1"><th className=' w-1/3'>Name</th> <th className=' w-1/3'>Balance</th></tr>)
    for(let i=0;i<res.data.length;i++){
      lisst.push(<tr className={`text-center ${i % 2 ? 'bg-gray-900' : 'bg-gray-800'}`} key={i}><td>{res.data[i].username}</td> <td className='text-yellow-300'>{res.data[i].points}</td></tr>)
    }
    setlist(lisst);
  },[])
  return (
      <div className='flex flex-row m-0 w-screen h-screen bg-gray-900'>
        <div className='w-1/5 bg-gray-800 mr-2'>
        </div>
        <div className='flex flex-col w-full'>
        <Navba />
        <div className='overflow-scroll hide-scrollbar'>
        <div className='mb-2 mt-2 h-1/2'>
        <img className="rounded-md h-full" src="src\assets\t6.jpeg" alt="" />
        </div>
        <div className='flex flex-col h-1/3'>
            <h1 className='bg-gray-800'>Top players</h1>
            <div className='flex flex-col hide-scrollbar'>
                <table>
                  {list}
                </table>
                </div>
        </div>
        </div>
        </div>

      </div>
  );
}

export default Landing;