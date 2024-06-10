import React, { PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
  isLoading?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

function Button({ children, isLoading = false, type = "button" }: ButtonProps) {
  return (
    <button
      className={`btn btn-primary btn-block text-white ${
        isLoading ? "btn-disabled" : ""
      }`}
      type={type}
    >
      {isLoading && <span className="loading" />}
      {children}
    </button>
  );
}

export default Button;
