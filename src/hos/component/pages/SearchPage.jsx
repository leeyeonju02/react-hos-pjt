import styled from "styled-components";
import api from "../api/axios.js";
import { useState } from "react";
import TextInput from "../../component/ui/TextInput";
import Button from "../../component/ui/Button";
import Modal from "../../component/pages/Modal.jsx";
import { useNavigate } from "react-router-dom";

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
  const [detail, setDetail] = useState(null); // 모달에 표시할 상세 데이터
  const [hosList, setHosList] = useState([]); // 병원 정보 리스트 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false); //모달 상태
  const navigate = useNavigate();

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
      await api.post("/hosinfo/save", hosItem); // API로 정보 저장
      alert("저장되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  // 상세보기 버튼 클릭 시 모달을 열고 병원 상세 정보를 받아옴
  const detailHandler = async (hpid) => {
    console.log("상세보기 hpid:", hpid);
    try {
      const response = await api.get("/api/Hosdetail", {
        params: {
          hpid: hpid,
        },
      });
      console.log(response.data);
      setDetail(response.data); // 상세 정보 설정
      setIsModalOpen(true); // 모달 오픈
    } catch (err) {
      console.log(err);
    }
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Wrapper>
      <Container>
        <Button
          title="뒤로가기"
          onClick={() => {
            navigate("/");
          }}
        ></Button>
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
            {/* hpid 값을 detailHandler로 전달 */}
            <Button
              title="상세보기"
              onClick={() => detailHandler(hosItem.hpid)}
            />
          </ListItem>
        ))}
      </Container>

      {/* 모달 컴포넌트 */}
      {isModalOpen && detail && (
        <Modal isOpen={isModalOpen} onClose={closeModal} hosDetail={detail} />
      )}
    </Wrapper>
  );
}

export default SearchPage;
