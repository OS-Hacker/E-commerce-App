import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const UserPrivetRoute = () => {
  const { token } = useSelector((state) => state?.auth);

  console.log(token)


  const [ok, setOk] = useState(false);

  useEffect(() => {
    const checkFunc = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user-protect`
      );

      if (data.ok) {
        return setOk(true);
    } else {
        return setOk(false);
      }
    };

    if (token) {
      checkFunc();
    }
    
  }, [token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default UserPrivetRoute;
