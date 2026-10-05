import User from "../models/user.model.js";

const top=async (req,res)=>{
      try {
            const p=await User.find().sort({points:-1}).limit(10);
            res.json(p);
      } catch (error) {
            res.json({error:error.message});
      }
}

export default top;