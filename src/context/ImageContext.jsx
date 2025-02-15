import { createContext, useState } from "react";
import PropTypes from "prop-types";

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

ImageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
