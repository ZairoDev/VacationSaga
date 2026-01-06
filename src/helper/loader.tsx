"use client"; 
import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = "md",
  className = "" 
}) => {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const borderClasses = {
    sm: "border-2",
    md: "border-[3px]",
    lg: "border-4",
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div className="relative" style={{ width: sizeClasses[size], height: sizeClasses[size] }}>
        {/* Outer pulsing ring */}
        <div
          className="absolute inset-0 rounded-full bg-primary-6000/20 animate-ping"
          style={{ animationDuration: "1.5s" }}
        />
        
        {/* Outer rotating ring */}
        <div
          className={`absolute inset-0 ${borderClasses[size]} border-transparent border-t-primary-6000 border-r-primary-6000/60 rounded-full animate-spin`}
          style={{ animationDuration: "0.8s" }}
        />
        
        {/* Middle rotating ring (reverse) */}
        <div
          className={`absolute inset-1 ${size === "sm" ? "border" : size === "md" ? "border-2" : "border-[3px]"} border-transparent border-b-primary-6000/50 border-l-primary-6000/40 rounded-full animate-spin`}
          style={{ animationDuration: "1.2s", animationDirection: "reverse" }}
        />
        
        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`${size === "sm" ? "w-1.5 h-1.5" : size === "md" ? "w-2 h-2" : "w-3 h-3"} rounded-full bg-primary-6000 shadow-lg shadow-primary-6000/50 animate-pulse`}
            style={{ animationDuration: "1s" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
