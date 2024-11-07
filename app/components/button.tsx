// Button.tsx

import React from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  isSuccess: boolean; // isSuccess를 prop으로 받도록 정의
}

const Button: React.FC<ButtonProps> = ({ isSuccess }) => {
  const { pending } = useFormStatus(); // pending 상태를 가져옵니다.

  return (
    <button
      className={`w-full py-2 rounded-full text-center 
      ${
        pending
          ? "bg-neutral-400"
          : isSuccess
          ? "bg-yellow-400"
          : "bg-green-500"
      }
                 disabled:cursor-not-allowed active:scale-95`}
      disabled={pending || isSuccess}
      type="submit"
    >
      {pending ? "Loading..." : isSuccess ? "Welcome!🔥" : "Login"}{" "}
    </button>
  );
};

export default Button;
