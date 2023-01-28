interface IFileInput {
  file: File | null;
  filesPreview: string;
  setFile: (file: File | null) => void;
  setFilesPreview: (preview: string) => void;
  deleteFile?: (fileToDelete: string, newFile: string) => void;
  required?: boolean;
  title?: string;
}

export const FileInput = ({
  setFile,
  setFilesPreview,
  required = false,
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

  return (
    <div className="w-full">
      <div className="flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
        <div className="space-y-1 text-center">
          <label>
            <input
              type="file"
              onChange={fileSelectedHandler}
              required={required}
            />
          </label>
        </div>
      </div>
    </div>
  );
};
