import mongoose from "mongoose";

export interface Iuser {
    fullname: string;
    email: string;
    password: string;   
}