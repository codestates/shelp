import { Route, Switch, Link, Routes } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Mypage from "./mypage.js";
import { MainpageModal } from "../components/mainpage-modal.js";
import { MainPageContent } from "../components/mainpage-content.js";
import { AddItemModal } from "./modals.js";
const axios = require("axios").default;
const serverUrl = "https://randomdomain:4000";

// 조건에 따라 변하는 스타일만 styled component로 만들기

export function Main() {
  const [items, setItems] = useState([]); // 유저의 모든 품목 리스트
  const [isModalOpen, SetIsModalOpen] = useState(false);

  const modalHandler = () => {
    SetIsModalOpen(!isModalOpen);
  };

  const getItems = () => {
    axios.get(`${serverUrl}/items`).then((res) => {
      setItems(res.body.data);
    });
  };

  useEffect(() => {
    //getItems();
  }, []);

  return (
    <div>
      {isModalOpen ? (
        <div>
          <AddItemModal modalHandler={modalHandler} />
        </div>
      ) : null}
      <button onClick={modalHandler}>modal open/close</button>
      <div>{isModalOpen}</div>
      <div>test</div>
    </div>
  );
}

export default Main;
