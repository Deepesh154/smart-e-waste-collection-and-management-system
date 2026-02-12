import { connection } from "./db.js"
import fs from "fs"


const initSchema = async () => {
    try {
         const schemaSQL =  fs.readFileSync(process.cwd()+"/database/schema.sql", "utf8")

         await connection.query(schemaSQL)
         console.log("Database and Tables Created...!")
        
    } catch(error) {
        console.error("Tables not created... ! " , error)
        throw error
    }
}

export default initSchema