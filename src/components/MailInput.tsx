import React from "react";
import { AiOutlineMail } from "react-icons/ai";

interface iMailInputProps {
  mail: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MailInput = ({ onChange, mail }: iMailInputProps) => {
  return (
    <div className="py-5">
      <div className="border-b border-gray-500 flex items-center">
        <AiOutlineMail />
        <label className="px-2">Email: </label>
        <input
          required
          type="email"
          name={mail}
          onChange={onChange}
          className="focus:outline-none"
        />
      </div>
    </div>
  );
};
