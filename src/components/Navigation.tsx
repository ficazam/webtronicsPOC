import React from "react";
import { Link } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";

interface iAuthProps {
  signOut: () => void;
}

export const Navigation = ({ signOut }: iAuthProps) => {
  return (
    <div className="absolute w-2/12 h-full border-r border-gray-500 bg-white">
      <nav className="h-full w-full text-center text-lg font-semibold">
        <ul className="h-full w-full flex flex-col justify-evenly">
          <li>
            <Link to="/form">Upload Files</Link>
          </li>
          <li>
            <Link to="/files">Your Files</Link>
          </li>
          <li>
            <Link to="/library">Library</Link>
          </li>
          <li>
            <Link to="/sri-lanka">Weather in Sri Lanka</Link>
          </li>
          <li>
            <button onClick={signOut}>Sign Out</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
