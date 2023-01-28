import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AiOutlineFontSize,
  AiOutlineAlignLeft,
  AiOutlineMail,
} from "react-icons/ai";

import { ButtonInput, TextInput } from "../components";
import { iBooks, initialBookState } from "../interfaces";

import { API, graphqlOperation } from "aws-amplify";
import { getBook } from "../graphql/queries";
import { updateBook } from "../graphql/mutations";

export const EditForm = () => {
  const nav = useNavigate();
  const [book, setBook] = useState<iBooks>(initialBookState);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();

  const fetchBooks = async () => {
    setLoading(true);
    let bookData: any;

    try {
      bookData = (await API.graphql(graphqlOperation(getBook, { id: id }))) as {
        data: any;
        errors: any[];
      };

      const bookList = bookData.data.getBook;

      setBook(bookList);
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

    const finishedBook: iBooks = {
      ...book,
      updatedAt: new Date().toLocaleDateString(),
    };

    bookEditor(finishedBook);

    try {
      nav("/");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

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
          name="title"
          value={book.title}
          text="Title: "
          type="text"
          icon={<AiOutlineFontSize />}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBook({ ...book, title: e.target.value });
          }}
          required={true}
        />
        <TextInput
          name="dsecription"
          value={book.description}
          text="Description: "
          type="text"
          icon={<AiOutlineAlignLeft />}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBook({ ...book, description: e.target.value });
          }}
          required={true}
        />
        <TextInput
          name="owner"
          value={book.owner}
          icon={<AiOutlineMail />}
          text="Email: "
          type="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBook({ ...book, owner: e.target.value })
          }
          required={true}
        />
        <ButtonInput clickHandler={submitHandler} title="Submit Book" />
      </form>
    </div>
  );
};
