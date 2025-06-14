# Creator AI Insights

Creator AI Insights is a full-stack application that helps users generate AI-powered content ideas for social media reels based on specific topics and niches. It features user authentication, content generation using the Cohere API, and a modern React-based frontend.

Live Link: https://wizarding-media-eight.vercel.app/
Loom Video : https://www.loom.com/share/84888a587a6e4141bba72f6d091937e4

## 📂 Project Structure
- `/client` — Frontend (React + Vite + Tailwind CSS)
- `/server` — Backend (Express.js + MongoDB + JWT Authentication)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas (or local MongoDB)
- Cohere API Key

---

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/creator-ai-insights.git
cd creator-ai-insights
```

2. Install Dependencies

 For Server:
```bash
cd server
npm install
```

 For Client:
```bash
cd client
npm install
```

⚙️ Environment Variables

 - Server .env Example:
```env
PORT=4000
JWT_SECRET=your_secret_key
MONGO_URI=your_mongodb_uri
CO_API_KEY=your_cohere_api_key
```

💻 Running the Application

- Start Server:
```bash
cd server
npm run dev
```
- Start Client:
```bash
cd client
npm run dev
```

📚 Folder Structure

```bash
creator-ai-insights
│
├── client        # React Frontend
│
├── server        # Express Backend
│
└── README.md
```

🛠️ Tech Stack
- Frontend: React, Vite, Tailwind CSS

- Backend: Node.js, Express.js, MongoDB, JWT

- AI API: Cohere API

✅ Features

- User Authentication (JWT)

- AI-Powered Content Generation (Cohere API)

- Protected Routes

- Modern UI with Tailwind CSS




