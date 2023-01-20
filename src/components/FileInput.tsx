import { useRef, Fragment } from "react";

import { Popover, Transition } from "@headlessui/react";

import { AiOutlineFileText } from "react-icons/ai";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { IoCloseCircleOutline } from "react-icons/io5";

interface IFileInput {
  files: File[];
  filesPreviews: string[];
  setFiles: (files: File[]) => void;
  setFilesPreviews: (preview: string[]) => void;
  deleteFiles?: (filesToDelete: string[], newFiles: string[]) => void;
  title?: string;
}

export const FileInput = ({
  files = [],
  filesPreviews = [],
  setFiles,
  setFilesPreviews,
  deleteFiles,
  title,
}: IFileInput) => {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const handleOnBrowse = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const fileSelectedHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFileArray: File[] = files;
    const newPreviewArray: string[] = [...filesPreviews];

    if (e.target.files?.length) {
      newFileArray.push(e.target.files[0]);

      const allFiles = Object.values(e.target.files).map((file: File) => {
        const reader: FileReader = new FileReader();
        return new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });
      const readerData: string[] = (await Promise.all(allFiles)) as string[];

      for (var j in readerData) {
        newPreviewArray.push(readerData[j]);
      }

      setFiles(newFileArray);
      setFilesPreviews(newPreviewArray);
    }
  };

  const deleteFile = async (index: number) => {
    const filteredFiles = files;
    const filteredPreviews = [...filesPreviews];
    const filesToDelete: string[] = [];
    const regexp = /^(ftp|http|https):\/\/[^ "]+$/;

    if (regexp.test(filteredPreviews[index])) {
      filesToDelete.push(filteredPreviews[index].split("/")[3]);

      filteredFiles.splice(index, 1);
      filteredPreviews.splice(index, 1);
      setFiles(filteredFiles);
      setFilesPreviews([...filteredPreviews]);

      deleteFiles && deleteFiles(filesToDelete, filteredPreviews);
    } else {
      console.log("not valid URL");
    }
  };

  const renderPreviewType = (preview: string) => {
    const splitPreview: string[] = preview.split(",:");
    if (splitPreview[0].includes("image")) {
      return (
        <img
          alt="Preview"
          src={preview}
          className="h-20 w-20 border rounded-md py-1"
        />
      );
    }

    if (splitPreview[0].includes("pdf")) {
      return (
        <BsFileEarmarkPdf className="h-20 w-20 border rounded-md text-gray-800 py-1" />
      );
    }

    return (
      <AiOutlineFileText className="h-20 w-20 border rounded-md text-gray-800 py-1" />
    );
  };

  const bytesToSize = (bytes: number) => {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    const preCalculation = Math.log(bytes) / Math.log(1024);
    var i = parseInt(`${Math.floor(preCalculation)}`);
    return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
  };

  function imageIcon() {
    return (
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
        <div className="space-y-1 text-center">
          {filesPreviews.length === 0 && imageIcon()}
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              onClick={() => handleOnBrowse()}
              className="relative cursor-pointer rounded-md bg-white font-medium text-red-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-800 focus-within:ring-offset-2 hover:text-red-800"
            >
              {filesPreviews.length === 0 && <span>{title}</span>}
              <input
                multiple
                ref={inputFile}
                name="file-upload"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => fileSelectedHandler(e)}
              />
            </label>
          </div>
          {filesPreviews.length === 0 && (
            <p className="text-xs text-gray-500">PNG, JPG, GIF and PDF</p>
          )}
          <div className="flex flex-row gap-3 flex-wrap">
            {filesPreviews &&
              filesPreviews.map((preview: string, index: number) => (
                <div key={Math.random()} className="relative">
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md bg-orange-700 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                        >
                          {renderPreviewType(preview)}
                        </Popover.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute left-1/2 z-10 -translate-x-1/2 transform px-4">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                              <div className="relative bg-white p-7 overflow-hidden text-ellipsis">
                                <div className="flex flex-col justify-center items-start pb-2">
                                  <span className="font-semibold">Name: </span>
                                  <p className="text-xs truncate">
                                    {files[index]?.name}
                                  </p>
                                </div>
                                <div className="flex flex-col justify-center items-start">
                                  <span className="font-semibold">Size: </span>
                                  <p className="text-xs truncate">
                                    {bytesToSize(files[index]?.size)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>

                  <IoCloseCircleOutline
                    className="absolute -top-1 -right-1 border rounded-full bg-white text-xl cursor-pointer"
                    onClick={() => {
                      deleteFile(index);
                    }}
                  />
                </div>
              ))}
            {filesPreviews.length > 0 && (
              <div
                className="w-20 h-20 bg-gray-200 rounded flex justify-center items-center cursor-pointer"
                onClick={() => handleOnBrowse()}
              >
                {imageIcon()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
