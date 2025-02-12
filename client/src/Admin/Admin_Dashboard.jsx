import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Admin_SideBar from "./Admin_SideBar";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";

const Admin_Deshbored = () => {
  const { user } = useSelector((state) => state?.auth);

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/getUsers`
    );
    setUsers(data.users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  console.log(users);

  // delete user
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/delete-user/${id}`
      );

      if (data.success) {
        toast.success(data.msg, {
          position: "bottom-left",
        });
        getUsers();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <Wrapper>
      <div className="alert alert-success main_container">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <Admin_SideBar />
            </div>
            <div className="col-sm-8 text-center text-dark mt-5 mb-5">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((ele, i) => {
                    const { _id, fName, lName, email, address } = ele;
                    return (
                      <tr key={_id}>
                        <td>{i + 1}</td>
                        <td>
                          {fName} {lName}
                        </td>
                        <td>{email}</td>
                        <td>{address}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteHandler(_id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Admin_Deshbored;

const Wrapper = styled.section`
  .main_container {
    height: 100vh;
  }
  @media (max-width: 768px) {
    .main_container {
      height: 100vh;
    }
  }
  table,
  th {
    font-family: cursive;
    font-size: 1.8rem;
  }
  td,
  button {
    font-size: 1.8rem;
    font-family: sans-serif;
  }
`;
