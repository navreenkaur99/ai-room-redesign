"use client";

import Image from "next/image";
import { useState } from "react";

function ImageSelection({ selectedImage }) {
  const [file, setFile] = useState(null);

  const onFileSelected = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    selectedImage(selectedFile); // send file to parent
  };

  return (
    <div>
      <label className="font-medium">Select Image of your room</label>

      <div className="mt-3">
        <label htmlFor="upload-image">
          <div
            className={`p-28 border rounded-xl border-dotted flex justify-center border-primary items-center cursor-pointer hover:shadow-lg
            ${file ? "bg-white p-0" : "bg-slate-200"}`}
          >
            {!file ? (
              <Image
                src="/upload.jfif"
                alt="Upload"
                width={70}
                height={70}
              />
            ) : (
              <Image
                src={URL.createObjectURL(file)}
                alt="Room"
                width={300}
                height={300}
                className="w-[300px] h-[300px] object-cover rounded-xl"
              />
            )}
          </div>
        </label>

        <input
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: "none" }}
          onChange={onFileSelected}
        />
      </div>
    </div>
  );
}

export default ImageSelection;