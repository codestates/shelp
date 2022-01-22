import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
const serverUrl = "https://randomdomain:4000";

axios.defaults.withCredentials = true;

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

export default function LoginModal({ modalHandler, handleResponseSuccess }) {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  const handleLogin = () => {
    if (loginInfo.email.length === 0 || loginInfo.password.length === 0) {
      return setErrorMessage("이메일과 비밀번호를 입력하세요");
    } else {
      axios
        .post(`${serverUrl}/user/signin`, {
          email: loginInfo.email,
          password: loginInfo.password,
        })
        .then((res) => {
          handleResponseSuccess(res.body.data);
        });
    }
  };

  return (
    <ModalContainer>
      <ModalBackdrop onClick={modalHandler}>
        <ModalView onClick={(e) => e.stopPropagation()}>
          <span className="close-btn" onClick={modalHandler}>
            close
          </span>
          <div className="title">로그인</div>
          <div>
            이메일 <input onChange={(e) => handleInputValue("email")} />
          </div>
          <div>
            비밀번호
            <input
              onChange={(e) => handleInputValue("password")}
              type="password"
            />
          </div>
          <button>로그인</button>
          <div className="query">
            <div>계정이 없으신가요?</div>
            <Link to="/signup">회원가입</Link>
            <div>{loginInfo.email}</div>
            <div>{loginInfo.password}</div>
          </div>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}
