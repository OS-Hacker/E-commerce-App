import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/registation`,
        formData
      );

      console.log(data);

      if (data?.success) {
        toast.success(data.msg, {
          position: "bottom-left",
        });
        localStorage.setItem("user", JSON.stringify(data));
        return data;
      }
    } catch (error) {
      console.log(error);
      if (error?.response.data.msg) {
        toast.error(error?.response.data.msg, {
          position: "bottom-left",
        });
        return rejectWithValue(error?.response.data.msg);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        formData
      );

      if (data?.success) {
        toast.success(data.msg, {
          position: "bottom-left",
        });
        localStorage.setItem("user", JSON.stringify(data));
        return data;
      }
    } catch (error) {
      console.log(error);
      if (error?.response.data.msg) {
        toast.error(error?.response.data.msg, {
          position: "bottom-left",
        });
        return rejectWithValue(error?.response.data.msg);
      }
    }
  }
);
