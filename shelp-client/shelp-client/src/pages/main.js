import { Route, Switch, Link, Routes } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Mypage from "./mypage.js";
import { AddItemModal, EditItemModal } from "./modals.js";
import Navigationbar from "../components/navigationbar.js";
const axios = require("axios").default;
const serverUrl = "http://localhost:4000";
axios.defaults.withCredentials = true;

const dummyCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const Container = styled.div`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  min-height: 50rem;
  background-color: white;
`;

const Searchbar = styled.div`
  height: 3rem;
  display: flex;
  flex-direction: row;
  margin: 1.5rem;
  border: solid lightgrey 1px;
  border-radius: 2rem;
  text-align: justify;

  > input.text-area {
    border: none;
    border-radius: 2rem 0 0 2rem;
    padding-left: 1.5rem;
    flex: 8 0 auto;
    background-color: rgba(0, 0, 0, 0.05);
  }
  > div.tabs {
    flex: 2 0 auto;
    display: flex;
  }
`;

const SearchOpt = styled.div`
  flex: 1 0 auto;
  padding-top: 0.9rem;
  text-align: center;
`;

const SortOpt = styled.div`
  height: 2rem;
  margin-right: 3rem;
  margin-bottom: 0.4rem;
  text-align: right;
`;

const Section = styled.div`
  flex: 1 0 auto;
  display: flex;
  background-color: skyblue;
  border: solid black 1px;
`;

const Friger = styled.div`
  z-index: 900;
  position: absolute;
  left: 0;
  top: 9.5em;
  height: 32em;
  background-color: white;
  border-radius: 0 0.5em 0.5em 0;
  box-shadow: 10px 5px 20px rgba(0, 0, 0, 0.5);

  animation-name: ${(props) =>
    props.isFrigerOpen === true ? "slideout" : "slidein"};
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;

  @keyframes slidein {
    from {
      width: 2em;
    }

    to {
      width: 30em;
    }
  }

  @keyframes slideout {
    from {
      width: 30em;
    }

    to {
      width: 2em;
    }
  }

  > button.friger-onoff {
    position: relative;
    right: 0rem;
    width: 3em;
    height: 3em;
    margin: 1em;
    background-color: white;
    box-shadow: 0rem 0.5rem 1.5rem rgba(0, 0, 0, 0.5);
    border-style: hidden;
    border-radius: 1.5em;
    cursor: pointer;
  }
  > div.friger-view {
  }
`;

const RecipeContainer = styled.div`
  width: vw;
  background-color: lightgrey;
  border: solid black 1px;
  padding: 0.125em;
  display: flex;
  flex-flow: row wrap;
  align-items: left;
  justify-content: space-around;
`;

const RecipeCard = styled.div`
  width: 15em;
  flex: 1 0 auto;
  margin: 0.25em;
  background-color: rgba(0, 0, 0, 0.2);
  border: solid grey 1px;
`;

// ===================================================================

export function Main({ isLogin, userinfo }) {
  const [isModalOpen, setIsModalOpen] = useState("");
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [isFrigerOpen, setisFrigerOpen] = useState(null);

  const userItemInfo = async () => {
    axios
      .get(`${serverUrl}/items`, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.data);
        setItems(res.data.data);
      });
  };

  const frigerHandler = () => {
    setisFrigerOpen(!isFrigerOpen);
    console.log(isFrigerOpen);
  };

  const modalHandler = (e, el) => {
    if (e === "수정") {
      setIsModalOpen("수정");
    }
    if (e === "추가") {
      setIsModalOpen("추가");
    }
    if (e == "close") {
      setIsModalOpen("");
    }
    if (el >= 0) {
      setIndex(el);
    }
    // setIsModalOpen(!isModalOpen);
  };

  const searchRecipe = (e) => {
    // 크롤링 함수(items[e].name)
    axios.get(`${serverUrl}/${items[e].id}`).then((res) => {
      console.log(`crawling data = ${res}`);
    });
  };

  useEffect(() => {
    // getItems();
    userItemInfo();
  }, []);

  return (
    <Container>
      <Friger isFrigerOpen={isFrigerOpen}>
        <button onClick={frigerHandler} className="friger-onoff">
          +
        </button>
        <div>test</div>
      </Friger>
      <Navigationbar/>
      <Searchbar>
        <input
          className="text-area"
          placeholder="지금 바로 가능한 레시피 검색"
        />
        <div className="tabs">
          <SearchOpt>재료</SearchOpt>
          <SearchOpt>레시피</SearchOpt>
        </div>
      </Searchbar>
      <SortOpt>추천순</SortOpt>
      <Section>
        {/* <Friger isFrigerOpen={isFrigerOpen}>
          <button onClick={frigerHandler} className="friger-onoff">
            +
          </button>
        </Friger> */}
        <RecipeContainer>
          <RecipeCard>card1</RecipeCard>
          <RecipeCard>card2</RecipeCard>
        </RecipeContainer>
      </Section>
      {isModalOpen === "추가" ? (
        <AddItemModal
          modalHandler={modalHandler}
          items={items}
          setItems={setItems}
        />
      ) : (
        <div></div>
      )}
      {isModalOpen === "수정" ? (
        <EditItemModal
          index={index}
          modalHandler={modalHandler}
          items={items}
          setItems={setItems}
        />
      ) : (
        <div></div>
      )}
    </Container>
  );
}

export default Main;