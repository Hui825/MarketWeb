import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);

    // Simulate a bot response
    const botMessage = { text: 'Hello! How can I help you?', sender: 'bot' };
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="chatbot-container" style={{ display: isOpen ? 'flex' : 'none' }}>
      <div className="chatbot-header" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Chatbot' : 'Open Chatbot'}
      </div>
      <div className="chatbot-body">
        {messages.map((message, index) => (
          <div key={index} className={`chatbot-message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbot-footer">
        <input
          className="chatbot-input"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <button className="chatbot-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
