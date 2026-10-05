import mongoose from "mongoose";
const betsSchema= new mongoose.Schema(
      {
        placedby:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        amount:{
            type:Number,
            required:true,
        },
        game:{
            type:String,
            required:true,
        },
        multiplier:{
            type:Number,
            required:true,
        },
      },{timestamps:true}
)

const Bet=mongoose.model("Bet",betsSchema);
export default Bet;