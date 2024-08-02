import { InputHTMLAttributes } from "react";

const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`${className} rounded-md border py-2 px-3 w-full disabled:bg-gray-100`} />
);

export default Input;
