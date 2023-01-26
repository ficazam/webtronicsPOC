export interface iBooks {
  title: string;
  description: string;
  createdDate: string;
  fileUrl: string[];
}

export const initialBookState: iBooks = {
  title: "",
  description: "",
  createdDate: "",
  fileUrl: [],
};
