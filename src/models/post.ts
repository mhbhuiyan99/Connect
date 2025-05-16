import mongoose, {Document, Model, Schema} from "mongoose";
import { IUser } from "./user";

export interface IPost{
    description: string,
    user: IUser,
    imageUrl?: string,
    likes?: string[],
    comments: any,
}

export interface IPostDocument extends IPost, Document{
    createdAt:Date,
    updatedAt: Date,
}

const postSchema = new mongoose.Schema<IPostDocument>({
    description:{
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
    likes:{
        type: [String]
    },
    comments:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
}, {timestamps: true});

const Post: Model<IPostDocument> = mongoose.models?.Post || mongoose.model<IPostDocument>("Post", postSchema);

export default Post;