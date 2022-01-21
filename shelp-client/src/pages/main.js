import { useState, useRef, useEffect } from "react";
import { Route, Switch, Link, Routes } from "react-router-dom";
import styled from "styled-components";
import Mypage from "./mypage.js";
import Modal from "./modals.js";
const axios = require('axios').default;

// 조건에 따라 변하는 스타일만 styled component로 만들기
export function Main() {
  let temp = 'apple';
  const [item, setItem] = useState(temp);
  const [exp, setExp] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [storage, setStorage] = useState(null);
  const [modal, setModal] = useState(false);
  const [recipes, setRecipes] = useState(null); //초기값은 데이터 없음 안내문구를 넣어줄 것

  const modalcontroller = () => {
    setModal(!modal);
  };

  const itemValueController = (e) => {
    // 모달창의 아이템 이름을 입력하면 입력한 이름으로 설정
    setItem(null);
  }

  const deleteButtonController = () => {
    axios.delete('http://localhost:4000/items/id');
    setModal(false);
  }

  const addItem = () => {

  } 
  
  const editItem = () => {

  }

  async function searchRecipe (el)  {
    const uerId = await axios.get(); // el 의 id를 찾기 위해서 서버에 요청
    const recipes = await axios.get(); // 위에서 찾은 id를 가지고 서버에 레시피 요청
    setRecipes(recipes.data[0]);
  }

  function MainContent() {
    return (
      <content className='mainpage-content'>
        <shelf className='mainpage-shelf'>
          <div className="searchArea">
            <input className="searchBar" />
            <input className="searchButton" type="button" />
          </div>
          <scrollbox className='mainpage-scrollbox'>
            <ul className="grocery">
              {/* props: expDate, name, quant, storage, desc */}
              <li>
                <iteminfo onClick={()=>{searchRecipe(item)}}>
                  <itemname>{item}</itemname>
                  <itemexp>{exp}</itemexp>
                  <itemquant>{quantity}</itemquant>
                  <itemstorage>{storage}</itemstorage>
                </iteminfo>
                <input
                  className="editButton"
                  type="button"
                  value="수정"
                  onClick={modalcontroller}
                />
              </li>
            </ul>
          </scrollbox>
          <input className="addButton" type="button" value="add item" onClick={modalcontroller} />
        </shelf>
        <recipes className='mainpage-recipes'>
          <ul>
            <li>
              <recipeimg></recipeimg>
              <recipename>{우유김치찌개}</recipename>
              <a href="https://www.dispatch.co.kr/2034029">
                delicious kimchichigae recipe
              </a>
            </li>
          </ul>
        </recipes>
      </content>
    );
  }

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
        <Routes>
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/" element={<MainContent />} />
        </Routes>
      </mainpage>

      {/* 아래부터는 모달창 입니다 */}
      {modal ? 
      <modal className="mainpage-modal">
        <options className='mainpage-options'>
        <input className="itemName" type="text" value={item} onClick={itemValueController}/>
        <input className="expDate" type="date" value={exp}/>
        <input className="quantity" type="number" value={quantity}/>
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
        </options>
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
            onClick={editItem}
        />
        <input
            className="deleteButton"
            type="button"
            value="delete"
            onClick={deleteButtonController}
        />
        </decisionbutton>
      </modal>: 
      <div></div>}
    </div>
  );
}

export default Main;
