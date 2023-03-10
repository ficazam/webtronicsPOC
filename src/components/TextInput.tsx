import React from "react";

interface iTextInputProps {
  name: string;
  text: string;
  icon: JSX.Element;
  type: string;
  classNames?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value?: string;
}

export const TextInput = ({
  onChange,
  value = "",
  text,
  type,
  icon,
  name,
  classNames,
  required = false,
}: iTextInputProps) => {
  return (
    <div className="py-5">
      <div className="border-b border-gray-500 flex items-center">
        <label className="px-2">{text}: </label>
        {icon}
        <input
          value={value}
          name={name}
          type={type}
          onChange={onChange}
          className={`focus:outline-none ${classNames}`}
          required={required}
        />
      </div>
    </div>
  );
};
