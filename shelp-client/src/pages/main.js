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
  background-color: white;
  border-top: solid lightgrey 1px;
`;

const Friger = styled.div`
  z-index: 900;
  position: absolute;
  width: 30em;
  left: 0;
  top: 9.5em;
  height: 32em;
  background-color: white;
  border-radius: 0 0.5em 0.5em 0;
  box-shadow: 10px 5px 20px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;

  > button.friger-onoff {
    position: relative;
    right: -31em;
    width: 3em;
    height: 3em;
    margin: 1em;
    background-color: white;
    border-style: hidden;
    border-radius: 1.5em;
    box-shadow: 10px 5px 20px rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
  > button.add-item {
    height: 15%;
    margin: 0 0.7rem 0.7rem 0.7rem;
    border-radius: 0.5rem;
    background-color: rgba(0, 0, 0, 0.3);
    border: none;
    position: relative;
    bottom: 0;
  }

  > div.friger-item {
    height: 15%;
    margin: 0 0.7rem 0.7rem 0.7rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;

    > div.item-sec-upper {
      flex: 3 0 auto;
      display: flex;

      > div.item-name {
        border: solid black 1px;
        margin-top: auto;
        margin-bottom: auto;
        padding: 0 2em 0 1em;
        border: solid black 1px;
        font-size: 1.3em;
      }
      > div.item-quant {
        border: solid black 1px;
        flex: 1 0 auto;
      }
      > div.item-expir {
        padding-right: 1em;
        border: solid black 1px;
      }
    }
    > div.item-sec-lower {
      flex: 2 0 auto;
      display: flex;
      > div.item-desc {
        flex: 1 0 auto;
        border: solid black 1px;
      }
      > div.item-storage {
        border: solid black 1px;
      }
    }
  }

  /* animation-name: ${(props) =>
    props.isFrigerOpen ? "slideout" : "slidein"}; */
  animation-name: ${(props) => {
    if (props.isFrigerOpen !== null && props.isFrigerOpen === true) {
      return "slidein";
    } else if (props.isFrigerOpen !== null && props.isFrigerOpen === false) {
      return "slideout";
    }
  }};
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;

  @keyframes slidein {
    from {
      left: 0;
    }
    to {
      left: -26em;
    }
  }

  @keyframes slideout {
    from {
      left: -26em;
    }

    to {
      left: 0em;
    }
  }

  > button.friger-onoff {
    position: relative;
    right: -26rem;
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

  const getItems = async () => {
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
  };

  const modalHandler = (e, el) => {
    if (e === "edit") {
      setIsModalOpen("edit");
    }
    if (e === "add") {
      setIsModalOpen("add");
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
    getItems();
  }, []);

  return (
    <Container>
      <Friger isFrigerOpen={isFrigerOpen}>
        <button onClick={frigerHandler} className="friger-onoff">
          {isFrigerOpen ? (
            <i class="fas fa-angle-right"></i>
          ) : (
            <i class="fas fa-angle-left"></i>
          )}
        </button>
        {items.map((item) => {
          return (
            <div className="friger-item">
              <div className="item-sec-upper">
                <div className="item-name">{item.name}</div>
                <div className="item-quant">{item.quantity}</div>
                <div className="item-expir">~ {item.expiration}</div>
              </div>
              <div className="item-sec-lower">
                <div className="item-desc">{item.desc}</div>
                <div className="item-storage">{item.storage}</div>
              </div>
            </div>
          );
        })}
        <button className="add-item" onClick={() => modalHandler("add")}>
          ADD
        </button>
      </Friger>
      <Navigationbar isLogin={isLogin} />
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
        <RecipeContainer>
          <RecipeCard>card1</RecipeCard>
          <RecipeCard>card2</RecipeCard>
        </RecipeContainer>
      </Section>
      {isModalOpen === "add" ? (
        <AddItemModal
          modalHandler={modalHandler}
          items={items}
          setItems={setItems}
        />
      ) : (
        <div></div>
      )}
      {isModalOpen === "edit" ? (
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
