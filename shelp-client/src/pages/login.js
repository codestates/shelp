import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
const serverUrl = "http://localhost:4000";

// font-family: adobe-clean-han-japanese,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;

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

// url("https://source.unsplash.com/food")
// https://api.unsplash.com/
// "https://unsplash.com/s/photos/lunch"
// "https://picsum.photos/1920/1080"
// "https://source.unsplash.com/random/1920x1080"
// 'https://loremflickr.com/320/240/dog'

const TouchPoint = styled.div`
  bottom: 3rem;
  right: 12rem;
  width: 26rem;
  height: 33rem;
  position: absolute; // sticky  absolute?
  z-index: 999;
  background-color: white;
  padding: 3rem;
  border-radius: 0.3rem;
  align-content: space-between;

  > div.title {
    font-weight: bold;
    font-size: 200%;
    padding-bottom: 0.7em;
  }

  > span.query {
    padding-right: 0.5em;
  }

  > span.signup-button {
    color: grey;
  }

  > div.email-req {
    padding-top: 3rem;
    font-size: 80%;
    color: rgba(0, 0, 0, 0.5);
  }

  > input {
    padding-top: 0.3rem;
    font-size: 1.2rem;
    width: 25rem;
    outline: none;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    border-bottom-width: 0.5px;
    border-color: rgba(0, 0, 0, 0.1);
  }

  > input:focus {
    border-bottom-width: 2.5px;
    border-color: rgba(0, 0, 0, 0.5);
  }

  > div.error {
    color: red;
    font-size: 0.9rem;
  }

  > button.submit {
    height: auto;
    margin-top: 1rem;
    padding: 0.7rem 1rem;
    background-color: grey;
    color: white;
    font-weight: bold;
    border-style: hidden;
    border-radius: 2rem;
    cursor: pointer;
  }

  > button.oauth {
    width: 10rem;
    height: auto;
    margin-top: 3rem;
    margin-left: 1rem;
    padding: 0.7rem 1rem;
    background-color: gold;
    color: black;
    font-weight: bold;
    border-style: hidden;
    border-radius: 2rem;
    cursor: pointer;
  }
`;

export default function Login({ handleResponseSuccess }) {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputValue = (e, key) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleLogin = () => {
    if (loginInfo.email.length === 0 || loginInfo.password.length === 0) {
      setErrorMessage("이메일과 비밀번호를 입력하세요");
    } else {
      // console.log(JSON.stringify(loginInfo))
      axios
        .post(`${serverUrl}/user/signin`, loginInfo, {
          "Content-Type": "application/json",
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("userinfo: ", res.data.data);
            // const { accessToken } = res.data;
            // axios.defaults.headers.common['jwt'] = `Bearer ${accessToken}`;
            return handleResponseSuccess(res.data.data);
          } else {
            alert("falild!");
          }
        });
    }
  };

  return (
    <div>
      <Wallpaper>
        <Wraper>
          <TouchPoint>
            <div className="title">로그인</div>
            <span className="query">처음이신가요?</span>
            <span className="signup-button">
              <Link to="/signup">회원가입</Link>
            </span>
            <div className="email-req">이메일 주소</div>
            <input onChange={(e) => handleInputValue(e, "email")}></input>
            <div className="error">이메일 주소를 입력해 주세요</div>
            <div className="email-req">비밀번호</div>
            <input
              onChange={(e) => handleInputValue(e, "password")}
              type="password"
            ></input>
            <div className="error">비밀번호를 입력해 주세요</div>
            <button className="submit" onClick={handleLogin}>
              로그인
            </button>
            <button className="oauth">카카오로 계속하기</button>
          </TouchPoint>
        </Wraper>
      </Wallpaper>
    </div>
  );
}
