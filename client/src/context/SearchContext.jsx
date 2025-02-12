import React, { useContext, useState, useEffect } from "react";
import { createContext } from "react";

const search = createContext();

const SearchContext = ({children}) => {
  const [value, setValue] = useState({
    loading: false,
    keyword: "",
    resalt: [],
  });
  
  return (
    <>
      <search.Provider value={[value, setValue]}>{children}</search.Provider>
    </>
  );
};

export const searchHook = () => useContext(search);
export default SearchContext;
