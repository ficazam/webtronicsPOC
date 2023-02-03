import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { iBooks } from "../interfaces";

import { API, graphqlOperation } from "aws-amplify";
import { listBooks } from "../graphql/queries";
import { Card } from "@aws-amplify/ui-react";
import { ButtonInput } from "../components";
import { deleteBook } from "../graphql/mutations";

import axios from "axios";

export const Library = () => {
  const [books, setBooks] = useState<iBooks[]>([]);
  const [sending, setSending] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const bookData = (await API.graphql(graphqlOperation(listBooks))) as {
        data: any;
        errors: any[];
      };

      const bookList = bookData.data.listBooks.items;

      setBooks(bookList);
      setLoading(false);
    } catch (e) {
      console.log("error", e);
    }
  };

  const deleteBookHandler = async (id: string) => {
    setSending(true);
    try {
      await API.graphql(graphqlOperation(deleteBook, { input: { id: id } }));
      await fetchBooks();
    } catch (e) {
      console.log(e);
    }
    setSending(false);
  };

  const downloadFileHandler = async (filePath: string) => {
    const fileName = filePath.split("/")[3];
    console.log(fileName);

    await axios({
      method: "POST",
      url: "https://kgt7wukn1m.execute-api.us-east-1.amazonaws.com/dev/file-getter",
      data: fileName,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
    <div className="h-screen w-full flex flex-col items-center justify-start py-10">
      These are all the current books:
      <ul>
        {books.map((book: iBooks) => (
          <li className="my-2" key={book.id}>
            <Card className="border rounded-md p-5">
              <p className="text-lg font-semibold">Title: {book.title}</p>
              <p>Description: {book.description}</p>
              <p>Date Created: {book.createdAt}</p>
              <p className="flex">
                File:{" "}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => downloadFileHandler(book.fileUrl)}
                >
                  {book.fileUrl}
                </span>
              </p>
              <div className="flex items-center justify-between">
                <Link to={`/${book.id}`}>Edit Book</Link>
                <ButtonInput
                  clickHandler={() => {
                    deleteBookHandler(book.id);
                  }}
                  disabled={sending}
                  title="Delete Book"
                />
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};
