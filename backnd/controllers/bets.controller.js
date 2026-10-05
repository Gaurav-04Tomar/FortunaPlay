import Bet from "../models/bets.model.js";
import User from "../models/user.model.js";
const createbet=async(req,res)=>{
      try {
        const{mult,input,Game}=req.body;
        const {username}=req.data;
        console.log(username);
        const r=await User.findOne({username:username});
        if(!r){
            throw new Error("User can't be found");
        }
        const d=await Bet.create({placedby:r._id,amount:input,game:Game,multiplier:mult});
        if(!d){
            throw new Error("Bet can't be created");
        }
        const betCount = await Bet.countDocuments({ placedby: user._id });

        if (betCount > 20) {
          const oldestBets = await Bet.find({ placedby: user._id })
            .sort({ createdAt: 1 })
            .limit(betCount - 10)
            .select('_id');
    
          const oldestBetIds = oldestBets.map(bet => bet._id);
    
          await Bet.deleteMany({ _id: { $in: oldestBetIds } });
        }
    
        res.json({message:"Created successfully"});
      } catch (error) {
          res.json({error:error.message});
      }
}

const recentbets=async(req,res)=>{
    try {
      const {username}=req.data;
      const r=await User.findOne({username:username});
      if(!r){
          throw new Error("User can't be found");
      }
      const d=await Bet.find({placedby:r._id}).populate('placedby','username').sort({createdAt: -1}).limit(10);
      if(!d){
          throw new Error("Bet can't be created");
      }
      console.log(d);
      res.json({d});
    } catch (error) {
        res.json({error:error.message});
    }
}
export {createbet,recentbets};