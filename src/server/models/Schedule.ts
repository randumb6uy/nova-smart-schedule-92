import mongoose from 'mongoose';

export interface ISchedule extends mongoose.Document {
  course: mongoose.Types.ObjectId;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // Format: "HH:mm"
  endTime: string;
  room: string;
}

const scheduleSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  dayOfWeek: {
    type: Number,
    required: true,
    min: 0,
    max: 6,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Add index to help with conflict detection
scheduleSchema.index({ dayOfWeek: 1, startTime: 1, endTime: 1, room: 1 });

export default mongoose.model<ISchedule>('Schedule', scheduleSchema);