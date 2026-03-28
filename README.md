<p align="center">
  <img width="200" height="200" alt="qr_icon" src="logo.png" />
</p>

<h1 align="center">QR Attendance</h1>

<p align="center">
  <em>Tracks class attendance via QR code scans.</em>
</p>

<p align="center">
  <a href="https://tr.react.dev/versions"><img src="https://img.shields.io/badge/v19.2.0-blue?-square&logo=react&logoColor=white&label=React"></a>
  <a href="https://www.npmjs.com/package/qrcode.react"><img src="https://img.shields.io/npm/v/qrcode.react?color=6366f1&label=npm" alt="npm"></a>
  <a href="#license"><img src="https://img.shields.io/badge/license-MIT-yellow" alt="license"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-v23.11.0-brightgreen" alt="node"></a>
  <a href="https://mongoosejs.com/docs/index.html"><img src="https://img.shields.io/badge/v8.19.1-green?-square&logo=mongoose&logoColor=white&label=Mongoose"></a>
</p>

<p align="center">
  <img width="2048" height="1292" alt="screenshot" src="screenshot.png" />
</p>

---

## Tech Stack

| Layer           | Technology                                                            |
| --------------- | --------------------------------------------------------------------- |
| Frontend        | React                                                                 |
| Backend         | Node.js, Express.js                                                   |
| Package Manager | npm                                                                   |
| Database        | MongoDB, Mongoose                                                     |

## Installation (Local Development)

Clone the repository:
``` bash
$ git clone https://github.com/engindemiray/qr-attendance.git
```

### Backend

Install npm packages:
``` bash
$ cd qr-attendance-backend
npm install
```

Create a `.env` file and add the MongoDB URI and port number:
``` env
PORT=5050
MONGO_URI=mongodb://localhost:27017/qr-attendance
```

Run the backend:
``` bash
$ node server.js
```

### Frontend

Install npm packages:
``` bash
$ cd qr-attendance-frontend
npm install
```
Run the app:
``` bash
$ npm start
```

The app runs on http://localhost:3000

## Project Structure

```
qr-attendance/
├── qr-attendance-backend/
│   ├── models/                      # Database models (MongoDB schemas)
│   │   ├── Attendance.js            # Defines attendance data structure
│   │   └── Session.js               # Defines session (class/lecture) structure
│   ├── node_modules/                # Backend dependencies
│   ├── routes/                      # API route definitions
│   │   ├── attendanceRoutes.js      # Handles attendance-related API endpoints
│   │   └── sessionRoutes.js         # Handles session-related API endpoints
│   ├── .env                         # Environment variables (PORT, MONGO_URI, etc.)
│   ├── package-lock.json            # Locked versions of dependencies
│   ├── package.json                 # Backend project configuration and dependencies
│   └── server.js                    # Main Express server setup and entry point
├── qr-attendance-frontend/
│   ├── node_modules/                # Frontend dependencies
│   ├── public/                      # Static assets (HTML, icons, etc.)
│   ├── src/                         # Source code of the React application
│   │   ├── pages/                   # Application pages
│   │   │   ├── StudentScanner.jsx   # QR scanning interface for students
│   │   │   └── TeacherPanel.jsx     # Teacher dashboard for attendance management
│   │   ├── api.js                   # Handles API requests to backend
│   │   ├── App.css                  # Main application styles
│   │   ├── App.js                   # Root React component
│   │   ├── App.test.js              # Test file for App component
│   │   ├── Footer.css               # Footer component styles
│   │   ├── Footer.js                # Footer component
│   │   ├── index.css                # Global styles
│   │   ├── index.js                 # React application entry point
│   │   ├── logo.svg                 # Logo asset
│   │   ├── reportWebVitals.js       # Performance measuring utility
│   │   ├── setupTests.js            # Test configuration
│   │   └── StudentCheckIn.js        # Handles student check-in logic
│   ├── .gitignore                   # Files to ignore in frontend
│   ├── package-lock.json            # Locked dependency versions
│   └── package.json                 # Frontend project configuration
└── .gitignore                       # Root-level ignored files
```

## License

This project is licensed under the MIT License.

---

<div align="center">
  <sub>Special thanks to <a href="https://github.com/handedalcali">Hande Nur Dalcalı</a>&nbsp;❤️</sub>
</div>
