import React from 'react';

interface IconicMascotProps {
  isFloating?: boolean; // Controls if it's the corner mascot
  className?: string;   // For additional styling (e.g., size on welcome screen)
}

const IconicMascot: React.FC<IconicMascotProps> = ({ isFloating = false, className = '' }) => {
  const baseClasses = 'filter drop-shadow-lg';
  
  // Using Tailwind classes to replicate the old .cute-mascot style
  const floatingClasses = 'fixed bottom-2.5 right-2.5 sm:bottom-5 sm:right-5 text-3xl sm:text-5xl animate-float z-[100] pointer-events-none';
  
  if (isFloating) {
    return <div className={`${baseClasses} ${floatingClasses} ${className}`}>🦉</div>;
  }
  
  return <div className={`${baseClasses} ${className}`}>🦉</div>;
};

export default IconicMascot;
