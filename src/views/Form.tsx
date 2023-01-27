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
  let url: string;

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    uploadFile();
    //uploadBook();

    console.log(book);

    setFilesPreview("");
    setFile(null);
    nav("/library");
  };

  const uploadBook = () => {
    setBook({ ...book, id: (Math.random() * 1000).toString() });

    axios({
      method: "PUT",
      url: `https://kgt7wukn1m.execute-api.us-east-1.amazonaws.com/dev/book-uploader`,
      data: book,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log("done correctly", response);
      console.log(book);
      setBook(initialBookState);
    });
  };

  const uploadFile = () => {
    if (file) {
      axios(
        `https://kgt7wukn1m.execute-api.us-east-1.amazonaws.com/dev/presigned-url-2?fileName=${file.name}`
      ).then((response) => {
        url = response.data.fileUploadURL;

        axios({
          method: "PUT",
          url: url,
          data: file,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((resp) => {
          console.log(resp);
          setBook({ ...book, fileUrl: url });
        });
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
