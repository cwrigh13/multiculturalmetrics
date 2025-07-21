import React, { useState } from 'react';

const Tooltip = ({ 
  children, 
  title, 
  content, 
  detail = null, 
  position = "top",
  size = "md",
  delay = 200,
  backgroundColor = "bg-darkTeal",
  textColor = "text-white",
  borderColor = "border-lightBlueGreen"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTimeout, setShowTimeout] = useState(null);

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setShowTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (showTimeout) {
      clearTimeout(showTimeout);
    }
    setIsVisible(false);
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm": return "w-64 p-3";
      case "md": return "w-80 p-4";
      case "lg": return "w-96 p-5";
      case "xl": return "w-[28rem] p-6";
      default: return "w-80 p-4";
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case "top": return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      case "bottom": return "top-full left-1/2 transform -translate-x-1/2 mt-2";
      case "left": return "right-full top-1/2 transform -translate-y-1/2 mr-2";
      case "right": return "left-full top-1/2 transform -translate-y-1/2 ml-2";
      case "top-left": return "bottom-full right-0 mb-2";
      case "top-right": return "bottom-full left-0 mb-2";
      default: return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case "top": return "top-full left-1/2 transform -translate-x-1/2 border-t-4 border-l-4 border-r-4 border-b-0 border-transparent border-t-darkTeal";
      case "bottom": return "bottom-full left-1/2 transform -translate-x-1/2 border-b-4 border-l-4 border-r-4 border-t-0 border-transparent border-b-darkTeal";
      case "left": return "left-full top-1/2 transform -translate-y-1/2 border-l-4 border-t-4 border-b-4 border-r-0 border-transparent border-l-darkTeal";
      case "right": return "right-full top-1/2 transform -translate-y-1/2 border-r-4 border-t-4 border-b-4 border-l-0 border-transparent border-r-darkTeal";
      case "top-left": return "top-full right-4 border-t-4 border-l-4 border-r-4 border-b-0 border-transparent border-t-darkTeal";
      case "top-right": return "top-full left-4 border-t-4 border-l-4 border-r-4 border-b-0 border-transparent border-t-darkTeal";
      default: return "top-full left-1/2 transform -translate-x-1/2 border-t-4 border-l-4 border-r-4 border-b-0 border-transparent border-t-darkTeal";
    }
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {/* Tooltip Content */}
      {isVisible && (
        <div className={`absolute z-50 ${getPositionClasses()}`}>
          <div className={`${backgroundColor} ${textColor} rounded-lg shadow-xl border ${borderColor} ${getSizeClasses()} animate-fade-in`}>
            {/* Title */}
            {title && (
              <div className="text-sm font-semibold text-lightCyan mb-2 border-b border-lightBlueGreen border-opacity-30 pb-2">
                {title}
              </div>
            )}
            
            {/* Main Content */}
            <div className="text-xs leading-relaxed mb-3">
              {content}
            </div>
            
            {/* Detail Section */}
            {detail && (
              <div className="text-xs text-lightCyan bg-teal bg-opacity-50 p-3 rounded border-l-2 border-lightBlueGreen">
                <div className="font-medium mb-1">Current Status:</div>
                <div>{detail}</div>
              </div>
            )}
            
            {/* Enhanced Visual Elements */}
            <div className="absolute inset-0 bg-teal bg-opacity-5 rounded-lg pointer-events-none"></div>
          </div>
          
          {/* Arrow */}
          <div className={`absolute w-0 h-0 ${getArrowClasses()}`}></div>
        </div>
      )}
      
      {/* CSS for fade-in animation */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Specialized tooltip variants for common use cases
export const InfoTooltip = ({ children, ...props }) => (
  <Tooltip {...props}>
    <div className="inline-flex items-center cursor-help">
      {children}
      <svg className="w-4 h-4 ml-1 text-teal hover:text-darkTeal transition-colors" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    </div>
  </Tooltip>
);

export const HelpTooltip = ({ title, content, detail, size = "md" }) => (
  <Tooltip 
    title={title}
    content={content}
    detail={detail}
    size={size}
    position="top-right"
  >
    <div className="inline-flex items-center justify-center w-5 h-5 bg-lightBlueGreen bg-opacity-20 rounded-full cursor-help hover:bg-lightBlueGreen hover:bg-opacity-40 transition-colors">
      <svg className="w-3 h-3 text-lightBlueGreen" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    </div>
  </Tooltip>
);

export const RequirementTooltip = ({ requirement, explanation, currentStatus, size = "lg" }) => (
  <Tooltip 
    title={`SLNSW Requirement: ${requirement}`}
    content={explanation}
    detail={currentStatus}
    size={size}
    position="top"
    delay={150}
  >
    <div className="inline-flex items-center justify-center w-5 h-5 bg-yellow-100 rounded-full cursor-help hover:bg-yellow-200 transition-colors border border-yellow-300">
      <svg className="w-3 h-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    </div>
  </Tooltip>
);

export default Tooltip; 