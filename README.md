# 💼 CareerGrow - MERN Job Portal App

**CareerGrow** is a comprehensive job portal built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It empowers both **job seekers** and **recruiters** with an intuitive and robust platform to interact, apply, post jobs, and even receive AI-based recommendations.

---

## 🚀 Features

- 🔐 **Secure Authentication**: JWT-based login/signup for candidates and recruiters, with passwords hashed using Bcrypt.
- 🔄 **Forgot Password**: Password reset functionality via email using **Nodemailer** and secure token generation using **Crypto**.
- 📋 **Job Listings**: View a wide variety of jobs dynamically pulled from MongoDB.
- 📤 **Job Posting**: Recruiters can register companies and post jobs with full control over listings.
- 🗃️ **Application Management**: Candidates can apply for jobs and track application status. Recruiters can review applications received.
- 🤝 **Real-time Messaging**: In-app messaging between candidates and recruiters using **Socket.io**.
- 🧠 **Skill-Based Job Recommendations**: Upload resumes and receive personalized job recommendations using **spaCy (Python NLP)**.
- 🌈 **Modern UI**: Designed with **Tailwind CSS** and **shadcn/ui** components for a responsive and elegant interface.
- ☁️ **Image Upload**: Upload and manage profile images via **Cloudinary**.

---

## 🛠️ Tech Stack

| Layer        | Technologies                                                                 |
|--------------|------------------------------------------------------------------------------|
| **Frontend** | React.js, React Router, Tailwind CSS, Shadcn UI                              |
| **Backend**  | Node.js, Express.js, MongoDB Atlas, Socket.io, Nodemailer, Crypto            |
| **AI Module**| Python, Flask, spaCy, PyMuPDF, MongoDB                                       |
| **Auth**     | JWT, Bcrypt                                                                  |
| **Cloud**    | Cloudinary (Image Storage)                                                   |

---

## 📁 Project Structure

```bash
careergrow-mern-job-portal/
├── backend/
├── frontend/
├── nlp-flask-api/        # Python-based skill extractor
├── .env                  # Environment variables (not pushed)
└── README.md
---
## ⚙️ Getting Started

Follow these steps to set up the project locally:

---

### ✅ Prerequisites

- Node.js (v18 or above recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Python 3.8+
- Cloudinary account
- SMTP credentials (for password reset email)
- Postman (optional, for API testing)

---

### 🔧 Installation

#### **Step 1: Clone the Repository**

```bash
git clone https://github.com/arindampattanayak/careergrow-mern-job-portal.git
cd careergrow-mern-job-portal
