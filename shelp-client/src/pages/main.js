import { useState, useRef, useEffect } from "react";
import { Route, Switch, Link, Routes } from "react-router-dom";
import styled from "styled-components";
// import { MainpageModal } from "../components/mainpage-modal.js";
import {AddItemModal} from "./modals.js";
const axios = require('axios').default;

// 조건에 따라 변하는 스타일만 styled component로 만들기
export function Main() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState({
    data: [
      {
        id: 0,
        userId: 0,
        name: "mountainDew",
        desc: "어제 편의점에서 사옴",
        quantity: 1,
        expiration: "2022-9-23",
        storage: "냉장",
        createdAt: "2022-1-24",
        updatedAt: "2022-1-24",
      },
      {
        id: 1,
        userId: 0,
        name: "curstardSeaweedSoup",
        desc: "어제 편의점에서 사옴",
        quantity: 1,
        expiration: "2022-6-12",
        storage: "냉장",
        createdAt: "2022-1-24",
        updatedAt: "2022-1-24",
      }
    ]
  });

  const modalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
    <mainpage className="mainpage" onClick={isModalOpen ? modalHandler : null}>

      {/* ////////////////////  NAVBAR  /////////////////////////////// */}
      <navbar className="mainpage-navbar">
        <nav></nav>
        <logo className="shelpLogo">
          <Link to="/">shelp</Link>
        </logo>
        <Link to="/mypage">mypage</Link>
      </navbar>
      {/* ////////////////////  NAVBAR  /////////////////////////////// */}

      {/* ////////////////////  MAINCONTENT  ////////////////////////// */}
      <content className='mainpage-content'>
        <shelf className='mainpage-shelf'>
          <div className="searchArea">
          <input className="searchBar" />
          <input className="searchButton" type="button" />
          </div>
            <scrollbox className='mainpage-scrollbox'>
              <ul className="grocery">
                {
                  items.data.map((item, index) => {
                    return (
                      <li>
                      <iteminfo>
                        <itemname>{item.name}</itemname>
                        <itemexp>{item.expiration}</itemexp>
                        <itemquant>{item.quantity}</itemquant>
                        <itemstorage>{item.storage}</itemstorage>
                      </iteminfo>
                      <input
                        className="editButton"
                        type="button"
                        value="수정"
                        onClick={modalHandler}
                        />
                    </li>
                    )
                  })
                }
              </ul>
            </scrollbox>
          <input className="addButton" type="button" value="add item" onClick={modalHandler} />
        </shelf>
        <recipes className='mainpage-recipes'>
          <ul>
            <li>
              <recipeimg></recipeimg>
              <recipename>우유김치찌개</recipename>
              <a href="https://www.dispatch.co.kr/2034029">
              delicious kimchichigae recipe
              </a>
            </li>
          </ul>
        </recipes>
      </content>
      {/* ////////////////////  MAINCONTENT  ////////////////////////// */}
    </mainpage>

    {/* 아래부터는 모달창 입니다 */}
    {isModalOpen ? (
      <AddItemModal modalHandler={modalHandler} items={items} setItems={setItems}/>
    ) : (
      <div></div>
    )}
  </div>
  );
}

export default Main;
