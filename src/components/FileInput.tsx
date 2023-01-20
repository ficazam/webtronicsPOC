import React from "react";
import { AiOutlineFileAdd } from "react-icons/ai";

interface iFileInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileInput = ({ onChange }: iFileInputProps) => {
  return (
    <div className="border-b border-gray-500 flex items-center">
      <AiOutlineFileAdd />
      <label className="px-2">Your Files: </label>
      <input
        required
        type="file"
        onChange={onChange}
        className="focus:outline-none"
      />
    </div>
  );
};
