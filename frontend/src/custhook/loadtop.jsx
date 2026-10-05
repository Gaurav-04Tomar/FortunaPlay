import axios from "axios"

const Loadtop=async ()=>{
      try {
        const res=await axios.get("http://localhost:4000/api/top");
        return {res};
     }
      catch (error) {
        console.log(error.message);
      }
}

export default Loadtop;