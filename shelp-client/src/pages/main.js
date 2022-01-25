import { Route, Switch, Link, Routes } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Mypage from "./mypage.js";
import { AddItemModal } from "./modals.js";
const axios = require("axios").default;
const serverUrl = "https://randomdomain:4000";

// 조건에 따라 변하는 스타일만 styled component로 만들기

const Container = styled.div`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  min-height: 50rem;
  background-color: lightgrey;
  border: solid black 1px;
`;

const Navigator = styled.div`
  height: 3rem;
  display: flex;
  flex-direction: row;
  min-height: 0.5rem;
  background-color: salmon;
  border: solid black 1px;

  > div.logo {
    flex: 2 0 auto;
    border: solid black 1px;
  }

  > div.about {
    flex: 1 0 auto;
    border: solid black 1px;
    text-align: center;
  }

  > div.blank {
    flex: 20 0 auto;
    border: solid black 1px;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
  }

  > div.nav-button {
    flex: 1 0 auto;
    border: solid black 1px;
    text-align: center;
  }
`;

const Searchbar = styled.div`
  height: 3rem;
  display: flex;
  flex-direction: row;
  margin: 1.5rem;
  border: solid black 1px;
  border-radius: 2rem;
  text-align: justify;

  > input.text-area {
    flex: 8 0 auto;
    background-color: rgba(0, 0, 0, 0.1);
    border: solid black 1px;
  }
  > div.tabs {
    flex: 2 0 auto;
    display: flex;
    border: solid black 1px;
  }
`;

const Option = styled.div`
  flex: 1 0 auto;
  background-color: rgba(0, 0, 0, 0.3);
  border: solid red 1px;
  padding-top: 0.9rem;
  text-align: center;
`;

const Section = styled.div`
  flex: 1 0 auto;
  display: flex;
  background-color: skyblue;
  border: solid black 1px;
`;

const Friger = styled.div`
  background-color: whitesmoke;
  border: solid black 1px;
  border-radius: 0 2em 2em 0;
  margin: 1em 1em 1em 0;

  animation-name: ${(props) =>
    props.isFrigerOpen === true ? "slideout" : "slidein"};
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;

  @keyframes slidein {
    from {
      flex: 0.1 0 auto;
    }

    to {
      flex: 1 0 auto;
    }
  }

  @keyframes slideout {
    from {
      flex: 1 0 auto;
    }

    to {
      flex: 0.1 0 auto;
    }
  }

  > div.friger-onoff {
  }
  > div.friger-view {
  }
`;

const RecipeContainer = styled.div`
  flex: 2 0 auto;
  background-color: whitesmoke;
  border: solid black 1px;
`;

export function Main() {
  const [isFrigerOpen, setisFrigerOpen] = useState(false);

  const frigerHandler = () => {
    setisFrigerOpen(!isFrigerOpen);
    console.log(isFrigerOpen);
  };

  return (
    <div>
      <Container>
        <Navigator>
          <div className="logo">Logo</div>
          <div className="about">About</div>
          <div className="blank">--Blank--</div>
          <div className="nav-button">로그인</div>
          <div className="nav-button">회원가입</div>
        </Navigator>
        <Searchbar>
          <input
            className="text-area"
            placeholder="지금 바로 가능한 레시피 검색"
          />
          <div className="tabs">
            <Option>재료</Option>
            <Option>레시피</Option>
          </div>
        </Searchbar>
        <Section>
          <Friger isFrigerOpen={isFrigerOpen}>
            <div>ok</div>
            <button onClick={frigerHandler}>+</button>
          </Friger>
          <RecipeContainer></RecipeContainer>
        </Section>
      </Container>
    </div>
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
