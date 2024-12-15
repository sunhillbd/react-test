import React from "react";

const Wrapper = ({ children, className = "" }) => {
  return (
    <div
      className={`
    w-full max-w-[1440px] mx-auto px-4   lg:px-8 
    ${className}`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
