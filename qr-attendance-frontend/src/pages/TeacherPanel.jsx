import React, { useState } from "react";
import API from "../api";

const TeacherPanel = () => {
  const [className, setClassName] = useState("");
  const [qrData, setQrData] = useState(null);

  const createSession = async () => {
    try {
      const res = await API.post("/session/create", { className });
      setQrData(res.data);
    } catch (err) {
      console.error(err);
      alert("QR oluşturulamadı!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>📚 Öğretmen Paneli</h2>
      <input
        type="text"
        placeholder="Ders adı"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      />
      <button onClick={createSession} style={{ marginLeft: 10 }}>
        QR Oluştur
      </button>

      {qrData && (
        <div style={{ marginTop: 30 }}>
          <h3>{className} yoklaması</h3>
          <img src={qrData.qrImage} alt="QR Code" />
          <p>Geçerlilik: {new Date(qrData.expiresAt).toLocaleTimeString()}</p>
          <p><b>Token:</b> {qrData.token}</p>
        </div>
      )}
    </div>
  );
};

export default TeacherPanel;