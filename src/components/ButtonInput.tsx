import React from "react";

interface iButtonProps {
  clickHandler: (e: React.SyntheticEvent) => void;
  title: string;
}

export const ButtonInput = ({ clickHandler, title }: iButtonProps) => {
  return (
    <div className="py-5">
      <button
        type="submit"
        className="transition-all border border-white rounded-md py-2 px-7 hover:border-red-500"
        onClick={clickHandler}
      >
        {title}
      </button>
    </div>
  );
};
