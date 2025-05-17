import mongoose, { Document, Model, Schema } from "mongoose";

export interface IAlumni {
  timestamp: string;
  studentId: string;
  batch: string;
  name: string;
  email: string;
  currentIndustry?: string;
  jobTitle?: string;
  skills?: string;
  photo?: string;
}

export interface IAlumniDocument extends IAlumni, Document {
  createdAt: Date;
  updatedAt: Date;
}

const AlumniSchema = new Schema<IAlumniDocument>(
  {
    timestamp: {
      type: String,
      required: true,
    },
    studentId: {
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
      required:true,
      unique:true,
    },
    currentIndustry: {
      type: String,
      default: "",
    },
    jobTitle: {
      type: String,
      default: "",
    },
    skills: {
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

const Alumni: Model<IAlumniDocument> = mongoose.models?.Alumni || mongoose.model<IAlumniDocument>("Alumni", AlumniSchema);

export default Alumni;