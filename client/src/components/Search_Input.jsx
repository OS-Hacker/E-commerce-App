import React, { useEffect } from "react";
import styled from "styled-components";
import { searchHook } from "../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search_Input = () => {
  const [value, setValue] = searchHook();

  const Navigate = useNavigate();

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      const fetchData = async () => {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/search-filter/${value.keyword}`
        );
        setValue({ ...value, resalt: data });
        Navigate("/SearchPage");
      };

      fetchData();
    }
    setValue((value.keyword = ""));
  };

  return (
    <Wrapper>
      <div className="text_container">
        <h2 className="text">
          Search Your One From <span className="color-text">Thousand</span> Of
          <br />
          Products
        </h2>

        <div className="search_inp"></div>
        <div className="parent_div">
          <input
            type="text"
            value={value.keyword}
            onChange={(e) => setValue({ ...value, keyword: e.target.value })}
            name=""
            id="inp"
            placeholder="Search Product..."
            autoComplete="off"
            onKeyPress={handleEnterKey}
          />
          <span className="search_icon">🔍</span>
        </div>
      </div>
    </Wrapper>
  );
};

export default Search_Input;

const Wrapper = styled.section`
  .text_container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 30vh;
    text-align: center;
    font-family: sans-serif;
  }

  .color-text {
    color: ${({ theme }) => theme.color.main};
    font-weight: 600;
    font-family: cursive;
  }

  .text {
    font-family: cursive;
    font-weight: 600;
  }

  #inp {
    width: 700px;
    height: 40px;
    border-radius: 18px;
    font-size: 20px;
    padding-left: 8px;
    margin: 14px 0px;
    border: none;
    outline: none;
    box-shadow: 1px 0px 2px 1px;
  }

  .parent_div {
    position: relative;
  }

  .search_icon {
    font-size: 20px;
    position: absolute;
    right: 10px;
    top: 18px;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile_screen}) {
    #inp {
      width: 100vw;
    }

    .text {
      font-size: 2.3rem;
    }
  }
`;
