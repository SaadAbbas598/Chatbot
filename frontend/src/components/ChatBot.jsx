import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Sparkles, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from './ChatMessage';
import VoiceRecorder from './VoiceRecorder';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hey there! 👋 I'm your AI bestie! What's on your mind today? ✨",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = () => {
    const responses = [
      "That's so interesting! Tell me more about that! 🤔",
      "OMG yes! I totally get what you mean! ✨",
      "No cap, that sounds amazing! 🔥",
      "Slay! You're absolutely right about that! 💅",
      "That hits different, not gonna lie! 😎",
      "Period! You spilled facts right there! 💯",
      "I'm living for this energy right now! ⚡",
      "This is giving main character vibes! 👑",
      "Bestie, you're speaking my language! 💖",
      "That's bussin! Keep going! 🚀"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(text),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleVoiceInput = (transcript) => {
    if (transcript) {
      handleSendMessage(transcript);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-2 sm:p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-center mb-4 p-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bot className="w-8 h-8 text-white animate-pulse" />
            <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-bounce" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI Edumeup</h1>
          </div>
        </div>
      </div>

      {/* Messages Container */}
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
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Container */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message... or use voice! 🎙️"
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-xl pr-4 pl-4 py-3 focus:bg-white/30 transition-all duration-300"
              disabled={isLoading}
            />
          </div>

          <VoiceRecorder
            onVoiceInput={handleVoiceInput}
            isListening={isListening}
            setIsListening={setIsListening}
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
