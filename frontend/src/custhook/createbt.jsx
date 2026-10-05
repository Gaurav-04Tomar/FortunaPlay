import axios from "axios"

const Createbt=async(multi,inp,game)=>{
    try {
        const res=await axios.post("http://localhost:4000/api/bets/create",{mult:multi,input:inp,Game:game},{withCredentials:true});
        console.log(res);
    } catch (error) {
        console.log(error.message);
    }
    
}

export default Createbt;