import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/qr-attendance")
  .then(() => console.log("✅ MongoDB bağlandı"))
  .catch((err) => console.error("MongoDB hatası:", err));

const classSchema = new mongoose.Schema({
  className: String,
  teacherName: String,
  token: String,
});
const Class = mongoose.model("Class", classSchema);

const attendanceSchema = new mongoose.Schema({
  classId: String,
  studentName: String,
  studentNumber: String,
});
const Attendance = mongoose.model("Attendance", attendanceSchema);

// QR oluştur
app.post("/generate-qr", async (req, res) => {
  const { className, teacherName } = req.body;
  const token = uuidv4();
  const newClass = await Class.create({ className, teacherName, token });
  res.json({ token, classId: newClass._id });
});

// Öğrenci yoklaması
app.post("/student-checkin", async (req, res) => {
  const { token, studentName, studentNumber } = req.body;
  const classObj = await Class.findOne({ token });
  if (!classObj) return res.status(400).json({ error: "Geçersiz veya eksik token" });

  await Attendance.create({
    classId: classObj._id,
    studentName,
    studentNumber,
  });
  res.json({ message: "Yoklama kaydedildi ✅" });
});

// Yoklama listesi
app.get("/attendance/:classId", async (req, res) => {
  const list = await Attendance.find({ classId: req.params.classId });
  res.json(list);
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server ${PORT} portunda çalışıyor`));