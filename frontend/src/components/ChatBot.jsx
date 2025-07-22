import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import ChatMessage from './ChatMessage';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      text: "Hey there! 👋 Ask me anything — I'm your AI Bestie 🤖",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: crypto.randomUUID(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('https://monkfish-app-mqs59.ondigitalocean.app/ask-question/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text.trim() }),
      });

      const data = await res.json();

      const botMessage = {
        id: crypto.randomUUID(),
        text: data?.answer || "Hmm... I couldn't find an answer 🧐",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error communicating with chatbot:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: "Oops! Something went wrong 🥲",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }

    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6 text-blue-400 animate-pulse" />
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Easyway</h1>
            <p className="text-sm text-gray-400">Powered by AI</p>
          </div>
        </div>
        <Sparkles className="w-5 h-5 text-yellow-400 animate-spin-slow" />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700/50 rounded-lg p-3 max-w-md">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-900/80 backdrop-blur-md border-t border-gray-700">
        <form onSubmit={handleSubmit} className="flex items-center gap-3 max-w-3xl mx-auto">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:bg-gray-800 transition-all duration-200"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 transition-all duration-200 disabled:bg-blue-600/50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send className="w-5 h-5 text-black fill-black" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;