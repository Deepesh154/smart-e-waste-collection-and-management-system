import dotenv from "dotenv"
dotenv.config()

import { app } from "./app.js"
import connectDB from "./db/db.js"
import initSchema from "./db/initSchema.js"

const startServer= async () =>{
    try{
        await connectDB()

        await initSchema()
        
        app.listen(process.env.PORT || 5000), () => {
        console.log(`Server Running at port ${process.env.PORT || 5000}`)
        //server connected successfully
    }
    } catch(error) {
        console.log("Server failed to connect : ", error)
    }
}

startServer()