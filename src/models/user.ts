import mongoose, {Document, Model, Schema} from "mongoose";

export interface IUser{
    name: string,
    email: string,
    password?: string,
    studentID: string,
    profilePhoto?: string,
    bio?: string,
}

export interface IUserDocument extends IUser, Document{
    createdAt: Date,
    updatedAt: Date,
}

const UserSchema = new mongoose.Schema<IUserDocument>({
    name: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required:true,
        unique:true,
    },
    password: {
        type: String,
        required:false,
    },
    studentID:{
        type: String,
        required:true,
        unique:true,
    },
    profilePhoto:{
        type: String,
        default:""
    },
    bio:{
        type: String,
        default:""
    }
}, {timestamps: true});

const User: Model<IUserDocument> = mongoose.models?.User || mongoose.model<IUserDocument>("User", UserSchema);

export default User;