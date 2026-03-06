import type React from "react";
import { useState } from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "./types";

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
}: ButtonProps) => {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    onClick?.();
  };

  return (
    <div>
      <button
        className={`${styles.button} ${styles[variant]}`}
        onClick={handleClick}
      >
        {label}
      </button>
      {clickCount > 0 && (
        <p style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>
          Clicked {clickCount} time{clickCount !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
};

export default Button;
