import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FileInput, ButtonInput } from "../components";

export const Form = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [validation, setValidation] = useState<boolean>(true);
  const [files, setFiles] = useState<File[]>([]);
  const [filesPreviews, setFilesPreviews] = useState<string[]>([]);

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (email === "" || !files) {
      setValidation(false);
      return;
    }

    const fileObj = {
      files: files,
    };

    console.log(email, fileObj);

    setEmail("");
    setFiles([]);
    nav("/files");
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form>
        <FileInput
          setFiles={setFiles}
          files={files}
          filesPreviews={filesPreviews}
          setFilesPreviews={setFilesPreviews}
          title="Upload files here: "
        />
        {!validation && (
          <div className="text-center text-red-800">
            Please fill in the entire form!
          </div>
        )}
        <ButtonInput clickHandler={submitHandler} title="Submit Files" />
      </form>
    </div>
  );
};
