import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPendingUser {
  name: string;
  email: string;
  studentID: string;
  profilePhoto?: string;
}

export interface IPendingUserDocument extends IPendingUser, Document {
  createdAt: Date;
}

const PendingUserSchema = new Schema<IPendingUserDocument>({
  name: { 
    type: String, 
    required: true 
},
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
  studentID: { 
    type: String, 
    required: true, 
    unique: true 
},
  profilePhoto: { 
    type: String, 
    default: "" 
},

}, { timestamps: { createdAt: true, updatedAt: false } });

const PendingUser: Model<IPendingUserDocument> =
  mongoose.models.PendingUser || mongoose.model("PendingUser", PendingUserSchema);

export default PendingUser;
