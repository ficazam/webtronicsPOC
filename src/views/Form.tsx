import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineFontSize,
  AiOutlineCalendar,
  AiOutlineAlignLeft,
} from "react-icons/ai";

import { FileInput, ButtonInput, TextInput } from "../components";
import { iBooks, initialBookState } from "../interfaces";

export const Form = () => {
  const nav = useNavigate();
  const [book, setBook] = useState<iBooks>(initialBookState);
  const [files, setFiles] = useState<File[]>([]);
  const [filesPreviews, setFilesPreviews] = useState<string[]>([]);

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setBook({ ...book, fileUrl: filesPreviews });

    console.log(book);

    setBook(initialBookState);
    setFilesPreviews([]);
    setFiles([]);
    nav("/files");
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form>
        <TextInput
          name="title"
          text="Title: "
          type="text"
          icon={<AiOutlineFontSize />}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBook({ ...book, title: e.target.value });
          }}
        />
        <TextInput
          name="description"
          text="Description: "
          type="text"
          icon={<AiOutlineAlignLeft />}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBook({ ...book, description: e.target.value });
          }}
        />
        <TextInput
          name="createdDate"
          text="Date Created: "
          type="date"
          icon={<AiOutlineCalendar />}
          classNames="cursor-pointer"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBook({ ...book, createdDate: e.target.value });
          }}
        />
        <FileInput
          setFiles={setFiles}
          files={files}
          filesPreviews={filesPreviews}
          setFilesPreviews={setFilesPreviews}
          title="Upload files here: "
        />
        <ButtonInput clickHandler={submitHandler} title="Submit Files" />
      </form>
    </div>
  );
};
