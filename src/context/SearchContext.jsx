import { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchHistory, setSearchHistory] = useState([]);

  const addToHistory = (searchData) => {
    setSearchHistory(prev => [{
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...searchData
    }, ...prev]);
  };

  return (
    <SearchContext.Provider value={{ searchHistory, addToHistory }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext); 