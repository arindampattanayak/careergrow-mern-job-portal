# 💼 CareerGrow - MERN Job Portal App

**CareerGrow** is a comprehensive job portal web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It allows **recruiters** to register companies and post jobs, and enables **candidates** to browse job listings, apply, manage applications, chat with recruiters, and receive **AI-powered job recommendations** by uploading their resume.

---

## 🚀 Features

- 🔐 **User Authentication**  
  Secure login/signup using **JWT** for candidates and recruiters, with passwords hashed using **Bcrypt**.

- 🔑 **Forgot Password**  
  Password reset functionality using **Nodemailer** and **Crypto** to send secure reset links via email.

- 📋 **Job Listings**  
  Browse through a variety of job opportunities fetched from MongoDB.

- 🧾 **Application Management**  
  Candidates can apply and manage applications; recruiters can view and track applications.

- 🤝 **Real-Time Messaging**  
  In-app chat between candidates and recruiters using **Socket.io**.

- 🧠 **Skill-Based Recommendations**  
  Candidates can upload resumes and get job suggestions based on extracted skill keywords using **spaCy** (Python NLP).

- 🖼️ **Image Upload**  
  Integrated **Cloudinary** for uploading and managing profile images.

- 🎨 **Modern UI**  
  Designed using **Tailwind CSS** and **shadcn/ui** for a sleek and responsive experience.

---

## 🛠️ Tech Stack

| Layer         | Technologies                                                                 |
|---------------|-------------------------------------------------------------------------------|
| **Frontend**  | React.js, React Router, Tailwind CSS, shadcn/ui                              |
| **Backend**   | Node.js, Express.js, MongoDB Atlas, Socket.io, Nodemailer, Crypto            |
| **AI Module** | Python, Flask, spaCy, PyMuPDF, dotenv, pymongo                               |
| **Auth**      | JWT, Bcrypt                                                                  |
| **Storage**   | Cloudinary                                                                   |

---

## 📁 Project Structure

```bash
careergrow-mern-job-portal/
├── backend/             # Node.js + Express server
├── frontend/            # React.js frontend
├── nlp-flask-api/       # Python resume skill extraction service
└── README.md
