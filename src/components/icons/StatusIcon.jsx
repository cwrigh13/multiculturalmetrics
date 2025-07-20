import React from 'react';
import TickIcon from './TickIcon';
import WarningIcon from './WarningIcon';
import ErrorIcon from './ErrorIcon';
import QuestionIcon from './QuestionIcon';

const StatusIcon = ({ status, className = "w-4 h-4" }) => {
  const getStatusIcon = () => {
    switch (status) {
      case "On Track":
      case "Successful":
      case "Achieved":
        return <TickIcon className={`${className} text-lightBlueGreen`} />;
      case "Needs Attention":
      case "Warning":
        return <WarningIcon className={`${className} text-yellow-600`} />;
      case "Off Track":
      case "Error":
      case "Failed":
        return <ErrorIcon className={`${className} text-red-600`} />;
      case "Unknown":
      case "Unclear":
      case "Pending":
        return <QuestionIcon className={`${className} text-gray-500`} />;
      default:
        return <QuestionIcon className={`${className} text-gray-500`} />;
    }
  };

  return getStatusIcon();
};

export default StatusIcon; 