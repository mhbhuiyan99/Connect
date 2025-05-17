import mongoose, { Document, Model, Schema } from "mongoose";

export interface IAlumni {
  StudentID: string;
  Batch: string;
  Name: string;
  Email: string;
  CurrentIndustry?: string;
  JobTitle?: string;
  Skills?: string;
  LinkedIn?: string;
  Photo?: string;
}

export interface IAlumniDocument extends IAlumni, Document {
  createdAt: Date;
  updatedAt: Date;
}

const AlumniSchema = new Schema<IAlumniDocument>(
  {
    StudentID: {
      type: String,
      required: true,
      unique: true,
    },
    Batch: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required:true,
      unique:true,
    },
    CurrentIndustry: {
      type: String,
      default: "",
    },
    JobTitle: {
      type: String,
      default: "",
    },
    Skills: {
      type: String,
      default: "",
    },
    LinkedIn: {
      type: String,
      default: "",
    },
    Photo: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Alumni: Model<IAlumniDocument> = mongoose.models?.Alumni || mongoose.model<IAlumniDocument>("Alumni", AlumniSchema);

export default Alumni;