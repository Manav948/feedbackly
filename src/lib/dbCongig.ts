import mongoose from "mongoose";
            
type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function connectDb() :Promise<void> {
    if(connection.isConnected) {
        console.log("Already connect with database")
        return
    }
    try {
        const DB = await mongoose.connect(process.env.MONGO_URI || "")
        DB.connections[0].readyState
        console.log("DB connected successfully")
    } catch (error) {
        console.log("Errror in database Connection : ",error)
        process.exit()
    }
}

export default connectDb