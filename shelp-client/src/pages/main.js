import { useState, useRef, useEffect } from "react";
import { Route, Switch, Link, Routes } from "react-router-dom";
import styled from "styled-components";
import Mypage from "./mypage.js";
import { MainpageModal } from "../components/mainpage-modal.js";
import { MainPageContent } from "../components/mainpage-content.js";
const axios = require('axios').default;

// 조건에 따라 변하는 스타일만 styled component로 만들기
export function Main() {

  const [modal, setModal] = useState(false);
  const modalcontroller = () => {
    setModal(!modal);
  };

  return (
    <div>
      <mainpage className='mainpage' onClick={modal ? modalcontroller : null}>
        <navbar className='mainpage-navbar'>
          <nav></nav>
          <logo className="shelpLogo">
            <Link to="/">shelp</Link>
          </logo>
          <Link to="/mypage">mypage</Link>
        </navbar>
        {/* <Routes> */}
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/" element={<MainPageContent modalcontroller={modalcontroller}/>} />
        {/* </Routes> */}
      </mainpage>

      {/* 아래부터는 모달창 입니다 */}
      {modal ? <MainpageModal modalcontroller={modalcontroller}/> : <div></div>}
    </div>
  );
}

export default Main;
