import styled from "styled-components";
import Button from "../../component/ui/Button";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

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
      <Button title="삭제하기" onClick={() => deleteHandler(props.data.id)}>
        {" "}
      </Button>
    </Wrapper>
  );
}

export default HosStarItem;
