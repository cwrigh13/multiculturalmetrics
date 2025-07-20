import React from 'react';

const ErrorIcon = ({ className = "w-4 h-4", color = "currentColor" }) => {
  return (
    <svg 
      className={className}
      fill="none" 
      stroke={color} 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" 
      />
    </svg>
  );
};

export default ErrorIcon; 