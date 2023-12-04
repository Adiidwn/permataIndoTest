import mongoose, { Document } from "mongoose";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { Iuser } from "../interfaces/Iuser";

export interface ITask extends Document {
    _id: string;
    description: string;
    status: boolean;
    category: mongoose.Types.ObjectId | ICategory
    createdAt: Date;
    updatedAt: Date;
}
const taskSchema = new mongoose.Schema({
    _id: {
        required: true,
        type: String,
        default: () => uuidv4(),
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

export interface ICategory extends Document{
    _id: string;
    description: string;
    color: string;
    date: Date;  
  }
const categorySchema = new mongoose.Schema({
    _id: {
        required: true,
        type: String,
        default: () => uuidv4(),
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})


export const taskModel = mongoose.model("Tasks", taskSchema)
export const categoryModel = mongoose.model<ICategory>("Category", categorySchema)
