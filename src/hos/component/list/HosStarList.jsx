import styled from "styled-components";
import HosStarItem from "./HosStarItem";
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
function HosStarList(props) {
  const data = Array.isArray(props.data) ? props.data : [];

  return (
    <Wrapper>
      {data.map((hos) => (
        <HosStarItem key={hos.id} data={hos} /> //data라는 props로 데이터를 넘겨줌
      ))}
    </Wrapper>
  );
}

export default HosStarList;
