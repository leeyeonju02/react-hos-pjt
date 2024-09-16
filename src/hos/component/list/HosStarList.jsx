import styled from "styled-components";
import HosStarItem from "./HosStarItem";
import Button from "../../component/ui/Button";
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
  max-width: 720px;
  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;
function HosStarList(props) {
  const navigate = useNavigate();
  const data = Array.isArray(props.data) ? props.data : [];

  return (
    <Wrapper>
      <Button
        title="뒤로가기"
        onClick={() => {
          navigate("/");
        }}
      ></Button>
      <Container>
        {data.map((hos) => (
          <HosStarItem key={hos.id} data={hos} /> //data라는 props로 데이터를 넘겨줌
        ))}
      </Container>
    </Wrapper>
  );
}

export default HosStarList;
