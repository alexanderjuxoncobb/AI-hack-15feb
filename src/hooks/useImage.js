import { useContext } from "react";
import { ImageContext } from "../context/ImageContext";

export const useImage = () => useContext(ImageContext);
