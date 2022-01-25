import { useState } from "react";
import styled from "styled-components";
import { LoginModal } from "./modals.js";

const Wallpaper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300%;
  background: linear-gradient(
      to bottom,
      rgba(232, 232, 232, 0.3),
      rgba(191, 191, 191, 1)
    ),
    url("background-food-1.jpeg"); // 이미지 상대경로 기준: index.html
  background-size: cover; // cover;
  background-repeat: no-repeat;
`;

const TouchPoint = styled.div`
  display: inline-block;
  position: sticky; // sticky  absolute
  z-index: 999;
  bottom: 200px;
  right: 200px;
  background-color: cyan;
  padding: 100px;
`;

export default function About({ handleResponseSuccess }) {
  const [isModalOpen, SetIsModalOpen] = useState(false);

  const modalHandler = () => {
    SetIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <TouchPoint>
        <div>오늘의 상차림, Shelp 와 함께하세요</div>
        <button onClick={modalHandler}>로그인</button>
        <button onClick={modalHandler}>회원가입</button>
      </TouchPoint>
      {isModalOpen ? (
        <LoginModal
          modalHandler={modalHandler}
          handleResponseSuccess={handleResponseSuccess}
        />
      ) : null}
      <Wallpaper></Wallpaper>
    </div>
  );
}
