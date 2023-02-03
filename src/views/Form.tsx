import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineFontSize,
  AiOutlineAlignLeft,
  AiOutlineMail,
} from "react-icons/ai";

import { FileInput, ButtonInput, TextInput } from "../components";
import { iBooks, initialBookState } from "../interfaces";

import axios from "axios";
import { API, graphqlOperation } from "aws-amplify";
import { createBook } from "../graphql/mutations";

export const Form = () => {
  const nav = useNavigate();
  const [formValidation, setFormValidation] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [book, setBook] = useState<iBooks>(initialBookState);
  const [file, setFile] = useState<File | null>(null);
  const [filesPreview, setFilesPreview] = useState<string>("");

  const bookCreator = async (finishedBook: iBooks) => {
    try {
      await API.graphql(graphqlOperation(createBook, { input: finishedBook }));
    } catch (e) {
      console.log(e);
    }
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSending(true);

    if (book.title === "" || book.description === "" || book.owner === "") {
      setFormValidation(true);
      return;
    }

    const finishedBook: iBooks = {
      ...book,
      id: (Math.random() * 1000).toString(),
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
      fileUrl: `https://wl-poc-files.s3.amazonaws.com/${file!.name}`,
    };

    setFormValidation(false);

    try {
      await bookCreator(finishedBook);
      await uploadFile();
      await sendEmailHandler(finishedBook);
      nav("/");
    } catch (e) {
      console.log(e);
    }

    setSending(false);
  };

  const uploadFile = async () => {
    if (file) {
      const response = await axios(
        `https://kgt7wukn1m.execute-api.us-east-1.amazonaws.com/dev/presigned-url-2?fileName=${file.name}`
      );

      const url = response.data.fileUploadURL;

      await axios({
        method: "PUT",
        url: url,
        data: file,
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  };

  const sendEmailHandler = async (emailBook: iBooks) => {
    try {
      await axios({
        method: "POST",
        url: `https://kgt7wukn1m.execute-api.us-east-1.amazonaws.com/dev/email-sender`,
        data: emailBook,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form>
        <TextInput
          name="title"
          text="Title: "
          type="text"
          value={book.title}
          icon={<AiOutlineFontSize />}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBook({ ...book, title: e.target.value });
          }}
          required={true}
        />
        <TextInput
          name="description"
          text="Description: "
          type="text"
          value={book.description}
          icon={<AiOutlineAlignLeft />}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBook({ ...book, description: e.target.value });
          }}
          required={true}
        />
        <TextInput
          name="owner"
          icon={<AiOutlineMail />}
          text="Email: "
          type="email"
          value={book.owner}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBook({ ...book, owner: e.target.value })
          }
          required={true}
        />
        <FileInput
          setFile={setFile}
          file={file}
          filesPreview={filesPreview}
          setFilesPreview={setFilesPreview}
          title="Upload files here: "
          required={true}
        />
        {formValidation && (
          <p className="text-red-500 pt-5">Please fill out the entire form.</p>
        )}
        <ButtonInput
          clickHandler={submitHandler}
          disabled={sending}
          title="Submit Book"
        />
      </form>
    </div>
  );
};
