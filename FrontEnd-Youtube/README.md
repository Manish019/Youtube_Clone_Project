# 🎥 YouTube Clone (MERN Stack)

A **full-stack YouTube-style video-sharing app** built with **React**, **Node.js**, **Express**, and **MongoDB**.

This project showcases a real-world clone of YouTube including features like **user authentication**, **video uploads**, **likes/dislikes static connect database**, **comments**, and a **fully responsive UI** — all inspired by the real YouTube experience.

---
## 🚀 github link  - https://github.com/self-raj/youTube-clone-fullstack.git

## 🚀 Features

- 🔐 **User Authentication** — Register, login, and JWT-based session handling
- 📺 **Channels** — Create and customize user channels
- ⬆️ **Video Uploads** — Upload videos with title, description, and thumbnail
- 🎞️ **Video Player** — Stream videos, see channel info, and interact
- 💬 **Comments** — Add, edit, and delete comments in real-time
- 📱 **Responsive UI** — Mobile-first layout styled like YouTube
- 🧭 **Sidebar & Header** — Collapsible sidebar, search bar, and profile menu
- 🎯 **Recommended Videos** — “Up next” sidebar (currently static)
- 🚫 **404 Page** — Custom YouTube-style error page
- 💤 **Lazy Loading** — Components load on demand for speed
- 🔄 **Custom Loader** — YouTube-like loading animation using **React Toastify**
- 🕒 **Upload Date** — Formatted using `dayjs`

---

## 🛠 Tech Stack

| Layer     | Tech Used                                      |
|-----------|------------------------------------------------|
| **Frontend** | React 19, React Router v7, Axios, Vite           |
| **Backend**  | Node.js, Express 5, MongoDB, Mongoose           |
| **Auth**     | JWT (JSON Web Token), bcrypt                    |
| **Styling**  | Tailwind CSS, Custom CSS (no UI library)        |

---

## 🧩 Folder Structure (Frontend)


---

## ⚙️ Setup Instructions

### 1. 📦 Clone the Repository

```bash
git clone https://github.com/self-raj/youTube-clone-fullstack.git
cd frontend-youtube
2. 🔧 Install Dependencies
bash
Copy
Edit
npm install
3. ▶️ Run the Frontend (Vite)
bash
Copy
Edit
npm run dev
📌 Notes
Make sure the backend server is running on http://localhost:8080

Create a .env file if needed for frontend configs

Thumbnail and video files are uploaded using FormData



💬 Connect
Made with ❤️ by Raj

Let me know if you want a backend README.md, or want this file auto-generated inside your frontend folder.

yaml
Copy
Edit

---

### ✅ Bonus Tip:
- Place this as `frontend-youtube/README.md`
- GitHub will show this beautifully when visiting the frontend folder repo

Want me to generate a backend version too?

YouTube Clone (MERN Stack)
A full-stack YouTube-style video-sharing app built with React, Node.js, Express, and MongoDB.
This project demonstrates user authentication, channel creation, video uploads, like/dislike connet data base , comments, and a responsive UI — all styled to resemble the YouTube experience.






Tech Stack
Layer	Tech Used
Frontend	React 19, React Router v7, Axios, Vite
Backend	Node.js, Express 5, MongoDB, Mongoose
Auth	JWT, bcrypt
Styling	Tailwind and Custom CSS (No frameworks)


1. Clone the Repository
git clone https://github.com/self-raj/youTube-clone-fullstack.git


frontend-youtube/
├── public/
│   ├── vite.svg
│   └── youTube-logo.jpg          # Favicon or logo image
│
├── src/
│   ├── assets/                   # Static assets (images, icons, etc.)
│   ├── Component/                # All your reusable UI components and pages
│   │   ├── BannerEdit.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MainContent.jsx
│   │   ├── Navbar.jsx
│   │   ├── PageNotFound.jsx
│   │   ├── Profile.jsx
│   │   ├── SearchResults.jsx
│   │   ├── SidebarContext.jsx
│   │   ├── SideNavbar.jsx
│   │   ├── SignUp.jsx
│   │   ├── Video.jsx
│   │   └── VideoUpload.jsx
│   │
│   ├── style/                    # CSS files (Tailwind or global styles)
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── App.jsx                   # Main App component
│   ├── main.jsx                  # Entry point (ReactDOM rendering)
│
├── .gitignore
├── index.html                   # Root HTML file for Vite
├── package.json
├── package-lock.json
├── tailwind.config.js           # Tailwind CSS config
├── vite.config.js               # Vite configuration
└── README.md
