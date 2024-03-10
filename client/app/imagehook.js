'use client'

import { useState } from "react";


const useImageHook = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Selected file is not an image.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImgUrl(reader.result);
    };
    reader.readAsDataURL(file);
    setError(null);
  };

  const clearImage = () => {
    setImgUrl(null);
  };

  return { handleImageChange, imgUrl, error, clearImage };
};

export default useImageHook;
