import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    confirmed: boolean;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default User;
