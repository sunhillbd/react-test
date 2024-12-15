import React from "react";

const SocialButton = ({ children, props }) => {
  return (
    <button
      {...props}
      className="shadow-[0px_0px_0px_1px_#122B6914,0px_1px_2px_0px_#122B6914,0px_2px_6px_0px_#122B690A] hover:shadow-[0px_0px_0px_1px_#122B6914,0px_2px_4px_0px_#122B6914,0px_3px_8px_0px_#122B690A] flex-1 py-[9px] px-[12px] rounded-[50px] flex gap-2 items-center justify-center bg-white text-black-primary"
    >
      {children}
    </button>
  );
};

export default SocialButton;
