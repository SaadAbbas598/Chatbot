import React from 'react';
import { User, Bot } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`flex items-start gap-3 max-w-[80%] sm:max-w-[70%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          message.isUser 
            ? 'bg-gradient-to-r from-pink-500 to-purple-600' 
            : 'bg-gradient-to-r from-blue-500 to-cyan-400'
        }`}>
          {message.isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>

        {/* Message Bubble */}
        <div className="flex flex-col">
          <div className={`rounded-2xl px-4 py-3 backdrop-blur-sm border border-white/20 ${
            message.isUser
              ? 'bg-gradient-to-r from-pink-500/80 to-purple-600/80 text-white'
              : 'bg-white/20 text-white'
          } transition-all duration-300 hover:transform hover:scale-[1.02]`}>
            <p className="text-sm sm:text-base leading-relaxed break-words">
              {message.text}
            </p>
          </div>
          
          {/* Timestamp */}
          <div className={`text-xs text-white/60 mt-1 px-2 ${message.isUser ? 'text-right' : 'text-left'}`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;