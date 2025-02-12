import ContectForm from "../components/ContectForm";
import ContectGreed from "../components/ContectGreed";
import { useState } from "react";

const Contect = () => {
  const [Form, SetForm] = useState(false);

  const [data, setData] = useState("");

  const userName = (myName) => {
    setData(myName);
  };

  return (
    <>
      {Form ? (
        <ContectGreed data={data} />
      ) : (
        <ContectForm Myform={SetForm} userName={userName} />
      )}
    </>
  );
};

export default Contect;
