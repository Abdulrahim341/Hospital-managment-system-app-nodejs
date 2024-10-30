import mongoose from 'mongoose'
import 'dotenv/config'
const dbconnection=mongoose
// .connect("mongodb://localhost:27017/Hospital")
.connect (process.env.DB_URL)
.then(()=>{
    console.log('DB connected');
}).catch((err)=>{
    console.log('DB failure to connect',err);
})
export default dbconnection





