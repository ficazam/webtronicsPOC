import React from "react";
import { AiOutlineFileText } from "react-icons/ai";

interface iTextInputProps {
  fileName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = ({ onChange, fileName }: iTextInputProps) => {
  return (
    <div className="border-b border-gray-500 flex items-center">
      <AiOutlineFileText />
      <label className="px-2">File Name: </label>
      <input
        required
        type="text"
        name={fileName}
        onChange={onChange}
        className="focus:outline-none"
      />
    </div>
  );
};
