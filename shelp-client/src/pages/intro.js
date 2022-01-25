import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LoginModal } from "./modals.js";

const Wallpaper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("https://picsum.photos/1920/1080"),
    linear-gradient(to right bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5));
  background-size: cover; // cover;
  background-repeat: no-repeat;
`;

const Wraper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  background-size: cover;
  background-repeat: no-repeat;
`;

const TouchPoint = styled.div`
  bottom: 3rem;
  right: 3rem;
  width: 26rem;
  height: 5rem;
  position: absolute; // sticky  absolute?
  z-index: 999;
  background-color: rgba(255, 255, 255, 1);
  padding: 4rem 3rem;
  border-radius: 0.3rem;
`;

export default function Intro() {
  const [isModalOpen, SetIsModalOpen] = useState(false);

  const modalHandler = () => {
    SetIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <Wallpaper>
        <Wraper>
          <TouchPoint>
            <div>오늘의 상차림, Shelp 와 함께하세요</div>
            <button>
              <Link to="/login">로그인</Link>
            </button>
            <Link to="/signup">회원가입</Link>
          </TouchPoint>
        </Wraper>
      </Wallpaper>
    </div>
  );
}
