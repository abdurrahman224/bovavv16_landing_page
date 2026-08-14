import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-container">
        {/* Animated Logo/Icon */}
        <div className="loading-logo">
          <div className="loading-circle"></div>
          <div className="loading-circle-outer"></div>
        </div>

        {/* Loading Text */}
        <div className="loading-text-wrapper">
          <h2 className="loading-title">Loading Your Experience</h2>
          <div className="loading-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>

        {/* Decorative Elements */}
        <div className="loading-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
