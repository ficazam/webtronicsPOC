import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AiOutlineFontSize,
  AiOutlineAlignLeft,
  AiOutlineMail,
} from "react-icons/ai";

import { FileInput, ButtonInput, TextInput } from "../components";
import { iBooks, initialBookState } from "../interfaces";

import axios from "axios";
import { API, graphqlOperation } from "aws-amplify";
import { getBook } from "../graphql/queries";
import { updateBook } from "../graphql/mutations";

export const EditForm = () => {
  const nav = useNavigate();
  const [book, setBook] = useState<iBooks>(initialBookState);
  const [loading, setLoading] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>(null);
  const [filesPreview, setFilesPreview] = useState<string>("");
  const { id } = useParams();

  const fetchBooks = async () => {
    setLoading(true);
    let bookData: any;

    try {
      bookData = (await API.graphql(
        graphqlOperation(getBook, { input: id })
      )) as {
        data: any;
        errors: any[];
      };

      console.log(bookData);

      //const bookList = bookData.data.listBooks.items;

      //setBook(bookList);
      setLoading(false);
    } catch (e) {
      console.log("this is an error", e);
    }
  };

  const bookEditor = async (finishedBook: iBooks) => {
    try {
      await API.graphql(graphqlOperation(updateBook, { input: finishedBook }));
    } catch (e) {
      console.log(e);
    }
  };

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const finishedBook: iBooks = file
      ? {
          ...book,
          updatedAt: new Date().toLocaleDateString(),
          fileUrl: `https://wl-poc-files.s3.amazonaws.com/${file!.name}`,
        }
      : {
          ...book,
          updatedAt: new Date().toLocaleDateString(),
        };

    bookEditor(finishedBook);

    try {
      uploadFile();
      console.log(finishedBook);
      nav("/");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const uploadFile = () => {
    if (file) {
      axios(
        `https://kgt7wukn1m.execute-api.us-east-1.amazonaws.com/dev/presigned-url-2?fileName=${file.name}`
      ).then((response) => {
        let url: string = response.data.fileUploadURL;

        axios({
          method: "PUT",
          url: url,
          data: file,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      });
    }
  };

  if (loading)
    return (
      <p className="h-screen w-full flex items-center justify-center">
        L O A D I N G . . .
      </p>
    );

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form>
        <TextInput
          name={book.title}
          text="Title: "
          type="text"
          icon={<AiOutlineFontSize />}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBook({ ...book, title: e.target.value });
          }}
          required={true}
        />
        <TextInput
          name={book.description}
          text="Description: "
          type="text"
          icon={<AiOutlineAlignLeft />}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBook({ ...book, description: e.target.value });
          }}
          required={true}
        />
        <TextInput
          name={book.owner}
          icon={<AiOutlineMail />}
          text="Email: "
          type="email"
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
        <ButtonInput clickHandler={submitHandler} title="Submit Book" />
      </form>
    </div>
  );
};
