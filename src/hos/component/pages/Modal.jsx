import { useEffect } from "react";
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

const MapContainer = styled.div`
  height: 400px;
  border: 1px solid #ddd;
`;

function Modal({ isOpen, onClose, hosDetail }) {
  useEffect(() => {
    if (!isOpen || !hosDetail || hosDetail.length === 0) return;

    // Kakao Maps 스크립트 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=&autoload=false`;
    script.async = true;

    script.onload = () => {
      const { kakao } = window;
      kakao.maps.load(() => {
        const detail = hosDetail[0]; // 병원 정보를 받음
        const lat = parseFloat(detail.wgs84Lat); // 위도
        const lon = parseFloat(detail.wgs84Lon); // 경도

        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(lat, lon), // 병원의 위도, 경도를 사용
          level: 2,
        };

        const map = new kakao.maps.Map(container, options);

        const markerPosition = new kakao.maps.LatLng(lat, lon); // 마커 위치도 동일하게 병원의 위치로 설정
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        const iwContent = `<div style="text-align:center;padding:2px;width:210px;">${detail.dutyName}</div>`; // 병원 이름을 표시
        const infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
        });
        infowindow.open(map, marker);

        kakao.maps.event.addListener(marker, "click", () => {
          window.open(
            `https://map.kakao.com/link/map/${detail.dutyName},${lat},${lon}`
          );
        });
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // 컴포넌트가 언마운트될 때 스크립트 제거
    };
  }, [isOpen, hosDetail]);

  if (!isOpen || !hosDetail || hosDetail.length === 0) return null; // 데이터가 없으면 렌더링하지 않음

  const detail = hosDetail[0];

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
        <MapContainer id="map"> 지도 </MapContainer>
      </ModalContent>
    </ModalOverlay>
  );
}

export default Modal;
