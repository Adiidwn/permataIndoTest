import mongoose from "mongoose";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import { Iuser } from "../interfaces/Iuser";

const UserSchema = new mongoose.Schema({
    _id: {
        required: true,
        type: String,
        default: () => uuidv4(),
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
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
// UserSchema.methods.comparePassword = function(password) {
//   return bcrypt.compareSync(password, this.hash_password);
// };

export const UserModel = mongoose.model("User", UserSchema)
// const build = (attr: Iuser) => {
//     return new UserModel(attr)
// }

    // _id: {
    //  type: "object",
    //  value: { type: "Buffer"},
    //  default: () => uuidv4(),
    //  required: true},
    // username: {type: String, required: true},
    // email: {type: String, required: true},
    // authentication: {
    //     password: {type: String, required: true, select: false},
    //     salt: {type: String, select: false},
    //     sessionToken: {type: String, select: false}
    // },a

// export const getUsers = () => UserModel.find();
// export const getUserByEmail = (email: string) => UserModel.findOne({email})
// export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
//     'authentication.sessionToken': sessionToken,
// });
// export const getUserById = (id: string) => UserModel.findById(id);
// export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject())
// export const deleteUserById = (id: string) => UserModel.findOneAndDelete({_id: id})
// export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);