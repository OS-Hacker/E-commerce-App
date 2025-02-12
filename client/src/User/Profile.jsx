import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../style/Button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/esm/Spinner";

const Profile = () => {
  //  GET USER DATA
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const { user } = useSelector((state) => state?.auth);

  useEffect(() => {
    setfName(user.fName);
    setlName(user.lName);
    setEmail(user.email);
    setAddress(user.address);
  }, []);

  // UPDATE USER

  const [Loading, setLoading] = useState(false);

  const updateData = { fName, lName, email, address };

  const HandleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/update-user`,
        updateData
      );

      setLoading(true);

      if (data?.success) {
        let ls = localStorage.getItem("user");
        ls = JSON.parse(ls);
        ls.user = data.updateUserProfile;
        localStorage.setItem("user", JSON.stringify(ls));

        toast.success(data.msg);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="profile-main-div alert alert-light">
        <div className="row  p-5">
          <div className="col-md-12 m-auto text-center">
            <div className="card-header p-5">
              <h1 className="text-uppercase">👤</h1>
              <div className="card-body">
                <form onSubmit={HandleUpdate} className="main_form">
                  <input
                    type="text"
                    name=""
                    autoFocus
                    placeholderinp="First Name"
                    value={fName}
                    className="inp"
                    onChange={(e) => setfName(e.target.value)}
                  />
                  <input
                    type="text"
                    name=""
                    placeholder="Last Name"
                    value={lName}
                    className="inp"
                    onChange={(e) => setlName(e.target.value)}
                  />
                  <br />
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter Email"
                    className="inp w-100"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />
                  <textarea
                    type="text"
                    name="address"
                    placeholder="Enter Address"
                    className="inp w-100"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <Button type="submit" className="w-100">
                    {Loading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="lg"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .profile-main-div {
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    align-items: center;
    font-size: 2.2rem;
  }
  .inp {
    border: none;
    outline: none;
    /* border-bottom: 2px solid #2e1f1f; */
    background-color: #dddddd;
    margin: 10px;
  }

  input {
    font-family: cursive;
    width: 285px;
    border-radius: 2%;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile_screen}) {
    input,
    textarea {
      width: 90% !important;
      font-size: 1.8rem;
    }
    button {
      width: 100% !important;
    }
  }
`;

export default Profile;
