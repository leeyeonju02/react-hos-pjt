import styled from "styled-components";
import api from "../api/axios.js";
import { useState } from "react";

import Modal from "../../component/pages/Modal.jsx";
import { useNavigate } from "react-router-dom";

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

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border: 1px solid #ccc;
  margin-bottom: 8px;
`;

const Datesubmit = styled.div`
  display: flex;
  align-items: center; /* 세로 정렬을 중앙으로 */

  input {
    width: 100%; /* 너비 설정 */
    height: 50px; /* 높이 설정 */
    font-size: 18px; /* 글자 크기 */
    border: 1px solid #ccc; /* 테두리 */
  }
`;

const DateLabel = styled.div`
  background-color: #e9ecef;
  border-radius: 6px; /* 굴곡 추가 */
  border: 1px solid #ccc; /* 테두리 추가 */
  width: 100px;
  height: 50px;

  display: flex; /* 중앙 정렬을 위해 flexbox 사용 */
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
`;

const Submits = styled.div`
  margin-top: 20px;
  margin-bottom: 80px;
`;

const Button = styled.div`
  margin-top: 20px;
  button {
    margin-left: 10px;
  }
`;

function SearchPage() {
  const [Q0, setQ0] = useState("");
  const [Q1, setQ1] = useState("");
  const [QT, setQT] = useState(""); // 조회 일자를 저장할 상태
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

  // 날짜 선택 시 "-"를 제거한 형식으로 변환하여 상태에 저장
  const QTHandler = (e) => {
    const selectedDate = e.target.value; // YYYY-MM-DD 형식
    const formattedDate = selectedDate.replace(/-/g, ""); // "-"를 제거하여 YYYYMMDD 형식으로 변환
    setQT(formattedDate);
  };

  // 조회 버튼 클릭 시 병원 정보 API 호출
  const submitHandler = async () => {
    try {
      const response = await api.get("api/Hosinfo", {
        params: {
          Q0: Q0,
          Q1: Q1,
          QT: QT, // YYYYMMDD 형식으로 전송
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
      <Title>주소와 날짜별 의료기관 바로보기</Title>
      <Content>
        조회하고 싶은 시도/시군구 날짜를 선택해 운영 중인 진료기관을 바로
        찾아보세요.
      </Content>
      <Container>
        <div class="input-group">
          <span class="input-group-text">주소(시도)</span>
          <textarea
            class="form-control"
            aria-label="With textarea"
            onChange={Q0Handler}
          ></textarea>
        </div>
        <div class="input-group">
          <span class="input-group-text">주소(시군구)</span>
          <textarea
            class="form-control"
            aria-label="With textarea"
            onChange={Q1Handler}
          ></textarea>
        </div>
        <Datesubmit>
          <DateLabel>조회 일자 &nbsp; &nbsp;</DateLabel>
          <input type="date" onChange={QTHandler} />
        </Datesubmit>

        <Submits>
          <button
            type="button"
            class="btn btn-secondary "
            onClick={() => {
              navigate("/");
            }}
          >
            뒤로가기
          </button>
          &nbsp;
          <button
            type="button"
            class="btn btn-secondary "
            onClick={submitHandler}
          >
            조회하기
          </button>
        </Submits>

        {/* 조회된 병원 정보 리스트 표시 */}
        {hosList.map((hosItem, index) => (
          <ListItem key={index}>
            <div>
              <strong>{hosItem.dutyName}</strong> ({hosItem.dutyDivName})<br />
              주소: {hosItem.dutyAddr} <br />
              전화번호: {hosItem.dutyTel1}
            </div>

            <Button>
              <button
                type="button"
                class="btn btn-outline-success"
                onClick={() => saveHandler(hosItem)}
              >
                저장
              </button>

              <button
                type="button"
                class="btn btn-outline-dark"
                onClick={() => detailHandler(hosItem.hpid)}
              >
                상세보기
              </button>
            </Button>
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
