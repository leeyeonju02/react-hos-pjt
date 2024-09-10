import styled from "styled-components";
import HosStarList from "../list/HosStarList";
import { useEffect, useState } from "react";
//import api from "../api/axios.js";
import axios from "axios";

const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  max-width: 720px;
  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

function StarPage(props) {
  const [lst, setLst] = useState([]);
  useEffect(() => {
    getlst();
  }, []);

  const getlst = async () => {
    try {
      const response = await axios.get("http://localhost:8001/hos/index");
      setLst(response.data);
      console.log("debug >>> axios get OK!", response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Wrapper>
      <Container>
        <HosStarList data={lst} />
      </Container>
    </Wrapper>
  );
}

export default StarPage;
