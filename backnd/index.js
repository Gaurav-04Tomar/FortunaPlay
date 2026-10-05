import express, { json } from "express";
import connectdb from "./db/dbconnect.js";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cors from "cors"
import multer from "multer";
import cookieParser from "cookie-parser";
const app=express();
const PORT=4000;
const corsOptions = {
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  };
const upload=multer();
connectdb();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(cors(corsOptions));
import UserRouter from "./routes/user.routes.js";
app.use("/api",upload.none(),UserRouter)
import BetsRouter from "./routes/bets.routes.js";
app.use("/api/bets",BetsRouter)
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})