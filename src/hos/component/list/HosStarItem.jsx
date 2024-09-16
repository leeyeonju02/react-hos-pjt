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

const Context = styled.p`
  font-size: 13px;
  font-weight: 500;
`;

function HosStarItem(props) {
  return (
    <Wrapper>
      {/* <TitleText>{props.data.dutyName}</TitleText> */}
      <Context>
        <div>
          <strong>{props.data.dutyName}</strong> {props.data.dutyDivName}
          <br />
          주소: {props.data.dutyAddr} <br />
          전화번호: {props.data.dutytel}
        </div>
      </Context>
    </Wrapper>
  );
}

export default HosStarItem;
