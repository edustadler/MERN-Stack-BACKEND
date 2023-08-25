import bcrypt from "bcrypt";
import { connection } from "../config/database";
import mongoose, { Model, Schema } from "mongoose";

interface Iuser extends Document {
    Name: string;
    Username: string;
    Email: string;
    Password: string;
}

const userSchema: Schema = new mongoose.Schema({
    Name: String,
    Username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    Password: {
        type: String,
        required: true
    },
}, { timestamps: true });

const authUser = connection.model<Iuser>("user", userSchema);

export default authUser;