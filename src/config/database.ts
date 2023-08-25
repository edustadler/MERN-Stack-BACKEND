import mongoose, { Connection } from "mongoose"
import dotenv from 'dotenv';
dotenv.config(); 

const dbConfig = process.env.DB_CONNECTION_URI


const connectionOption = {
    bufferCommands: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}


export const connection: Connection = mongoose.createConnection(dbConfig, connectionOption);

connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

