import React, { useState, useEffect } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import Footer from "./Footer";
import "./App.css";

function App() {
  const [className, setClassName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [token, setToken] = useState("");
  const [classId, setClassId] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);

  const generateQR = async () => {
    if (!className.trim() || !teacherName.trim()) {
      alert("Lütfen ders adı ve öğretmen adını girin!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5050/generate-qr", {
        className,
        teacherName,
      });
      setToken(res.data.token);
      setClassId(res.data.classId);
    } catch (err) {
      console.error("QR oluşturulamadı:", err);
      alert("QR oluşturulamadı ❌");
    }
  };

  useEffect(() => {
    if (!classId) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `http://localhost:5050/attendance/${classId}`
        );
        setAttendanceList(res.data);
      } catch (err) {
        console.error("Otomatik yoklama güncellenemedi:", err);
      }
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, [classId]);

  return (
    <div className="app-container">
      <div className="container">
        <h1 className="page-title">Öğretmen Paneli</h1>

        <div className="card">
          <input
            placeholder="Ders Adı"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="input"
          />
          <input
            placeholder="Öğretmen Adı"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            className="input"
          />
          <button onClick={generateQR} className="btn">
            QR Oluştur
          </button>
        </div>

        {token && (
          <div className="card qr-card">
            {/* <p><strong>Token:</strong> {token}</p> */}
            <QRCodeCanvas
              value={`http://localhost:3000/student?token=${token}`}
              size={200}
            />
          </div>
        )}

        {attendanceList.length > 0 && (
          <div className="card attendance-list">
            <h2>Yoklama Listesi</h2>
            <ol>
              {attendanceList.map((att, index) => (
                <li key={att._id}>
                  {} {att.studentName} - {att.studentNumber}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;