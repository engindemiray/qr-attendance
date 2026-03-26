import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import API from "../api";

const StudentScanner = () => {
  const [studentName, setStudentName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [scanResult, setScanResult] = useState("");
  const [message, setMessage] = useState("");

  const handleScan = async (result) => {
    if (result && result.text && result.text !== scanResult) {
      setScanResult(result.text);
      const token = new URL(result.text).searchParams.get("token");
      if (!token) return alert("Geçersiz QR!");

      try {
        const res = await API.post("/attendance/checkin", {
          studentName,
          studentNumber,
          token,
        });
        setMessage(res.data.message || "Yoklama alındı ✅");
      } catch (err) {
        setMessage(err.response?.data?.message || "Hata oluştu");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>📷 Öğrenci Yoklama Sayfası</h2>
      <input
        type="text"
        placeholder="Ad Soyad"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Numara"
        value={studentNumber}
        onChange={(e) => setStudentNumber(e.target.value)}
        style={{ marginLeft: 10 }}
      />

      <div style={{ width: "300px", margin: "20px auto" }}>
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={handleScan}
          onError={handleError}
          style={{ width: "100%" }}
        />
      </div>

      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default StudentScanner;