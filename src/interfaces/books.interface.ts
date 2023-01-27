export interface iBooks {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  fileUrl: string;
}

export const initialBookState: iBooks = {
  id: "",
  title: "",
  description: "",
  createdDate: "",
  fileUrl: "",
};
