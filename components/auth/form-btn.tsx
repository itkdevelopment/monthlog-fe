"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
  onClick?: () => void; // onClick 속성
}

export default function FormButton({ text, onClick }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={onClick}
      className="primary-btn h-10 bg-primary-color text-white text-sm font-bold rounded-md items-center w-full max-w-96 disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed "
    >
      {pending ? "로딩 중..." : text}
    </button>
  );
}
