import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ChatPage = () => {
  const { recruiterId } = useParams();
  const { user } = useSelector((state) => state.user); // Assuming you store logged-in user info in Redux
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/messages/getMessages`, {
        params: {
          senderId: user._id,
          receiverId: recruiterId,
        },
        withCredentials: true,
      });
      setMessages(response.data.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('senderId', user._id);
    formData.append('receiverId', recruiterId);
    formData.append('content', content);
    if (file) formData.append('media', file);

    try {
      await axios.post('http://localhost:8000/api/v1/messages/sendMessage', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setContent('');
      setFile(null);
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Chat with Recruiter</h2>
      <div className="h-96 overflow-y-auto border p-2 mb-4 rounded">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`mb-2 flex ${msg.senderId === user._id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-xs break-words ${
                msg.senderId === user._id ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {msg.content && <p>{msg.content}</p>}
              {msg.mediaUrl && (
                <a
                  href={`http://localhost:8000${msg.mediaUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-sm"
                >
                  View Attachment
                </a>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-grow border rounded p-2"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border rounded p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
