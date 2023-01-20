import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MailInput, FileInput } from "../components";

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
        <div className="py-5">
          <MailInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            mail={email}
          />
        </div>
        <div className="py-5">
          <FileInput
            setFiles={setFiles}
            files={files}
            filesPreviews={filesPreviews}
            setFilesPreviews={setFilesPreviews}
            title="Upload files here: "
          />
        </div>
        {!validation && (
          <div className="text-center text-red-800">
            Please fill in the entire form!
          </div>
        )}
        <div className="my-5">
          <input
            type="submit"
            className="transition-all border border-white rounded-md py-2 px-7 hover:border-red-500"
            onClick={submitHandler}
          />
        </div>
      </form>
    </div>
  );
};
