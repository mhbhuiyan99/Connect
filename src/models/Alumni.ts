import mongoose, { Document, Model, Schema } from "mongoose";

export interface IAlumni {
  studentID: string; 
  batch: string;
  name: string;
  email: string;
  currentIndustry?: string;
  jobTitle?: string;
  skills?: string[]; 
  linkedIn?: string;
  facebook?: string;
  photo?: string;
}

export interface IAlumniDocument extends IAlumni, Document {
  createdAt: Date;
  updatedAt: Date;
}

const AlumniSchema = new Schema<IAlumniDocument>(
  {
    studentID: {  
      type: String,
      required: true,
      unique: true,
    },
    batch: { 
      type: String,
      required: true,
    },
    name: { 
      type: String,
      required: true,
    },
    email: { 
      type: String,
      required: true,
      unique: true,
    },
    currentIndustry: {
      type: String,
      default: "Not specified",
    },
    jobTitle: {
      type: String,
      default: "Not specified",
    },
    skills: {  // Changed to array
      type: [String],
      default: [],
    },
    linkedIn: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
    photo: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Existing model check
const Alumni: Model<IAlumniDocument> = 
  mongoose.models?.Alumni || 
  mongoose.model<IAlumniDocument>("Alumni", AlumniSchema);

export default Alumni;