import { connection } from "./db.js"

const initSchema = async () => {
    try {
         
        
    } catch(error) {
        console.error("Tables not created" , error)
        throw error
    }
}

export default initSchema