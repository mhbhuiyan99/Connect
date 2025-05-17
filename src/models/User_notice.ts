// models/User_notice.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUserNotice {
    name: string;
    email: string;
    password?: string;
    studentID: string;
    profilePhoto?: string;
    bio?: string;
}

export interface IUserNoticeDocument extends IUserNotice, Document {
    createdAt: Date;
    updatedAt: Date;
}

const UserNoticeSchema = new Schema<IUserNoticeDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    studentID: { type: String, required: true, unique: true },
    profilePhoto: { type: String, default: "" },
    bio: { type: String, default: "" }
}, { timestamps: true });

export interface IUserNoticeModel extends Model<IUserNoticeDocument> {}

const UserNotice: IUserNoticeModel = mongoose.models?.User_notice || 
                                     mongoose.model<IUserNoticeDocument, IUserNoticeModel>("User_notice", UserNoticeSchema);

export default UserNotice;