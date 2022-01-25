import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LoginModal } from "./modals.js";

// font-family: adobe-clean-han-japanese,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;
const TouchPoint = styled.div`
  position: relative;
  width: 36vw;
  height: 90vh;
  z-index: 999;
  padding: 5vh;
  margin-left: 32vw;
  background-color: white;
  align-content: space-between;

  > div.title {
    margin-top: 1rem;
    font-weight: bold;
    font-size: 200%;
  }

  > div.requirment {
    margin-top: 4rem;
    font-size: 90%;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.5);
  }

  > input {
    color: rgba(0, 0, 0, 0.3);
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
    color: rgba(0, 0, 0, 0.8);
    border-bottom-width: 2.5px;
    border-color: rgba(0, 0, 0, 0.5);
  }

  > div.message {
    margin-top: 0.5rem;
    color: rgba(0, 0, 0, 0.5);
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  > button.submit {
    height: auto;
    margin-top: 3rem;
    margin-left: 15rem;
    padding: 0.7rem 1rem;
    background-color: grey;
    color: white;
    font-weight: bold;
    border-style: hidden;
    border-radius: 2rem;
    cursor: pointer;
  }

  > button.oauth {
    width: 15rem;
    height: auto;
    margin-top: 1rem;
    margin-left: 10.5rem;
    padding: 0.7rem 1rem;
    background-color: gold;
    color: black;
    font-weight: bold;
    border-style: hidden;
    border-radius: 2rem;
    cursor: pointer;
  }
`;

export default function About({ handleResponseSuccess }) {
  const [inputOn, setInputOn] = useState(false);

  return (
    <div>
      <TouchPoint>
        <div className="title">회원가입</div>
        <div className="requirment">이메일 주소</div>
        <input placeholder="사용하실 이메일 주소를 입력해 주세요"></input>
        <div className="message">이메일 안내</div>
        <div className="requirment">비밀번호</div>
        <input
          type="password"
          placeholder="사용하실 비밀번호를 입력해 주세요"
        ></input>
        <div className="message">비밀번호 에러</div>
        <div className="requirment">닉네임</div>
        <input placeholder="사용하실 닉네임을 입력해 주세요"></input>
        <div className="message">사용하실 닉네임을 입력해 주세요</div>
        <button className="submit">이메일 인증하고 회원가입</button>
        <button className="oauth">카카오 계정으로 계속하기</button>
      </TouchPoint>
    </div>
  );
}
