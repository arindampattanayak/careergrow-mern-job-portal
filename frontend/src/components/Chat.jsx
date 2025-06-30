import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

const Chat = ({ currentUserId, chatPartnerId }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const fileInputRef = useRef();

  useEffect(() => {
    socket.emit('join', { userId: currentUserId });

    socket.on('receive-message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = async () => {
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
      message,
      media: mediaUrl,
    };

    socket.emit('send-message', msg);
    setMessages((prev) => [...prev, msg]);
    setMessage('');
  };

  return (
    <div className="p-4 border rounded max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Chat</h2>
      <div className="h-64 overflow-y-scroll border p-2 mb-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.from === currentUserId ? 'text-right' : 'text-left'}`}>
            {msg.message && <p>{msg.message}</p>}
            {msg.media && (
              <a href={`http://localhost:5000${msg.media}`} target="_blank" rel="noreferrer">
                📎 Media
              </a>
            )}
          </div>
        ))}
      </div>
      <input
        type="text"
        className="w-full border p-2 mb-2"
        placeholder="Write a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        ref={fileInputRef}
        className="mb-2"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default Chat;
