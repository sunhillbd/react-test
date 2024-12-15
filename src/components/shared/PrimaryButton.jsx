import React from "react";

const PrimaryButton = ({ children, className, props }) => {
  return (
    <button
      {...props}
      className={`rounded-full outline-none  text-white bg-primary p-4 text-center transition-colors hover:bg-primary/80  ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
