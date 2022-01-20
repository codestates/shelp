import { useState, useRef, useEffect } from "react";
import { Route, Switch, Link, Routes } from "react-router-dom";
import styled from "styled-components";
import Mypage from "./mypage.js";
// 조건에 따라 변하는 스타일만 styled component로 만들기
export function Main() {
  const Mainpage = styled.div`
    background-color: #f5f5f5;
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
  const Navbar = styled.div`
    background-color: #cee6f5;
    height: 50px;
    width: 100rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  `;
  const Content = styled.div`
    background-color: whitesmoke;
    height: 90%;
    width: 100rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  `;
  const Shelf = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  `;
  const Recipes = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  `;
  const Modal = styled.div`
    background-color: slategrey;
    height: 300px;
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  `;
  const Options = styled.div`
    height: 12em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  `;
  const ScrollBox = styled.div`
    /* overflow: scroll; */
  `;

  const [modal, setModal] = useState(false);

  const modalcontroller = () => {
    setModal(!modal);
  };

  function MainContent() {
    return (
      <Content>
        <Shelf>
          <div className="searchArea">
            <input className="searchBar" />
            <input className="searchButton" type="button" />
          </div>
          <ScrollBox>
            <ul className="grocery">
              {/* props: expDate, name, quant, storage, desc */}
              <li>
                <itemname>서울우유</itemname>
                <itemexp>2022-02-01</itemexp>
                <itemquant>2</itemquant>
                <itemstorage>냉장</itemstorage>
                <input
                  className="editButton"
                  type="button"
                  value="수정"
                  onClick={modalcontroller}
                />
              </li>
            </ul>
          </ScrollBox>
          <input className="addButton" type="button" value="add item" />
        </Shelf>
        <Recipes>
          <ul>
            <li>
              <recipeimg></recipeimg>
              <recipename>우유김치찌개</recipename>
              <a href="https://www.dispatch.co.kr/2034029">
                delicious kimchichigae recipe
              </a>
            </li>
          </ul>
        </Recipes>
      </Content>
    );
  }

  return (
    <div>
      <Mainpage onClick={modal ? modalcontroller : null}>
        <Navbar>
          <nav></nav>
          <logo className="shelpLogo">
            <Link to="/">shelp</Link>
          </logo>
          <Link to="/mypage">mypage</Link>
        </Navbar>
        <Routes>
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/" element={<MainContent />} />
        </Routes>
      </Mainpage>

      {/* 아래부터는 모달창 입니다 */}
      {modal ? (
        <Modal className="modalPage hide">
          <Options>
            <input className="itemName" type="text" />
            <input className="expDate" type="date" />
            <input className="quantity" type="number" />
            <div className="options">
              <input
                className="option1"
                type="radio"
                name="storage"
                value="상온"
              />
              <input
                className="option2"
                type="radio"
                name="storage"
                value="냉장"
              />
              <input
                className="option3"
                type="radio"
                name="storage"
                value="냉동"
              />
            </div>
          </Options>
          <decisionbutton>
            <input
              className="cancelButton"
              type="button"
              value="cancel"
              onClick={modalcontroller}
            />
            <input
              className="doneButton"
              type="button"
              value="done"
              onClick={modalcontroller}
            />
            <input
              className="deleteButton"
              type="button"
              value="delete"
              onClick={modalcontroller}
            />
          </decisionbutton>
        </Modal>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Main;
