# 🏆 Leaderboard App

A full-stack web application that allows users to claim random points, track rankings in real-time, and maintain claim history. Built with **Node.js**, **Express**, **MongoDB**, and **React.js**.

---

## 🚀 Features

### ✅ Core Functionality

- 🔘 **User Selection**: Choose a user from a dropdown or list.
- ➕ **Add New User**: Add new users from the frontend UI.
- 🎯 **Claim Random Points**: Award random points (1–10) to selected user.
- 📊 **Dynamic Leaderboard**: Real-time ranking based on total points.
- 🕒 **Claim History**: Stores all point-claim actions with timestamps.

---

## 🗃️ Tech Stack

### 🧠 Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### 🎨 Frontend

- React.js (Vite)
- Axios (for API calls)
- Tailwind CSS (for styling)
---


---

## 🌐 API Documentation

Base URL: `http://localhost:<PORT>/api/users`

---

### 1. `GET /get-all-users`

**Description**: Fetches all registered users.

**Response**:
```json
[
  {
    "_id": "userId",
    "fullName": "Rahul",
    "totalPoints": 12
  },
  ...
]
