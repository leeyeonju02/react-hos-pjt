import styled from "styled-components";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: row; /* 가로 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: space-between; /* 양쪽 끝으로 배치 */
  border: 1px solid grey;
  border-radius: 8px;
  cursor: pointer;
  background: white;
  :hover {
    background: lightgrey;
  }
`;

const TitleCommentContainer = styled.div`
  display: flex;
  flex-direction: row; /* 가로 정렬 */

  gap: 16px; /* Title과 Comment 사이에 간격 추가 */
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const Comment = styled.div`
  margin-left: 10px;
  margin-top: 4px;
`;

const Content = styled.div`
  font-size: 18px;
  margin-top: -10px;
`;

function HosStarItem(props) {
  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    console.log("id : " + id);
    try {
      const response = await api.delete(`/hosinfo/delete/${id}`);
      console.log(response.status);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <TitleCommentContainer>
          <Title>{props.data.dutyName}</Title>
          <Comment> | {props.data.dutyDivName}</Comment>
        </TitleCommentContainer>

        <Content>
          주소: {props.data.dutyAddr} <br />
          전화번호: {props.data.dutytel}
        </Content>
      </Wrapper>

      <button
        type="button"
        class="btn btn-outline-danger"
        onClick={() => deleteHandler(props.data.id)}
      >
        삭제하기
      </button>
    </Container>
  );
}

export default HosStarItem;
