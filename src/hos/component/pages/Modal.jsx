import styled from "styled-components";
import Button from "../../component/ui/Button";

// 모달 창 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

function Modal({ isOpen, onClose, hosDetail }) {
  if (!isOpen || !hosDetail || hosDetail.length === 0) return null; // 데이터가 없으면 렌더링하지 않음

  const detail = hosDetail[0]; // hosDetail 배열의 첫 번째 요소로 접근

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{detail.dutyName} 상세정보</h2>
        <p>약도 정보: {detail.dutyMapping || "제공되지 않음"}</p>
        <p>응급실 전화번호: {detail.dutyTel3 || "제공되지 않음"}</p>
        <p>
          진료시간: {detail.dutyTime1s} ~ {detail.dutyTime1c}
        </p>

        <Button title="닫기" onClick={onClose} />
      </ModalContent>
    </ModalOverlay>
  );
}

export default Modal;
