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
  background: url("backgroundimage/backgroundimage-10.jpg"),
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
  position: absolute;
  z-index: 999;
  background-color: white;
  padding: 2.5rem 3rem 4rem 3rem;
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;

  > div.hello {
    flex: 1 0 auto;
    font-size: 1.5em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.7);
    padding-bottom: 1rem;
    text-align: center;
  }
  > button.login {
    flex: 1 0 auto;
    margin: 0 9%;
    padding: 0.3em;
    border: none;
    border-radius: 50vh;
    font-size: 1.3em;
    font-weight: bold;
    > a {
      color: grey;
      padding: 0 40%;
    }
    > a:hover {
      color: black;
    }
  }
  > div.signup {
    margin-top: 0.5em;
    text-align: center;
    font-size: 1em;
    > a {
      color: grey;
    }
    > a:hover {
      color: black;
    }
  }
`;

export default function Intro({ handleResponseSuccess }) {
  const [isModalOpen, SetIsModalOpen] = useState(false);

  const modalHandler = () => {
    SetIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      {isModalOpen ? (
        <LoginModal
          modalHandler={modalHandler}
          handleResponseSuccess={handleResponseSuccess}
        />
      ) : null}
      <Wallpaper>
        <Wraper>
          <TouchPoint>
            <div className="hello">오늘의 상차림, Shelp 와 함께하세요</div>
            <button className="login">
              <Link to="/login">로그인</Link>
            </button>
            <div className="signup">
              <Link to="/signup">회원가입</Link>
            </div>
          </TouchPoint>
        </Wraper>
      </Wallpaper>
    </div>
  );
}
