import Chance from "chance";
import { Button } from "@mui/material";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { SharedContext } from './../home';
import Balupdate from "../../custhook/Balupdate";
import Createbt from "../../custhook/createbt";
const chance=new Chance();
function Mines(){
    const[ isDisabled, setDisabled]=useState(false);
    const [winstr,setwinstr]=useState("");
    const {setpoints,points,wins,loss,setwins,setloss} = useContext(SharedContext);
    const [ongoing,setongoing]=useState(0);
    const [arr,setarr]=useState([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]);
    const [reveal,setreveal]=useState([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]);
    const [ldivs,setldivs]=useState([]);
    const [mult,setmult]=useState(1);
    const [inp,setinp]=useState(0);
    const [space,setspace]=useState(24);
    useEffect(()=>{
        if(inp>points){
            setinp(points);
        }
    },[points])
    useEffect(()=>{
        generatedivs();
    },[arr,reveal])
    useEffect(()=>{
        setmult((25/(space+1)).toFixed(4));
    },[space])
    const generatedivs=()=>{
        let i=0;
        const templist=[];
        for(let j=0;j<=4;j++){
            for(let k=0;k<=4;k++){
                templist.push(
                   <div key={`${j}-${k}`} onClick={()=>{handlereveal(j,k)}} className={`transition-all flex justify-center items-center h-8 sm:h-11 md:h-15 lg:h-20 xl:h-20 
                      w-8 sm:w-11 md:w-15 lg:w-20 xl:w-20 rounded-md
                    ${reveal[j][k]==0?"bg-gray-950 hover:bg-gray-900":arr[j][k]==0?"bg-diamond bg-cover bg-center":"bg-mines bg-cover bg-center"}`}>
                   </div>
                )
            }
        }
        setldivs(templist);
    }

    const handlereveal=(j,k)=>{ 
        if(reveal[j][k]==0){
        if(ongoing){
        let tmp=[...reveal];
        tmp[j][k]=1;
        setreveal(tmp);
        if(arr[j][k]==1){
              setmult(0);
              const p=points;
              const i=inp;
              setDisabled(!isDisabled);
              setpoints(parseFloat((p-i).toFixed(2)));
              Balupdate(parseFloat((p-i).toFixed(2)));
              setloss(loss+1);
              Createbt(0,inp,"Mines");
              setwinstr("You lost");
              setspace(24);
              setTimeout(reset,2000);
        }
        else{
            setspace(space-1);
        }
    }
    }
    }
    const reset=()=>{
        setwinstr("");
        setongoing(!ongoing);
        setarr([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]);
        setreveal([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]);
    }

    const hclck= ()=>{
        setDisabled(!isDisabled);
        const t=ongoing;
        if(!t){
        setongoing(!t);
        const min=0;
        const max=4;
        let randomx= chance.integer({min,max});
        let randomy= chance.integer({min,max});
        const temparr=[...arr];
        temparr[randomx][randomy]=1;
        setarr(temparr);
        console.log(arr);
        }
        else{
            const c=points;
            setpoints(parseFloat((c+inp*mult-inp).toFixed(2)));
            Balupdate(parseFloat((c+inp*mult-inp).toFixed(2)));
            if(mult>1){
            setwins(wins+1);
            }
            Createbt(mult,inp,"Mines");
            reset();
            setspace(24);
        }
    };
    return(
       <>
       <div className='flex bg-gray-900 justify-center items-center w-full align-middle'>
      <div className=' h-full w-2/6 flex flex-col align-middle items-center justify-center bg-gray-800 mx-2'>
      <div className="flex flex-row  align-middle border-2 border-gray-900">
      <Button onClick={hclck} sx={{
        backgroundColor: '#FFEA00',
        '&:hover': {
          backgroundColor: '#FFD600',
        },
        color: '#212121',
        textTransform: 'none',
      }} variant="contained">{!ongoing?'Play':'Stop'}</Button>
      <input className='bg-gray-900 flex-grow ml-0 border-l-8 border-gray-900'type="number" min="0" max={`${points}`} value={inp} onChange={(e)=>{const vl=e.target.value;
        if(vl>=points){
            setinp(points);}
        else{
            setinp(vl);}
      }} disabled={isDisabled}/>
      </div>
      <div className="mt-8 bg-gray-900 p-7 border-0 rounded-md flex flex-col align-middle items-center justify-center">
      <h1 className="font-light">Multiplier</h1>
      <h1 className="text-yellow-300 font-semibold">{mult}</h1>
      </div>
      <h1 className="m-4 text-red-300">{winstr}</h1>
      </div>
      <div className='w-4/6 h-full flex flex-col items-center justify-center p-6 bg-gray-800 mr-2'>
       <div className=" grid grid-cols-5 gap-4">
        {ldivs}
       </div>
      </div>
      </div>
       </>
    );
}

export default Mines;