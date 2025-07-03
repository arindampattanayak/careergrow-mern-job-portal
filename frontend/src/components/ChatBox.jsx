import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const ChatBox = () => {
  const { jobId, recruiterId, applicantId } = useParams();
  const loggedInUserId = localStorage.getItem("userId");
  const isRecruiter = loggedInUserId === recruiterId;

  const senderId = loggedInUserId;
  const receiverId = isRecruiter ? applicantId : recruiterId;

  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchJobAndUser = async () => {
      try {
        if (jobId) {
          const jobRes = await axios.get(`${API_URL}/api/v1/job/get/${jobId}`, {
            withCredentials: true,
          });
          setJobDetails(jobRes.data.job);
        }

        const userIdToFetch = isRecruiter ? applicantId : recruiterId;
        if (userIdToFetch) {
          const userRes = await axios.get(`${API_URL}/api/v1/user/${userIdToFetch}`, {
            withCredentials: true,
          });
          setUserDetails(userRes.data.user);
        }
      } catch (err) {
        console.error("Failed to fetch job/user details:", err);
      }
    };

    fetchJobAndUser();
  }, [jobId, applicantId, recruiterId]);

  useEffect(() => {
    if (!senderId || !receiverId || !jobId) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/messages/getMessages`, {
          params: { senderId, receiverId, jobId },
        });
        setMessages(res.data.data);
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    };

    fetchMessages();
  }, [senderId, receiverId, jobId]);

  const sendMessage = async () => {
    if (!content && !media) return;

    const formData = new FormData();
    formData.append("senderId", senderId);
    formData.append("receiverId", receiverId);
    formData.append("jobId", jobId);
    if (content) formData.append("content", content);
    if (media) formData.append("media", media);

    try {
      const res = await axios.post(`${API_URL}/api/v1/messages/sendMessage`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessages((prev) => [...prev, res.data.data]);
      setContent("");
      setMedia(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#e0f7f1] via-[#e6f3ff] to-[#f3f8fa] text-slate-800 px-4 sm:px-8 py-6 animate-fadeIn">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6">
        <h2 className="text-2xl font-bold text-sky-600">
           Chat for:{" "}
          <span className="text-slate-800 font-semibold">
            {jobDetails?.title || "Loading..."}
          </span>
        </h2>
        {userDetails && (
          <p className="text-sm text-slate-600 mt-1">
            Talking to: <span className="text-emerald-600 font-medium">{userDetails.fullname}</span>
          </p>
        )}
      </div>

      {/* Chat Messages */}
      <div className="max-w-5xl mx-auto h-[60vh] overflow-y-auto border border-slate-300 bg-white rounded-xl p-4 space-y-4 shadow">
        {messages.map((msg) => {
          const isSender = msg.senderId?.toString() === senderId;
          const bubbleColor = isSender
            ? "bg-emerald-100 text-emerald-900"
            : "bg-sky-100 text-sky-900";

          return (
            <div
              key={msg._id}
              className={`w-full flex ${isSender ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div className={`max-w-[75%] px-4 py-3 rounded-2xl ${bubbleColor} shadow-md`}>
                {msg.content && <p className="whitespace-pre-wrap">{msg.content}</p>}
                {msg.mediaUrl && (
                  <a
                    href={`${API_URL}${msg.mediaUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block mt-2 text-sm text-blue-500 underline"
                  >
                    📎 View Attachment
                  </a>
                )}
                <p className="text-xs text-right text-slate-500 mt-2">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      <div className="max-w-5xl mx-auto mt-6 flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Type your message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 p-3 rounded-md bg-white text-slate-800 border border-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <input
          type="file"
          onChange={(e) => setMedia(e.target.files[0])}
          ref={fileInputRef}
          className="text-sm w-full sm:w-48 bg-white text-slate-800 border border-slate-300 rounded-md file:bg-sky-500 file:text-white file:border-0 file:px-4 file:py-2 hover:file:bg-sky-600"
        />

        <button
          onClick={sendMessage}
          disabled={!content && !media}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-md font-medium transition duration-200 disabled:bg-slate-400"
        >
          Send
        </button>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fade-in 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ChatBox;
