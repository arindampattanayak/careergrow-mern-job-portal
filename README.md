# 💼 CareerGrow - MERN Job Portal App

**CareerGrow** is a comprehensive job portal built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It empowers both **job seekers** and **recruiters** with an intuitive and robust platform to interact, apply, post jobs, and even receive AI-based Job recommendations.

---

## 🚀 Features

- 🔐 **Secure Authentication**: JWT-based login/signup for candidates and recruiters, with passwords hashed using Bcrypt.
- 🔄 **Forgot Password**: Password reset functionality via email using **Nodemailer** and secure token generation using **Crypto**.
- 📋 **Job Listings**: View a wide variety of jobs dynamically pulled from MongoDB.
- 📤 **Job Posting**: Recruiters can register companies and post jobs with full control over listings.
- 🗃️ **Application Management**: Candidates can apply for jobs and track application status. Recruiters can review applications received.
- 🤝 **Real-time Messaging**: In-app messaging between candidates and recruiters using **Socket.io**.
- 🧠 **Skill-Based Job Recommendations**: Upload resumes and receive personalized job recommendations using **spaCy (Python NLP library)**.
- 🌈 **Modern UI**: Designed with **Tailwind CSS** and **shadcn/ui** components for a responsive and elegant interface.
- ☁️ **Image Upload**: Upload and manage profile images via **Cloudinary**.

---

## 🛠️ Tech Stack

| Layer         | Technologies                                                                           |
|---------------|----------------------------------------------------------------------------------------|
| **Frontend**  | React.js, React Router, Tailwind CSS, Shadcn UI                                       |
| **Backend**   | Node.js, Express.js, Socket.io, Nodemailer                          |
| **Database**  | MongoDB Atlas                                                                         |
| **AI Module** | Python, Flask, spaCy, PyMuPDF                                                          |
| **Auth**      | JWT, Bcrypt, Crypto                                                                    |
| **Cloud**     | Cloudinary (Image & PDF Storage)                                                             |

---

## 📁 Project Structure

```bash
careergrow-mern-job-portal/
├── backend/                # Node.js + Express backend APIs, MongoDB logic, and Python integration
│   ├── python_logic/       # Python-based skill extractor using spaCy, invoked via backend
│   └── .env                # Backend environment variables (not pushed to Git)
├── frontend/               # React frontend with Tailwind CSS + shadcn/ui
└── README.md
```
## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or above recommended)
- MongoDB Atlas account
- Python 3.8+ (for AI features)
- MongoDB account
- Cloudinary account
- Git (version control)


### Installation

### Step 1: Clone the repo:
   ```sh
   git clone https://github.com/arindampattanayak/careergrow-mern-job-portal.git
   cd careergrow-mern-job-portal
```
### Step 2: Install Node Dependencies(Backend):
Install Node Dependencies:
Backend dependencies
```sh
cd backend
npm install
```
Frontend dependencies
```sh
cd ../frontend
npm install
```
### Step 3: Set Up Environment Variables :
Create a .env file inside the /backend folder and add the following
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
### Step 4: Run the App :
Run Backend
```sh
cd backend
npm install
npm start
nodemon index.js
```
Run Frontend
```sh
cd ../frontend
npm install
npm start
npm run dev
```
### Step 5: Set Up Python Logic (Flask) :
a. Navigate to Python Logic
```sh
cd backend/python-logic
```
b. Create a Virtual Environment
```sh
python -m venv venv
```
c. Activate the Virtual Environment
Windows:
```sh
venv\Scripts\activate
```
Linux/macOS:
```sh
source venv/bin/activate
```
d. Install Required Libraries to run the Python Logic
```sh
pip install -r requirements.txt
```
If requirements.txt is not present, install them manually:
```sh
pip install flask flask-cors pymupdf spacy pymongo python-dotenv
python -m spacy download en_core_web_sm
```
e. Run the Flask App
```sh
python app.py
```











