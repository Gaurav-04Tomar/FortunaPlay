import axios from "axios";

const Win=async(cnt)=>{
      try {
        const res=await axios.post("http://localhost:4000/api/win",{nw:cnt},{withCredentials:true,})
      } catch (error) {
        console.log(error.message);
      }
}
const Loss=async(cnt)=>{
    try {
        const res=await axios.post("http://localhost:4000/api/loss",{nw:cnt},{withCredentials:true,})
    } catch (error) {
        console.log(error.message);
    }
}

export {Win,Loss};