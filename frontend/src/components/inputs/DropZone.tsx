import React, { ChangeEvent, useState } from "react";
import Image from "next/image";

interface DropzoneProps {
  onFileChange: (file: File | null) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileChange }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          setSelectedImage(e.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }

    onFileChange(file);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-[rgba(255,161,74,0.7)] border-dashed rounded-lg cursor-pointer bg-gray-50">
        {selectedImage ? (
          <Image src={selectedImage} alt="Imagem selecionada" width="200" height="200" className="w-full max-w-full max-h-full rounded-lg" />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Clique para enviar arquivo</span> ou arraste</p>
            <p className="text-xs text-gray-500">PNG ou JPG</p>
          </div>
        )}
        <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
      </label>
    </div>
  );
}

export default Dropzone;