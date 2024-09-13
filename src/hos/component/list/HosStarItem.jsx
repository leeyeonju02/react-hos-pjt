import styled from "styled-components";

const Wrapper = styled.div`
  width: calc(100% - 32px);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: 1px solid grey;
  border-radius: 8px;
  cursor: pointer;
  background: white;
  :hover {
    background: lightgrey;
  }
`;
const TitleText = styled.p`
  font-size: 15px;
  font-weight: 500;
`;
const Context = styled.p`
  font-size: 13px;
  font-weight: 500;
`;

function HosStarItem(props) {
  return (
    <Wrapper>
      <TitleText>{props.data.dutyname}</TitleText>
      <Context>
        {" "}
        주소 : {props.data.dutyaddr} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 전화 :{" "}
        {props.data.dutytel}
      </Context>
    </Wrapper>
  );
}

export default HosStarItem;
