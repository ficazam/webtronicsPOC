import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { iBooks } from "../interfaces";

import { API, graphqlOperation } from "aws-amplify";
import { listBooks } from "../graphql/queries";
import { Card } from "@aws-amplify/ui-react";
import { ButtonInput } from "../components";
import { deleteBook } from "../graphql/mutations";

export const Library = () => {
  const [books, setBooks] = useState<iBooks[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
    try {
      await API.graphql(graphqlOperation(deleteBook, { input: id }));
      console.log("deleted");
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
    <div className="h-screen w-full flex flex-col items-center justify-start py-10">
      These are all the current books:
      <ul>
        {books.map((book: iBooks) => (
          <li className="my-2" key={book.id}>
            <Card className="border rounded-md p-5">
              <p className="text-lg font-semibold">Title: {book.title}</p>
              <p>Description: {book.description}</p>
              <p>Date Created: {book.createdAt}</p>
              <p>File: {book.fileUrl}</p>
              <div className="flex items-center justify-between">
                <Link to={`/${book.id}`}>Edit Book</Link>
                <ButtonInput
                  clickHandler={() => {
                    deleteBookHandler(book.id);
                  }}
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
