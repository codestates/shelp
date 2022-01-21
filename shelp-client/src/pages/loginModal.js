import { useState } from "react";
import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
`;

const ModalContainer = styled.div`
  height: 15rem;
  text-align: center;
  margin: 120px auto;
`;

const ModalView = styled.div`
  border-radius: 30px;
  background-color: white;
  width: 300px;
  height: 500px;

  > span.close-btn {
    margin-top: 50%;
    cursor: pointer;
    color: grey;
  }

  > div.title {
    margin-top: 30px;
    color: blue;
  }

  > div.query {
    margin-top: 30px;
    color: red;
  }
`;

export default function LoginModal({ modalHandler }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ModalContainer>
      <ModalBackdrop onClick={modalHandler}>
        <ModalView onClick={(e) => e.stopPropagation()}>
          <span className="close-btn" onClick={modalHandler}>
            close
          </span>
          <div className="title">로그인</div>
          <div>
            아이디 <input onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            비밀번호{" "}
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <button>로그인</button>
          <div className="query">
            <div>계정이 없으신가요?</div>
            <button onClick={() => window.location.replace("/signup")}>
              회원가입
            </button>
            <div>{email}</div>
            <div>{password}</div>
          </div>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}
