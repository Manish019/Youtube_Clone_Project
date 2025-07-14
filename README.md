📺 YouTube Clone - MERN Stack Project
This is a full-stack YouTube Clone developed by Manish Aryan using the MERN Stack: MongoDB, Express.js, React.js, and Node.js. The project replicates core YouTube functionalities such as video uploading, viewing, user authentication, and interaction through likes and comments.

📌 Project Overview
This YouTube Clone allows users to:

Register and log in securely

Upload videos with titles, descriptions, and thumbnails

Browse and watch uploaded videos

Like/dislike videos

Comment on videos

Search for videos by title

🔧 Tech Stack
Frontend: React.js, React Router, Axios, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB with Mongoose ODM

Authentication: JWT (JSON Web Tokens)

🧩 Core Features
Feature	Description
👤 Authentication	Sign up, login, logout, with JWT-based token validation
🎥 Video Upload	Upload videos along with thumbnail, title, and description
🔎 Video Search	Search for videos using keywords in the title
❤️ Like/Dislike	Like or dislike videos to interact with content
💬 Comments	Add and view comments for each video
🏠 Home Page	View a list/grid of all uploaded videos
🔐 Protected Routes	Only authenticated users can upload, like, or comment


📁 Project Structure

Backend-Youtebe
├── client/           # React frontend
├── server/           # Node/Express backend
├── models/           # Mongoose schemas for MongoDB
├── routes/           # API endpoints
├── controllers/      # Business logic for each route
└── .env              # Environment variables (MongoDB URI, JWT secret)



1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/youtube-clone.git
2. Install dependencies
bash
Copy
Edit
cd server
npm install

cd ../client
npm install



4. Run the development servers
bash
Copy
Edit
# In server/
npm run dev

# In client/
npm start
👨‍💻 Author
Manish Aryan
Passionate full-stack developer skilled in building responsive and dynamic web applications using modern technologies.

