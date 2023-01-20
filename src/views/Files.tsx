import React from "react";
import { AiFillFile } from "react-icons/ai";

const dummyData: string[] = ["THESE", "ARE", "DUMMY", "FILE", "NAMES"];

export const Files = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div className="w-1/5 h-max border border-gray-500 py-10 px-20">
        <h1 className="text-3xl text-center pb-10">FILES: </h1>
        <ul>
          {dummyData.map((file: string) => (
            <li className="flex items-center justify-between">
              <AiFillFile className="text-xl" />
              {file}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
