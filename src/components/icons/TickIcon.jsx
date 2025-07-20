import React from 'react';

const TickIcon = ({ className = "w-4 h-4", color = "currentColor" }) => {
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
        strokeWidth={2.5} 
        d="M5 13l4 4L19 7" 
      />
    </svg>
  );
};

export default TickIcon; 