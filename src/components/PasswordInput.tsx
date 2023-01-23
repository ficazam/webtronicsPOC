import React, { useState } from "react";
import {
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

interface iPassInputProps {
  pass: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput = ({ onChange, pass }: iPassInputProps) => {
  const [seePass, setSeePass] = useState<boolean>(true);
  return (
    <div className="py-5">
      <div className="border-b border-gray-500 flex items-center">
        <AiOutlineLock />
        <label className="px-2">Password: </label>
        <input
          required
          type={seePass ? "password" : "string"}
          name={pass}
          onChange={onChange}
          className="focus:outline-none"
        />
        {seePass ? (
          <AiOutlineEye
            onClick={() => setSeePass(!seePass)}
            className="cursor-pointer"
          />
        ) : (
          <AiOutlineEyeInvisible
            onClick={() => setSeePass(!seePass)}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};
