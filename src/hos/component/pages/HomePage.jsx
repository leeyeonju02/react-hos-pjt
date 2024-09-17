import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import emergency from "../assert/tstst.jpg"; // 배경 이미지 경로

const Wrapper = styled.div`
  padding: 16px;
  width: calc(100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;

  /* 배경 이미지 추가 및 명암 조정 */
  background-image: url(${emergency});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh; /* 페이지 전체 높이를 차지하도록 설정 */
  color: white; /* 글자색을 흰색으로 설정 */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7); /* 어두운 반투명 명암 효과 */
    z-index: -1;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* 버튼들 사이의 간격을 추가 */
  & > button {
    margin-bottom: 30px; /* 각 버튼 아래에 간격을 추가 */
  }

  & > button:last-child {
    margin-bottom: 0; /* 마지막 버튼은 추가 간격 제거 */
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

const Comment = styled.div`
  text-align: center;
  padding: 25px 0;
  font-size: 20px;
  font-weight: 500;
`;

const TitleImage = styled.img`
  width: 40px;
  height: 40px;
  margin-left: 12px;
`;

function HomePage() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Title>전국 명절/공휴일 비상 진료기관 정보 조회</Title>
      <Content>
        대한민국의 현재 의료 붕괴와 명절/공휴일 기간 내 위급상황을 고려해 필요한
        의료 기관들을 직접 조회할 수 있습니다.
      </Content>
      <Container>
        <Comment> 1. 필요한 진료기관을 저장해 즐겨찾기 해보세요.</Comment>
        <button
          type="button"
          className="btn btn-outline-light btn-lg"
          onClick={() => {
            navigate("/star");
          }}
        >
          저장한 병원보기
        </button>
        <Comment>
          2. 조회하고 싶은 위치, 날짜를 기반으로 운영 중인 진료기관들을
          조회해보세요.
        </Comment>
        <button
          type="button"
          className="btn btn-outline-light btn-lg"
          onClick={() => {
            navigate("/search");
          }}
        >
          응급 의료기관 조회하기
        </button>
      </Container>
    </Wrapper>
  );
}

export default HomePage;
