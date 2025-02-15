import { createContext, useState, useContext } from "react";

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);

  const addToHistory = (result) => {
    setSearchHistory((prev) => [result, ...prev]);
  };

  return (
    <ImageContext.Provider
      value={{ searchHistory, addToHistory, currentImage, setCurrentImage }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImage = () => useContext(ImageContext);
