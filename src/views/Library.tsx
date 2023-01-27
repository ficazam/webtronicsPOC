import React, { useEffect, useState } from "react";
import { iBooks } from "../interfaces";

import axios from "axios";

export const Library = () => {
  const [bookData, setBookData] = useState<iBooks[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios(
      "https://kgt7wukn1m.execute-api.us-east-1.amazonaws.com/dev/book-uploader"
    ).then((response) => setBookData(response.data));

    setLoading(false);
  }, []);

  return (
    <div>
      {bookData.map((book: iBooks) => (
        <div>
          <p>{book.title}</p>
          <p>{book.description}</p>
          <p>{book.createdDate}</p>
          <p>{book.fileUrl}</p>
        </div>
      ))}
    </div>
  );
};
