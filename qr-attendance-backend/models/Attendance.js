import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  studentName: String,
  studentNumber: String,
  sessionToken: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Attendance", attendanceSchema);