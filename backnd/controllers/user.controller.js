import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
const SECRET_KEY="oneandonly1"
const register= async (req,res)=>{
    try {
        const{name,pass}= req.body;
        const c=await User.findOne({
            username:name
        });
        if(c){
            console.log(c);
            throw new Error("User already exists!!");
        }
        console.log(name,pass);
        const idd=await User.create({
            username:name,
            password:pass
        });
        const token=await jwt.sign({
            username:name,
            password:pass,
        },SECRET_KEY);

        res.cookie('token', token, { httpOnly: true, secure: false });
        return res.json({idd})
    } catch (error) {
        return res.status(400).json({error:error.message});
    }
}

const login=async(req,res)=>{
      try {
        const{name,pass}=req.query;
        console.log({name});
        const d=await User.findOne({
            username:name});
        console.log(d);
        if(!d){
          throw new Error("User does not exist");
        }
        if(d.password!=pass){
          throw new Error("Password incorrect");
        }
        const token=await jwt.sign({
          username:name,
          password:pass
        },SECRET_KEY);
        
        res.cookie('token',token,{httpOnly: true,secure:false });
        return res.status(201).json({message:"login successful"});
  
      } catch (error) {
        res.json({error:error.message});
      }
}

const logout=async(req,res)=>{
      res.cookie('token', '', { 
        expires: new Date(0), 
        httpOnly: true, 
        sameSite: 'Strict' 
      })
      res.json({message:"logout successful"})
}

const updateamt=async(req,res)=>{
      try {
        const {balance}=req.body;
        console.log(req.body);
        if(!req.data.username){
          throw new Error("Something unexpected happened!!");
        }
        const d=await User.findOneAndUpdate({username:req.data.username},{points:balance},{new:true});
        if(!d){
          throw new Error("User dosen't exists");
        }
        res.status(200).json({points:d.points});
      } catch (error) {
       res.status(400).json({points:d.points});
      }
  };

const win=async(req,res)=>{
      try {
        const{nw}=req.body;
        const d=await User.findOneAndUpdate({username:req.data.username},{wins:nw},{new:true});
        res.json({message:"Successful"});
      } catch (error) {
        res.json({error:error.message});
      }
}
const loss=async(req,res)=>{
  try {
    const{nw}=req.body;
    const d=await User.findOneAndUpdate({username:req.data.username},{loss:nw},{new:true});
    res.json({message:"Successful"});
  } catch (error) {
    res.json({error:error.message});
  }
}

export {login,register,updateamt,win,loss,logout};