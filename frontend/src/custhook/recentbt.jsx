import axios from "axios"

const Recentbt=async()=>{
      try {
        const res=await axios.post("http://localhost:4000/api/bets/recent",{},{withCredentials:true});
        return {res};
      } catch (error) {
        return new Error("Sign in again");
      }
}

export default Recentbt;