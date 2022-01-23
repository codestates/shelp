import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
const serverUrl = "http://localhost:4000";

axios.defaults.withCredentials = true;

const ModalContainer = styled.div`
  height: 15rem;
  text-align: center;
  margin: 120px auto;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
`;

const ModalView = styled.div`
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.7);
  width: 300px;
  height: 500px;

  > span.close-btn {
    margin-top: 50%;
    cursor: pointer;
    color: grey;
  }

  > div.title {
    margin-top: 30px;
    color: blue;
  }

  > div.query {
    margin-top: 30px;
    color: red;
  }
`;

// ========================여기까지가 모달 공통 컴포넌트입니다.================================

export function LoginModal({ modalHandler, handleResponseSuccess }) {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] =
    useState("에러메시지가 여기 표시됩니다.");

  const handleInputValue = (e, key) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleLogin = () => {
    if (loginInfo.email.length === 0 || loginInfo.password.length === 0) {
      setErrorMessage("이메일과 비밀번호를 입력하세요");
    } else {
      axios.post(`${serverUrl}/user/signin`, loginInfo).then((res) => {
        if (res.status === 200) {
          console.log("=======>", res.data.data);
          handleResponseSuccess(res.data.data);
        }
      });
    }
  };

  return (
    <ModalContainer>
      <ModalBackdrop onClick={modalHandler}>
        <ModalView onClick={(e) => e.stopPropagation()}>
          <span className="close-btn" onClick={modalHandler}>
            close
          </span>
          <div className="title">로그인</div>
          <div>
            이메일 <input onChange={(e) => handleInputValue(e, "email")} />
          </div>
          <div>
            비밀번호
            <input
              onChange={(e) => handleInputValue(e, "password")}
              type="password"
            />
          </div>
          <div>{loginInfo.email}</div>
          <div>{loginInfo.password}</div>
          <div>{errorMessage}</div>
          <button onClick={handleLogin}>로그인</button>
          <div className="query">
            <Link to="/signup">회원가입</Link>
          </div>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}

export function AddItemModal({ modalHandler, items, setItems }) {
  // item: app.js에서 받아온 전체 목록, items: 모달에서 추가하는 품목 한 개의 속성
  const [item, setItem] = useState({
    name: "item-name-string",
    desc: "item-des-string",
    quantity: "item-quant-string",
    expiration: "item-exp-string",
    storage: "item-strg-string",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputValue = (e, key) => {
    setItem({ ...item, [key]: e.target.value });
  };

  const handleAdd = () => {
    if (item.name.length === 0) {
      return setErrorMessage("저장할 품목 이름이 있어야 합니다");
    } else {
      axios.post(`${serverUrl}/items`, item).then((res) => {
        setItems([...items, item]);
      });
    }
  };

  return (
    <ModalContainer>
      <ModalBackdrop onClick={modalHandler}>
        <ModalView onClick={(e) => e.stopPropagation()}>
          <span className="close-btn" onClick={modalHandler}>
            close
          </span>
          <div className="title">아이템 추가</div>
          <div>
            이름 <input onChange={(e) => handleInputValue(e, "name")} />
          </div>
          <div>
            설명
            <input onChange={(e) => handleInputValue(e, "desc")} />
          </div>
          <div>
            수량
            <input onChange={(e) => handleInputValue(e, "quantity")} />
          </div>
          <div>
            유통기한
            <input onChange={(e) => handleInputValue(e, "expiration")} />
          </div>
          <div>
            보관
            <input onChange={(e) => handleInputValue(e, "storage")} />
          </div>
          <div>{errorMessage}</div>
          <button>저장</button>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}
