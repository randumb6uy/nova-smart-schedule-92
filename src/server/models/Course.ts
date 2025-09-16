import mongoose from 'mongoose';

export interface ICourse extends mongoose.Document {
  code: string;
  name: string;
  faculty: mongoose.Types.ObjectId;
  students: mongoose.Types.ObjectId[];
  credits: number;
}

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  credits: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model<ICourse>('Course', courseSchema);