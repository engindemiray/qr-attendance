import React, { useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import "./App.css";

function StudentCheckIn() {
  const [studentName, setStudentName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Geçersiz QR");
    if (!studentName.trim() || !studentNumber.trim()) {
      return alert("Lütfen adınızı ve numaranızı girin!");
    }

    try {
      await axios.post("http://localhost:5050/student-checkin", {
        token,
        studentName,
        studentNumber,
      });
      alert("Yoklama kaydedildi ✅");
      setStudentName("");
      setStudentNumber("");
    } catch (err) {
      console.error("Yoklama alınamadı:", err);
      alert("Yoklama alınamadı ❌");
    }
  };

  return (
    <div className="app-container">
      <div className="container">
        <h1 className="page-title">Öğrenci Yoklama</h1>

        <div className="card">
          <form onSubmit={handleSubmit} className="form-wrapper">
            <input
              placeholder="Ad ve Soyad"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="input"
            />
            <input
              placeholder="Öğrenci Numarası"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              className="input"
            />
            <button type="submit" className="btn">
              Gönder
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default StudentCheckIn;