interface IFileInput {
  file: File | null;
  filesPreview: string;
  setFile: (file: File | null) => void;
  setFilesPreview: (preview: string) => void;
  deleteFile?: (fileToDelete: string, newFile: string) => void;
  title?: string;
}

export const FileInput = ({
  file,
  filesPreview,
  setFile,
  setFilesPreview,
  deleteFile,
  title,
}: IFileInput) => {
  const fileSelectedHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const allFiles = Object.values(e.target.files).map((file: File) => {
        const reader: FileReader = new FileReader();
        return new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });
      const readerData: string[] = (await Promise.all(allFiles)) as string[];

      for (var j in readerData) {
        setFile(e.target.files[0]);
        setFilesPreview(readerData[j]);
      }
    }
  };

  const deleteFileHandler = async (index: number) => {
    let fileToDelete: string = "";
    const regexp = /^(ftp|http|https):\/\/[^ "]+$/;

    if (regexp.test(filesPreview)) {
      fileToDelete = filesPreview.split("/")[3];

      setFile(null);
      setFilesPreview("");

      deleteFile && deleteFile(fileToDelete, fileToDelete);
    } else {
      console.log("not valid URL");
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
        <div className="space-y-1 text-center">
          <label>
            <input type="file" onChange={fileSelectedHandler} />
          </label>
        </div>
      </div>
    </div>
  );
};
