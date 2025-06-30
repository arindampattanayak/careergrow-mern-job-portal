import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz  # PyMuPDF
import spacy
import pymongo

load_dotenv()

app = Flask(__name__)
CORS(app)

nlp = spacy.load("en_core_web_sm")

# ✅ MongoDB connection
client = pymongo.MongoClient(os.getenv("MONGO_URI2"))
db = client.get_default_database()
jobs_collection = db["jobs"]

# ✅ Extract text from uploaded PDF
def extract_text_from_pdf(pdf_file):
    doc = fitz.open(stream=pdf_file.read(), filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text

# ✅ Tokenize and clean the resume text
def extract_tokens(text):
    doc = nlp(text)
    return [token.text.lower() for token in doc if not token.is_stop and not token.is_punct]

# ✅ Get all unique skills/requirements from job posts
def get_master_skills_from_db():
    job_docs = jobs_collection.find({}, {"requirements": 1})
    master_skills = set()
    for job in job_docs:
        for skill in job.get("requirements", []):
            master_skills.add(skill.lower())
    return master_skills

# ✅ Match extracted skills with job requirements
def match_jobs(extracted_skills):
    matched_jobs = []
    for job in jobs_collection.find():
        job_skills = set(skill.lower() for skill in job.get("requirements", []))
        intersection = job_skills & set(extracted_skills)
        union = job_skills | set(extracted_skills)
        match_score = len(intersection) / len(union) if union else 0
        skill_gap = list(job_skills - set(extracted_skills))
        if match_score > 0:
            job["_id"] = str(job["_id"])
            job["match_score"] = round(match_score, 2)
            job["missing_skills"] = skill_gap
            job["matched_skills"] = list(intersection)
            matched_jobs.append(job)
    matched_jobs.sort(key=lambda j: j["match_score"], reverse=True)
    return matched_jobs[:5]

# ✅ Resume upload endpoint
@app.route("/upload", methods=["POST"])
def upload_resume():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    text = extract_text_from_pdf(file)
    raw_tokens = extract_tokens(text)

    master_skills = get_master_skills_from_db()
    filtered_skills = sorted(set(token for token in raw_tokens if token in master_skills))

    recommended_jobs = match_jobs(filtered_skills)

    return jsonify({
        "extracted_skills": filtered_skills,
        "recommended_jobs": recommended_jobs
    })

# ✅ Run Flask server
if __name__ == "__main__":
    app.run(port=5002, debug=True)
