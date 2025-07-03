import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

const Chat = ({ currentUserId, chatPartnerId }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const fileInputRef = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.emit('join', { userId: currentUserId });

    socket.on('receive-message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() && !file) return;

    let mediaUrl = null;
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('http://localhost:5000/upload', formData);
      mediaUrl = res.data.url;
      setFile(null);
      fileInputRef.current.value = '';
    }

    const msg = {
      from: currentUserId,
      to: chatPartnerId,
      message: message.trim(),
      media: mediaUrl,
    };

    socket.emit('send-message', msg);
    setMessages((prev) => [...prev, msg]);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white px-4 py-8 animate-fadeIn">
      <div className="max-w-3xl mx-auto bg-gray-900 border border-gray-700 rounded-2xl shadow-lg p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-purple-300">📨 Chat</h2>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto h-96 p-4 bg-gray-800 rounded-lg shadow-inner space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              ref={scrollRef}
              className={`max-w-sm p-3 rounded-lg ${
                msg.from === currentUserId
                  ? 'ml-auto bg-purple-600 text-white'
                  : 'mr-auto bg-gray-700 text-gray-200'
              }`}
            >
              {msg.message && <p className="whitespace-pre-line">{msg.message}</p>}
              {msg.media && (
                <a
                  href={`http://localhost:5000${msg.media}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-200 underline block mt-2"
                >
                  📎 View Attachment
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Write a message..."
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <input
            type="file"
            accept="image/*,application/pdf"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-2 text-sm text-gray-300 bg-gray-800 border border-gray-600 rounded-md file:bg-purple-600 file:text-white file:border-0 file:px-4 file:py-2"
          />

          <button
            onClick={sendMessage}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold transition duration-200"
          >
            Send
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Chat;
