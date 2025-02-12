import axios from "axios";
import React, { useEffect, useState } from "react";

export const useCategory = () => {
  const [categorys, setCategorys] = useState([]);

  const getCategorys = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/get-category`
    );
    setCategorys(data?.category);
  };

  useEffect(() => {
    getCategorys();
}, []);

  return categorys;
};
