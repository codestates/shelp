import { Route, Switch, Link, Routes, useNavigate } from "react-router-dom";
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
  width: 98vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  min-height: 50rem;
  margin-top: 5px;
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
    flex: 1 0 auto;
    display: flex;
  }
`;

const SearchButton = styled.div`
  flex: 1 0 auto;
  padding: 1rem 0;
  text-align: center;
  font-weight: bold;
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
  width: 50em;
  left: 0;
  top: 8.5em;
  height: 45em;
  background-color: white;
  border-radius: 0 0.5em 0.5em 0;
  box-shadow: 10px 5px 20px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;

  > div.friger-search-container {
    min-height: 100px;
    flex: row wrap;
    margin-bottom: 20px;

    > input.friger-search {
      position: absolute;
      right: 9.5em;
      top: 1.5em;
      width: 35.5rem;
      padding: 1em;
      border-radius: 2em;
      background: rgba(0, 0, 0, 0.05);
      border: solid lightgrey 1px;
      min-height: 35px;
      display: block;

      /* > input.text-area {
        border: none;
        border-radius: 2rem 0 0 2rem;
        padding-left: 1.5rem;
        flex: 8 0 auto;
      } */
    }

    > button.friger-onoff {
      position: relative;
      right: -42.5rem;
      top: 1.5em;
      width: 65px;
      min-height: 69px;
      margin: 3px;
      background-color: white;
      box-shadow: 0rem 0.5rem 1.5rem rgba(0, 0, 0, 0.5);
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
      background-color: rgba(0, 0, 0, 0.3);
      border: none;
      position: relative;
      bottom: 0;
      width: 69px;
      justify-content: center;
      align-items: center;
    }
  }

  > div.friger-item-container {
    height: auto;
    display: grid;
    flex-direction: column;
    overflow: auto;
    padding-left: 30px;
    padding-right: 10px;
    > div.friger-items {
      height: auto;
      display: flex;
      flex-direction: column;

      > div.friger-item {
        display: grid;
        grid-template-columns: 80px 200px 360px 30px;
        grid-template-rows: 1fr 1fr;
        row-gap: 10px;
        column-gap: 10px;
        height: 80px;
        margin: 0.7rem 0.7rem 0 0.7rem;
        padding: 5px;
        //border-radius: 0.5rem;
        border: solid black 0.1em;

        > div.item-name {
          //border: solid black 1px;
          //margin-top: auto;
          //margin-bottom: auto;
          //padding: 0 2em 0 1em;
          //border: solid black 1px;
          font-size: 1.3em;
          grid-column-start: 2;
          grid-column-end: 3;
          grid-row-start: 1;
          grid-row-end: 2;
          place-content: center;
          display: grid;
        }
        > div.item-quant {
          //border: solid black 1px;
          //flex: 1 0 auto;
          grid-column-start: 2;
          grid-column-end: 3;
          grid-row-start: 2;
          grid-row-end: 3;
          place-content: center;
          display: grid;
        }
        > button.item-edit {
          //border: solid black 1px;
          //flex: 1 0 auto;
          grid-column-start: 4;
          grid-column-end: 5;
          grid-row-start: 1;
          grid-row-end: 2;
          place-content: center;
          display: grid;
        }
        > div.item-expir {
          padding-right: 1em;
          //border: solid black 1px;
          text-align: right;
          grid-column-start: 3;
          grid-column-end: 4;
          grid-row-start: 1;
          grid-row-end: 2;
        }
        > div.item-remain {
          padding-right: 1em;
          //border: solid black 1px;
          text-align: right;
          grid-column-start: 3;
          grid-column-end: 4;
          grid-row-start: 2;
          grid-row-end: 3;
        }
        > div.item-storage {
          border: solid black 1px;
          border-radius: 5%;
          grid-column-start: 1;
          grid-column-end: 2;
          grid-row-start: 1;
          grid-row-end: 3;
          place-content: center;
          display: grid;
          margin: 5px;
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

const RecipeCard = styled.div`
  height: 400px;
  width: 300px;
  display: flex;
  flex-direction: column;
  margin: 0.25em;
  background-color: white;
  min-width: 300px;
  max-height: 300px;

  > a {
    width: auto;
    height: 75%;
    background-color: white;
    //margin: 0.05em;
    //text-alignposition: relative;

    > img {
      width: 100%;
      height: 100%;
      border: solid 1px white;
      border-radius: 0.5em;
    }
  }

  > div.typecontent {
    display: flex;

    > span.title {
      flex: 2.5 0 auto;
      margin-top: 0.5em;
      font-size: 1.2em;
      font-weight: bold;
      text-overflow: ellipsis;

      > text {
        max-height: 16%;
      }
    }

    > i {
      flex: 0.5 0 auto;
      color: grey;
      margin: 0.5em;
    }

    > span.hits {
      margin-top: 0.5em;
      text-align: right;
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
  const navigator = useNavigate();

  const getItems = async () => {
    axios
      .get(`${serverUrl}/items`, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((res) => {
        //console.log(res);
        setItems(res.data.data);
      });
  };

  const frigerHandler = () => {
    setisFrigerOpen(!isFrigerOpen);
    console.log(isFrigerOpen);
  };

  const getFilteredItems = (qry) => {
    console.log("1", qry);
    setItems(items.filter((itm) => itm.name.includes(qry) === true));
    console.log("2", qry);
    navigator("/");
    console.log("3", qry);
  };

  const getDday = (expirationDate) => {
    let today = new Date();
    let dday = new Date(expirationDate);
    const gap = dday.getTime() - today.getTime();
    let left = Math.ceil(gap / (1000 * 60 * 60 * 24));
    if (left < 0) {
      return [left, "일 지남"];
    } else if (left === 0) {
      return ["", `오늘까지`];
    } else {
      return [left, "일 남음"];
    }
  };

  const modalHandler = (e, index) => {
    if (e === "edit") {
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
            onChange={(e) => getFilteredItems(e.target.value)}
          ></input>
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
                <div className="friger-item">
                  <button
                    className="item-name"
                    onClick={() => searchRecipe(item.name)}
                  >
                    {item.name}
                  </button>
                  <div className="item-quant">{item.quantity}</div>
                  <button
                    className="item-edit"
                    onClick={() => modalHandler("edit", index)}
                  />
                  <div className="item-expir">~ {item.expiration}</div>
                  <div className="item-remain" date={getDday(item.expiration)}>
                    {getDday(item.expiration)[0]}
                    {getDday(item.expiration)[1]}
                  </div>
                  <div className="item-storage">{item.storage}</div>
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
      <SortOpt onClick={sortRecipes}>추천순</SortOpt>
      <Section>
        <RecipeContainer>
          {recipes.map((recp) => {
            //console.log(recp);
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
