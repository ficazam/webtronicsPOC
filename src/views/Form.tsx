import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineFontSize,
  AiOutlineCalendar,
  AiOutlineAlignLeft,
} from "react-icons/ai";

import { FileInput, ButtonInput, TextInput } from "../components";
import { iBooks, initialBookState } from "../interfaces";

import axios from "axios";

export const Form = () => {
  const nav = useNavigate();
  const [book, setBook] = useState<iBooks>(initialBookState);
  const [file, setFile] = useState<File | null>(null);
  const [filesPreview, setFilesPreview] = useState<string>("");

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    uploadFile();

    setBook({ ...book, fileUrl: filesPreview });

    console.log(book);

    setBook(initialBookState);
    setFilesPreview("");
    setFile(null);
    nav("/library");
  };

  const uploadFile = () => {
    if (file) {
      axios(
        `https://kgt7wukn1m.execute-api.us-east-1.amazonaws.com/webtronics_poc/presigned-url?fileName=${file.name}`
      ).then((response) => {
        const url = response.data.fileUploadURL;

        axios({
          method: "PUT",
          url: url,
          data: file,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((resp) => console.log(resp.data));
      });
    }
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
          setFile={setFile}
          file={file}
          filesPreview={filesPreview}
          setFilesPreview={setFilesPreview}
          title="Upload files here: "
        />
        <ButtonInput clickHandler={submitHandler} title="Submit Files" />
      </form>
    </div>
  );
};
