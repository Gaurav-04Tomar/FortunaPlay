import { Router } from "express";
import authenticateJwt from "../middlewares/authenticatejwt.js";
import { createbet, recentbets } from "../controllers/bets.controller.js";

const BetsRouter=Router();
BetsRouter.route('/create').post(authenticateJwt,createbet);
BetsRouter.route('/recent').post(authenticateJwt,recentbets);
export default BetsRouter;