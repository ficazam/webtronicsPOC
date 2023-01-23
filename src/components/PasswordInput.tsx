import React from "react";
import { AiOutlineKey } from "react-icons/ai";

interface iPassInputProps {
  pass: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput = ({ onChange, pass }: iPassInputProps) => {
  return (
    <div className="border-b border-gray-500 flex items-center">
      <AiOutlineKey />
      <label className="px-2">Password: </label>
      <input
        required
        type="password"
        name={pass}
        onChange={onChange}
        className="focus:outline-none"
      />
    </div>
  );
};
