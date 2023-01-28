export interface iBooks {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  fileUrl: string;
  owner: string;
}

export const initialBookState: iBooks = {
  id: "",
  title: "",
  description: "",
  createdAt: "",
  updatedAt: "",
  fileUrl: "",
  owner: "",
};
