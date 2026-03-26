import express from "express";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";
import Session from "../models/Session.js";

const router = express.Router();

// ✅ Yeni yoklama (QR token) oluştur
router.post("/create", async (req, res) => {
  try {
    const { className } = req.body;

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 dakika geçerli

    const newSession = new Session({ className, token, expiresAt });
    await newSession.save();

    const qrData = `https://senin-site.com/checkin?token=${token}`;
    const qrImage = await QRCode.toDataURL(qrData);

    res.json({
      success: true,
      qrImage,
      token,
      expiresAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "QR oluşturulamadı" });
  }
});

export default router;