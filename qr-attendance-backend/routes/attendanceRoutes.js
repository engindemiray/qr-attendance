import express from "express";
import Session from "../models/Session.js";
import Attendance from "../models/Attendance.js";

const router = express.Router();

// ✅ Öğrenci yoklama gönderir
router.post("/checkin", async (req, res) => {
  try {
    const { studentName, studentNumber, token } = req.body;

    const session = await Session.findOne({ token });
    if (!session) return res.status(404).json({ success: false, message: "Token geçersiz" });

    if (session.used) return res.status(400).json({ success: false, message: "Bu QR zaten kullanılmış" });

    if (session.expiresAt < new Date()) {
      return res.status(400).json({ success: false, message: "QR süresi dolmuş" });
    }

    const attendance = new Attendance({ studentName, studentNumber, sessionToken: token });
    await attendance.save();

    // Token tek kullanımlıksa işaretle
    session.used = true;
    await session.save();

    res.json({ success: true, message: "Yoklama kaydedildi" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Yoklama kaydedilemedi" });
  }
});

// ✅ Öğretmen yoklama listesini görür
router.get("/:token", async (req, res) => {
  try {
    const attendances = await Attendance.find({ sessionToken: req.params.token });
    res.json(attendances);
  } catch (err) {
    res.status(500).json({ success: false, error: "Liste alınamadı" });
  }
});

export default router;