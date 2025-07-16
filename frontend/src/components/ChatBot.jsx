import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import ChatMessage from './ChatMessage';
import VoiceRecorder from './VoiceRecorder';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      text: "Hey there! 👋 Ask me anything — I'm your AI Bestie 🤖",
      isUser: false,
      timestamp: new Date()
    }
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
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('https://monkfish-app-mqs59.ondigitalocean.app/ask-question/11', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text.trim() })
      });

      const data = await res.json();

      const botMessage = {
        id: crypto.randomUUID(),
        text: data?.answer || "Hmm... I couldn't find an answer 🧐",
        isUser: false,
        timestamp: new Date()
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
          timestamp: new Date()
        }
      ]);
    }

    setIsLoading(false);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-2 sm:p-4 overflow-hidden">
      <div className="flex items-center justify-center mb-4 p-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bot className="w-8 h-8 text-white animate-pulse" />
            <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-bounce" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI Edume</h1>
            <p className="text-white/80 text-sm">Smart answers powered by Edumeup 🌐</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden bg-white/5 backdrop-blur-lg rounded-2xl border border-white/20 mb-4">
        <div className="h-full overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 max-w-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask me anything... "
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-xl pr-4 pl-4 py-3 focus:bg-white/30 transition-all duration-300"
            disabled={isLoading}
          />


          <Button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl px-6 py-3 text-white font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
