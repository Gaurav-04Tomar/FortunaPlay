import { Router } from "express";
import User from "../models/user.model.js";
import {logout, loss, register, updateamt, win} from "../controllers/user.controller.js";
import { login } from "../controllers/user.controller.js";
import authenticateJwt from "../middlewares/authenticatejwt.js";
import top from "../controllers/topusers.controller.js";
const UserRouter= Router();
UserRouter.route('/update').post(authenticateJwt,updateamt);
UserRouter.route('/register').post(register);
UserRouter.route('/logout').post(logout);
UserRouter.route('/win').post(authenticateJwt,win);
UserRouter.route('/loss').post(authenticateJwt,loss);
UserRouter.route('/top').get(top);
UserRouter.route('/safe').get(authenticateJwt,async (req,res)=>{
    try {
        const username=req.data.username;
        const d=await User.findOne({username});
        if(!d){
            throw new Error("Username not found");
        }
        return res.json(d);
    } catch (error) {
        res.json({error:error.message});
    }
});
UserRouter.route('/login').get(login);
export default UserRouter;