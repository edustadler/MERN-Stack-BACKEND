import { connection } from "../config/database";
import mongoose, { Schema, Document } from "mongoose";

interface ICrudData extends Document {
    title: string;
    category: string;
    value: number;
    favorite: boolean;
    type: "Incoming" | "Expense";
    date: Date;
}

const crudDataSchema: Schema = new mongoose.Schema({
    title: String,
    category: String,
    value: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["Incoming", "Expense"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const CrudData = connection.model<ICrudData>("crud", crudDataSchema);

export default CrudData;
