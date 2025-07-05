# Job Portal App with MERN Stack

A comprehensive job portal application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack with AI-powered features for enhanced job matching.



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











