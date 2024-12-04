import mongoose, { Document, PopulatedDoc } from "mongoose";
import { ITask } from "./Task";
import { IUser } from "./User";
export interface IProject extends Document {
    projectName: string;
    clientName: string;
    description: string;
    tasks: PopulatedDoc<ITask & Document>[];
    manager: PopulatedDoc<IUser & Document>;
    team: PopulatedDoc<IUser & Document>[];
}
declare const Project: mongoose.Model<IProject, {}, {}, {}, mongoose.Document<unknown, {}, IProject> & IProject & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Project;
