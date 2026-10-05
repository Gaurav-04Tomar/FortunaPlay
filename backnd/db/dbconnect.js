import mongoose from "mongoose";
const connectdb= async()=>{
     try {
        const a=await mongoose.connect("mongodb+srv://gauravt:1234getonfloor@cluster0.5xw2yvm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Database Successfully connected");
     } catch (error) {
        console.log("Something went wrong!! ",error.message);
     }
}

export default connectdb;
