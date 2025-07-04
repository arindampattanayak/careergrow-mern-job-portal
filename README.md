# Job Portal App with MERN Stack

A comprehensive job portal application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack with AI-powered features for enhanced job matching.

![App Screenshot](https://via.placeholder.com/1200x600?text=Job+Portal+Dashboard)

## ✨ Features

### For Job Seekers
- 🔍 Advanced job search and filtering
- 📄 Resume upload with AI-powered analysis
- 📊 Application tracking dashboard
- 💬 Real-time chat with employers

### For Employers
- ➕ Job posting and management
- 👥 Applicant tracking system
- 🧠 AI-powered candidate matching
- 📈 Analytics dashboard

## 🛠️ Technologies Used

| Component       | Technologies                  |
|----------------|-------------------------------|
| **Frontend**   | React.js, Tailwind CSS, Redux |
| **Backend**    | Node.js, Express.js, MongoDB  |
| **AI Engine**  | Python, Flask, spaCy          |
| **Real-Time**  | Socket.io                     |
| **Storage**    | Cloudinary, MongoDB Atlas     |
| **Auth**       | JWT, Bcrypt                   |

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or above recommended)
- MongoDB Atlas account
- Python 3.8+ (for AI features)
- Cloudinary account
- Git (version control)

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/arindampattanayak/careergrow-mern-job-portal.git
   cd careergrow-mern-job-portal

2. Install Node Dependencies(Backend):
### Backend dependencies**
```sh
cd backend
npm install
```
3. Install Node Dependencies(Frontend):
###Frontend dependencies:**
```sh
cd ../frontend
npm install
```
4. Set Up Environment Variables :
###Create a .env file inside the /backend folder and add the following:**
```sh
MONGO_URI=your_mongodb_connection_string
PORT=8000
SECRET_KEY=your_jwt_secret_key

CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

SMTP_USER=your_smtp_email
SMTP_PASS=your_smtp_password

FRONTEND_URL=http://localhost:5173
```
5.Run the App :
###Run Backend**
```sh
cd backend
nodemon index.js
```
###Run Frontend**
```sh
cd frontend
npm run dev
```








