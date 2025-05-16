import mongoose, {Document, Model, Schema} from "mongoose";
import { IUser } from "./user";

export interface IComment{
    textMessage: string,
    user: IUser
}
export interface ICommentDocument extends IComment, Document{
    createdAt:Date,
    updatedAt:Date
}

const commentSchema = new mongoose.Schema<ICommentDocument>({
    textMessage:{
        type: String,
        required: true
    },
    user:{
        userID:{
            type: String,
            required: true
        },
        profilePhoto:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        }
    },
},{timestamps:true});

const Post: Model<ICommentDocument> = mongoose.models?.Comment || mongoose.model<ICommentDocument>("Comment", commentSchema);

export default Comment;