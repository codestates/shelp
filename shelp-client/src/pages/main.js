import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Mypage from "./mypage.js";
import Navigationbar from "../components/navigationbar.js";
import { AddItemModal } from "./modals.js";

// const dummyCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

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
  margin-bottom: 0.5rem;
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
  top: 10em;
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
  flex: 10 0 auto;
  background-color: peachpuff;
  border: solid black 1px;
  display: flex;
  flex-flow: row wrap;
  //justify-content: space-evenly;
`;

const RecipeCard = styled.div`
  width: 25em;
  height: 15em;
  background-color: rgba(0, 0, 0, 0.5);
  border: solid grey 1px;
`;

// ===================================================================

export function Main({ isLogin }) {
  const [isFrigerOpen, setisFrigerOpen] = useState(false);

  const frigerHandler = () => {
    setisFrigerOpen(!isFrigerOpen);
    console.log(isFrigerOpen);
  };

  return (
    <Container>
      <Friger isFrigerOpen={isFrigerOpen}>
        <button onClick={frigerHandler} className="friger-onoff">
          +
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
    </Container>
  );
}

export default Main;

// export function Main() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [items, setItems] = useState({
//     data: [
//       {
//         id: 0,
//         userId: 0,
//         name: "mountainDew",
//         desc: "어제 편의점에서 사옴",
//         quantity: 1,
//         expiration: "2022-9-23",
//         storage: "냉장",
//         createdAt: "2022-1-24",
//         updatedAt: "2022-1-24",
//       },
//       {
//         id: 1,
//         userId: 0,
//         name: "curstardSeaweedSoup",
//         desc: "어제 편의점에서 사옴",
//         quantity: 1,
//         expiration: "2022-6-12",
//         storage: "냉장",
//         createdAt: "2022-1-24",
//         updatedAt: "2022-1-24",
//       },
//     ],
//   });

//   const modalHandler = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   const getItems = () => {
//     axios.get(`${serverUrl}/items`).then((res) => {
//       setItems(res.body.data);
//     });
//   };

//   useEffect(() => {
//     //getItems();
//   }, []);

//   return (
//     <div>
//       <mainpage
//         className="mainpage"
//         onClick={isModalOpen ? modalHandler : null}
//       >
//         {/* ////////////////////  NAVBAR  /////////////////////////////// */}
//         <navbar className="mainpage-navbar">
//           <nav></nav>
//           <logo className="shelpLogo">
//             <Link to="/">shelp</Link>
//           </logo>
//           <Link to="/mypage">mypage</Link>
//         </navbar>
//         {/* ////////////////////  NAVBAR  /////////////////////////////// */}

//         {/* ////////////////////  MAINCONTENT  ////////////////////////// */}
//         <content className="mainpage-content">
//           <shelf className="mainpage-shelf">
//             <div className="searchArea">
//               <input className="searchBar" />
//               <input className="searchButton" type="button" />
//             </div>
//             <scrollbox className="mainpage-scrollbox">
//               <ul className="grocery">
//                 {items.data.map((item, index) => {
//                   return (
//                     <li>
//                       <iteminfo>
//                         <itemname>{item.name}</itemname>
//                         <itemexp>{item.expiration}</itemexp>
//                         <itemquant>{item.quantity}</itemquant>
//                         <itemstorage>{item.storage}</itemstorage>
//                       </iteminfo>
//                       <input
//                         className="editButton"
//                         type="button"
//                         value="수정"
//                         onClick={modalHandler}
//                       />
//                     </li>
//                   );
//                 })}
//               </ul>
//             </scrollbox>
//             <input
//               className="addButton"
//               type="button"
//               value="add item"
//               onClick={modalHandler}
//             />
//           </shelf>
//           <recipes className="mainpage-recipes">
//             <ul>
//               <li>
//                 <recipeimg></recipeimg>
//                 <recipename>우유김치찌개</recipename>
//                 <a href="https://www.dispatch.co.kr/2034029">
//                   delicious kimchichigae recipe
//                 </a>
//               </li>
//             </ul>
//           </recipes>
//         </content>
//         {/* ////////////////////  MAINCONTENT  ////////////////////////// */}
//       </mainpage>

//       {/* 아래부터는 모달창 입니다 */}
//       {isModalOpen ? (
//         <AddItemModal
//           modalHandler={modalHandler}
//           items={items}
//           setItems={setItems}
//         />
//       ) : (
//         <div></div>
//       )}
//     </div>
//   );
// }

// export default Main;
