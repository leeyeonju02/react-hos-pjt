import styled from "styled-components";
import HosStarList from "../list/HosStarList";
import { useEffect, useState } from "react";
import api from "../api/axios.js";

const Wrapper = styled.div`
  padding: 16px;
  width: calc(100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  max-width: 100%;
  & > * {
    s :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 900;
  margin-top: 20px;
  margin-left: 50px;
  text-align: left; /* 제목을 왼쪽으로 정렬 */
  width: 100%; /* 제목을 전체 너비에 맞춤 */
`;
const Content = styled.div`
  text-align: left; /* 제목을 왼쪽으로 정렬 */
  width: 100%; /* 제목을 전체 너비에 맞춤 */
  margin-left: 50px;
  margin-bottom: 80px;
  font-size: 18px;
`;

function StarPage(props) {
  const [lst, setLst] = useState([]);
  useEffect(() => {
    getlst();
  }, []);

  const getlst = async () => {
    try {
      const response = await api.get("hosinfo/index");
      setLst(response.data);
      console.log("debug >>> axios get OK! star", response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Wrapper>
      <Title>즐겨찾기한 의료기관 바로보기</Title>
      <Content>자주 조회하고 싶은 의료기관들을 저장해 바로 찾아보세요.</Content>
      <Container>
        <HosStarList data={lst} />
      </Container>
    </Wrapper>
  );
}

export default StarPage;
