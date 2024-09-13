import styled from "styled-components";
import api from "../api/axios.js";
import { useState, useEffect } from "react";
import TextInput from "../../component/ui/TextInput";
import Button from "../../component/ui/Button";

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
const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border: 1px solid #ccc;
  margin-bottom: 8px;
`;

function SearchPage() {
  const [Q0, setQ0] = useState("");
  const [Q1, setQ1] = useState("");
  const [QT, setQT] = useState("");
  const [hosList, setHosList] = useState([]); // 병원 정보 리스트 상태 추가

  const Q0Handler = (e) => {
    setQ0(e.target.value);
  };
  const Q1Handler = (e) => {
    setQ1(e.target.value);
  };
  const QTHandler = (e) => {
    setQT(e.target.value);
  };

  // 조회 버튼 클릭 시 병원 정보 API 호출
  const submitHandler = async () => {
    try {
      const response = await api.get("api/Hosinfo", {
        params: {
          Q0: Q0,
          Q1: Q1,
          QT: QT,
        },
      });
      console.log(response.data);
      setHosList(response.data); // 받아온 병원 데이터를 상태에 저장
    } catch (err) {
      console.log(err);
    }
  };

  // 저장 버튼 클릭 시 해당 병원 정보 저장
  const saveHandler = async (hosItem) => {
    try {
      await api.post("/api/saveHosInfo", hosItem); // API로 정보 저장
      alert("저장되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <Container>
        <label>
          주소(시도) : <TextInput height={20} value={Q0} onChange={Q0Handler} />
        </label>
        <label>
          주소(시군구) :{" "}
          <TextInput height={20} value={Q1} onChange={Q1Handler} />
        </label>
        <label>
          조회 일자 : <TextInput height={20} value={QT} onChange={QTHandler} />
        </label>

        <Button title="조회하기" onClick={submitHandler}></Button>

        {/* 조회된 병원 정보 리스트 표시 */}
        {hosList.map((hosItem, index) => (
          <ListItem key={index}>
            <div>
              <strong>{hosItem.dutyName}</strong> ({hosItem.dutyDivName})<br />
              주소: {hosItem.dutyAddr} <br />
              전화번호: {hosItem.dutyTel1}
            </div>
            <Button title="저장" onClick={() => saveHandler(hosItem)} />
          </ListItem>
        ))}
      </Container>
    </Wrapper>
  );
}

export default SearchPage;
