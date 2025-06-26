import React from 'react';

export const Button = ({ children, className = '', type = 'button', ...props }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
