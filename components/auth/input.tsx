import { InputHTMLAttributes } from "react";

interface InputProps {
  errors?: string[];
  name: string;
}

export default function Input({
  errors = [],
  name,
  ...props
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col items-center gap-2">
      <input
        name={name}
        className="bg-white rounded-md h-10 p-3  focus:outline-hidden ring-2 focus:ring-3 transition ring-neutral-200 focus:ring-primary-color border-none placeholder:text-neutral-400"
        {...props}
      />
      {errors.map((error, index) => (
        <span
          key={index}
          className="text-red-500 text-start text-[13px] w-full max-w-96 font-medium"
        >
          {error}
        </span>
      ))}
    </div>
  );
}
