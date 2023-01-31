import React from "react";

interface iButtonProps {
  clickHandler: (e: React.SyntheticEvent) => void;
  disabled?: boolean;
  title: string;
}

export const ButtonInput = ({
  clickHandler,
  disabled = false,
  title,
}: iButtonProps) => {
  const classNameForButton: string = `transition-all border rounded-md py-2 px-7 ${
    disabled
      ? "border border-gray-500 bg-gray-200"
      : "border-white hover:border-red-500"
  }`;

  return (
    <div className="py-5">
      <button
        type="submit"
        disabled={disabled}
        className={classNameForButton}
        onClick={clickHandler}
      >
        {disabled ? "Working on it..." : title}
      </button>
    </div>
  );
};
