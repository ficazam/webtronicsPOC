import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MailInput, TextInput, FileInput } from "../components";

export const Form = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [validation, setValidation] = useState<boolean>(true);
  const [files, setFiles] = useState<File[]>([]);

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (fileName === "" || email === "" || !files) {
      setValidation(false);
      return;
    }

    const fileObj = {
      name: fileName.replaceAll(" ", "_"),
      files: files,
    };

    console.log(email, fileObj);

    setEmail("");
    setFileName("");
    setFiles([]);
    //nav("/files");
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
          <TextInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFileName(e.target.value)
            }
            fileName={fileName}
          />
        </div>
        <div className="py-5">
          <FileInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files) {
                setFiles([...files, e.target.files[0]]);
              }
            }}
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
