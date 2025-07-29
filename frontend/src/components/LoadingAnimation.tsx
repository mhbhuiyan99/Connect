"use client";

import React from "react";
import "./loader.css";

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="loader">
        <div className="square square1" />
        <div className="square square2" />
        <div className="square square3" />
        <div className="square square4" />
      </div>
    </div>
  );
};

export default LoadingAnimation;
