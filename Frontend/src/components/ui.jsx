import React from "react";
import "./ui.css"; // Add CSS styling for buttons and input fields

export function Button({ children, variant, ...props }) {
  return (
    <button className={`btn ${variant === "outline" ? "btn-outline" : "btn-primary"}`} {...props}>
      {children}
    </button>
  );
}

export function Input({ ...props }) {
  return <input className="input-field" {...props} />;
}
