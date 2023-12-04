import mongoose from "mongoose";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { Iuser } from "../interfaces/Iuser";

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
export const categoryModel = mongoose.model("Category", categorySchema)
