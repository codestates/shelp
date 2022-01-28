import { Route, Switch, Link, Routes, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import Mypage from "./mypage.js";
import { AddItemModal, EditItemModal } from "./modals.js";
import Navigationbar from "../components/navigationbar.js";
const axios = require("axios").default;
const serverUrl = "http://localhost:4000";
axios.defaults.withCredentials = true;

const Container = styled.div`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  min-height: 50rem;
  margin-top: 5px;
  background-color: white;
`;

const Searchbar = styled.div`
  height: 3rem;
  margin: 1.5rem;
  border: solid lightgrey 1px;
  border-radius: 2rem;
  text-align: justify;
  display: flex;
  flex-direction: row;

  > input.text-area {
    flex: 8 0 auto;
    border: none;
    border-radius: 2rem 0 0 2rem;
    padding-left: 1.5rem;
    background-color: rgba(0, 0, 0, 0.05);
  }
  > div.tabs {
    flex: 1 0 auto;
    background-color: rgba(92, 201, 165, 0.5);
    overflow: hidden;
    border-radius: 0 2rem 2rem 0;
  }
`;

const SearchButton = styled.div`
  flex: 1 0 auto;
  padding: 1rem 0;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
`;

const SortOpt = styled.div`
  height: 2rem;
  margin-right: 3rem;
  margin-bottom: 0.4rem;
  text-align: right;
  cursor: pointer;
`;

const Section = styled.div`
  flex: 1 0 auto;
  display: flex;
  background-color: white;
  border-top: solid lightgrey 1px;
`;

const Friger = styled.div`
  z-index: 800;
  position: absolute;
  width: 46em;
  left: 0;
  top: 10.5em;
  height: 38em;
  background-color: white;
  border-radius: 0 0.5em 0.5em 0;
  box-shadow: 10px 5px 20px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;

  > div.friger-search-container {
    height: 2rem;
    margin: 1.5rem 2rem 1rem 2rem;
    text-align: justify;
    display: flex;

    > input.friger-search {
      flex: 3 0 auto;
      border: none;
      border-radius: 1rem 0 0 1rem;
      border: solid lightgrey 1px;
      border-radius: 1rem 0 0 1rem;
      background-color: rgba(0, 0, 0, 0.05);
    }

    > div.friger-search {
      flex: 1 0 auto;
      margin-right: 4rem;
      border: solid lightgrey 1px;
      border-radius: 0 1rem 1rem 0;
      border-left: 0;
      color: grey;
      text-align: center;
      padding-top: 0.3em;
      color: rgba(0, 0, 0, 0.6);
      background-color: rgba(92, 201, 165, 0.5);
      cursor: pointer;
    }

    > button.friger-onoff {
      width: 2rem;
      height: 2rem;
      background-color: white;
      box-shadow: 0rem 0.5rem 1.5rem rgba(0, 0, 0, 0.4);
      border-style: hidden;
      border-radius: 1.5em;
      cursor: pointer;
    }
  }

  > div.add-item-container {
    min-height: 79px;
    padding: 5px;
    display: grid;
    place-content: center;

    > button.add-item {
      height: 69px;
      border-radius: 50%;
      border: none;
      position: relative;
      bottom: 0;
      width: 69px;
      align-items: center;
      font-size: 1.5em;
      color: rgba(0, 0, 0, 0.6);
      background-color: rgba(92, 201, 165, 0.7);
      cursor: pointer;
    }
  }

  > div.friger-item-container {
    width: 43em;
    height: auto;
    display: grid;
    flex-direction: column;
    overflow: auto;
    margin-left: 2rem;
    padding-right: 10px;
    padding-bottom: 1em;

    > div.friger-items {
      height: auto;
      display: flex;
      flex-direction: column;

      > div.friger-item {
        display: grid;
        grid-template-columns: 80px 140px 60px 295px 40px;
        grid-template-rows: 1fr 1fr;
        row-gap: 10px;
        column-gap: 10px;
        height: 80px;
        margin: 0.7rem 0.7rem 0 0;
        padding: 5px 5px 5px 0;
        border-radius: 0.5rem;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
        align-items: center;
        cursor: pointer;

        > button.item-name {
          height: 100%;
          font-size: 1em;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.6);
          grid-column-start: 2;
          grid-column-end: 3;
          grid-row-start: 1;
          grid-row-end: 3;
          place-content: center;
          border: none;
          background-color: white;
          /* display: grid; */
        }
        > div.item-quant-index {
          grid-column-start: 3;
          grid-column-end: 4;
          grid-row-start: 1;
          grid-row-end: 2;
          place-content: center;
          display: grid;
        }
        > div.item-quant {
          grid-column-start: 3;
          grid-column-end: 4;
          grid-row-start: 2;
          grid-row-end: 3;
          place-content: center;
          display: grid;
          font-weight: bold;
          padding-bottom: 0.7em;
        }
        > button.item-edit {
          //border: solid black 1px;
          //flex: 1 0 auto;
          z-index: 900;
          height: 3em;
          grid-column-start: 5;
          grid-column-end: 6;
          grid-row-start: 1;
          grid-row-end: 3;
          place-content: center;
          display: grid;
          border: none;
          border-radius: 0.8em;
          background-color: rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }
        > div.item-expir {
          padding-right: 1em;
          //border: solid black 1px;
          grid-column-start: 4;
          grid-column-end: 5;
          grid-row-start: 1;
          grid-row-end: 2;
          text-align: center;

          //text-align: center;
        }
        > div.item-remain {
          text-align: right;
          grid-column-start: 4;
          grid-column-end: 5;
          grid-row-start: 2;
          grid-row-end: 3;
          text-align: center;
          font-weight: bold;
          padding-bottom: 0.7em;
        }
        > div.item-storage {
          height: 100%;
          border-radius: 5%;
          grid-column-start: 1;
          grid-column-end: 2;
          grid-row-start: 1;
          grid-row-end: 3;
          place-content: center;
          display: grid;
          margin: 5px;
          //box-shadow: rgba(255, 255, 255, 1) 3px 3px 10px inset;
        }
      }
    }
  }

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
      left: -40em;
    }
  }

  @keyframes slideout {
    from {
      left: -40em;
    }
    to {
      left: 0em;
    }
  }
`;

const RecipeContainer = styled.div`
  width: 100%;
  margin: 1em;
  margin-left: 9.25em;
  background-color: white;
  padding: 1.25em;
  display: flex;
  flex-flow: row wrap;
  align-content: start;
  //justify-content: space-around;
`;

const ColorTag = styled.div`
  background-color: ${(props) => {
    if (props.storage === "냉동") {
      return "rgb(95, 157, 241)";
    } else if (props.storage === "냉장") {
      return "rgb(139, 224, 207)";
    } else {
      return "rgb(255, 204, 102)";
    }
  }};
  text-align: center;
  position: relative;
  min-height: 100%;
`;

const ColorText = styled.div`
  color: ${(props) => {
    if (props.date[0] < 0) {
      return "red";
    } else if (props.date[0] > 0) {
      return "green";
    } else {
      return "orange";
    }
  }};
`;

const RecipeCard = styled.div`
  height: 400px;
  width: 300px;
  display: flex;
  flex-direction: column;
  margin: 0.5em;
  background-color: white;
  min-width: 300px;
  max-height: 300px;

  > a {
    width: auto;
    height: 75%;
    background-color: white;
    margin: 0.05em;
    //text-alignposition: relative;

    > img {
      width: 100%;
      height: 100%;
      border-radius: 0.25em;
    }

    > img:focus {
      background: rgba(0, 0, 0, 0.5);
    }
  }

  > div.typecontent {
    display: flex;

    > span.title {
      flex: 2.5 0 auto;
      margin: 0.4em;
      font-size: 1.1em;
      font-weight: bold;
      text-overflow: ellipsis;

      > text {
        max-height: 16%;
      }
    }

    > i {
      color: grey;
      margin: 0.4em 0.4em 0 0;
      align-content: right;
    }

    > span.hits {
      width: auto;
      margin: 0.3em;
      margin-left: 0;
      color: grey;
    }
  }
`;

// ===================================================================

export function Main({ isLogin, userinfo }) {
  const [isModalOpen, setIsModalOpen] = useState("");
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [isFrigerOpen, setisFrigerOpen] = useState(null);
  const [queryRecipe, setQueryRecipe] = useState("");
  const [queryitem, setQueryitem] = useState("");
  const navigator = useNavigate();

  const getItems = async () => {
    axios
      .get(`${serverUrl}/items`, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((res) => {
        setItems(res.data.data);
      });
  };

  const frigerHandler = () => {
    setisFrigerOpen(!isFrigerOpen);
  };

  const getFilteredItems = () => {
    if (queryitem !== "") {
      setItems(items.filter((item) => item.name.includes(queryitem)));
    } else {
      getItems();
      navigator("/");
    }
  };

  const getDday = (expirationDate) => {
    let today = new Date();
    let dday = new Date(expirationDate);
    const gap = dday.getTime() - today.getTime();
    let left = Math.ceil(gap / (1000 * 60 * 60 * 24));
    if (left < 0) {
      return [-1, -left, "일 지남"];
    } else if (left === 0) {
      return [0, "", `오늘까지`];
    } else {
      return [1, left, "일 남음"];
    }
  };

  const modalHandler = (e, index, event) => {
    if (e === "edit") {
      event.stopPropagation();
      setIsModalOpen("edit");
    }
    if (e === "add") {
      setIsModalOpen("add");
    }
    if (e == "close") {
      setIsModalOpen("");
    }
    if (index >= 0) {
      setIndex(index);
    }
    // setIsModalOpen(!isModalOpen);
  };

  const searchRecipe = (name) => {
    // 크롤링 함수
    if (name === undefined || name === "") {
      axios.get(`${serverUrl}/recipe`).then((res) => {
        setRecipes(res.data.data);
      });
    } else {
      axios.get(`${serverUrl}/recipe/${name}`).then((res) => {
        setRecipes(res.data.data);
      });
    }
  };

  const handleSearchInput = (e) => {
    setQueryRecipe(e.target.value);
  };

  const sortRecipes = () => {
    const result = recipes.sort((a, b) => {
      let aHits = 0;
      let bHits = 0;
      if (a.hits.includes("만")) {
        aHits = Number(a.hits.slice(0, -1)) * 10000;
      } else if (a.hits.includes(",")) {
        aHits = Number(a.hits.split(",").join(""));
      } else {
        aHits = Number(a.hits);
      }

      if (b.hits.includes("만")) {
        bHits = Number(b.hits.slice(0, -1)) * 10000;
      } else if (b.hits.includes(",")) {
        bHits = Number(b.hits.split(",").join(""));
      } else {
        bHits = Number(b.hits);
      }

      return bHits - aHits;
    });
    setRecipes(result);
    navigator("/");
  };

  useEffect(() => {
    getItems();
    searchRecipe();
  }, []);

  return (
    <Container>
      <Friger isFrigerOpen={isFrigerOpen}>
        <div className="friger-search-container">
          <input
            className="friger-search"
            onChange={(e) => setQueryitem(e.target.value)}
          />
          <div className="friger-search" onClick={() => getFilteredItems()}>
            검색
          </div>
          <button onClick={frigerHandler} className="friger-onoff">
            {isFrigerOpen ? (
              <i class="fas fa-angle-right"></i>
            ) : (
              <i class="fas fa-angle-left"></i>
            )}
          </button>
        </div>
        <div className="friger-item-container">
          <div className="friger-items">
            {items.map((item, index) => {
              return (
                <div
                  className="friger-item"
                  //onClick={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    searchRecipe(item.name);
                  }}
                >
                  <button className="item-name">{item.name}</button>
                  <ColorTag storage={item.storage} className="item-storage">
                    {item.storage}
                  </ColorTag>
                  <div className="item-quant-index">수량</div>
                  <div className="item-quant">{item.quantity}</div>
                  <button
                    className="item-edit"
                    onClick={(e) => modalHandler("edit", index, e)}
                  >
                    <i class="fas fa-pen"></i>
                  </button>
                  <div className="item-expir">~ {item.expiration}</div>
                  <div className="item-remain">
                    <ColorText date={getDday(item.expiration)}>
                      {getDday(item.expiration)[1]}
                      {getDday(item.expiration)[2]}
                    </ColorText>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="add-item-container">
          <button className="add-item" onClick={() => modalHandler("add")}>
            +
          </button>
        </div>
      </Friger>
      <Navigationbar isLogin={isLogin} />
      <Searchbar>
        <input
          className="text-area"
          placeholder="지금 바로 가능한 레시피 검색"
          onChange={(e) => handleSearchInput(e)}
        />
        <div className="tabs">
          <SearchButton
            onClick={() => {
              searchRecipe(queryRecipe);
            }}
          >
            검색
          </SearchButton>
        </div>
      </Searchbar>
      <SortOpt onClick={sortRecipes}>정렬</SortOpt>
      <Section>
        <RecipeContainer>
          {recipes.map((recp) => {
            return (
              <RecipeCard>
                <a href={recp.url} target="_blank">
                  <img src={recp.image} />
                </a>
                <div className="typecontent">
                  <span className="title">
                    {recp.name.length > 14
                      ? recp.name.slice(0, 14) + " ..."
                      : recp.name}
                  </span>
                  <i class="fas fa-thumbs-up"></i>
                  <span className="hits">{recp.hits}</span>
                </div>
              </RecipeCard>
            );
          })}
        </RecipeContainer>
        {/* <div>
          <button onClick={() => modalHandler("추가", 1)}>추가</button>
          <button onClick={() => modalHandler("수정", 0)}>수정</button>
        </div> */}
      </Section>
      {isModalOpen === "add" ? (
        <AddItemModal
          userinfo={userinfo}
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
