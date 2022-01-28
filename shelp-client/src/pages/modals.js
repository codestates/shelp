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
  border-radius: 2em;
  background-color: white;
  padding: 2em 4em;
  width: 18rem;
  height: 30rem;
  display: flex;
  flex-direction: column;

  > div.title {
    color: rgba(92, 201, 165);
    font-size: 2.1em;
    font-weight: bold;
    padding-bottom: 0.8em;
  }

  > div.body {
    display: flex;
    height: 1.8em;
    padding: 1em;

    > div.index {
      color: rgba(0, 0, 0, 0.4);
      text-align: left;
      align-items: middle;
      font-size: 1.3em;
      padding: 0.1em 0.5em 0 0;
    }
    > input {
      flex: 1 0 auto;
      border-radius: 2em;
      border-color: lightgrey;
      text-align: left 1em;
    }
  }

  > div.footer {
    display: flex;
    padding-top: 3em;

    > button.save {
      flex: 1 0 auto;
      width: 5em;
      height: 3em;
      border: none;
      border-radius: 1.5em;
      background: rgba(92, 201, 165);
      margin: 0.5em;
      cursor: pointer;
    }
    > button.cancel {
      flex: 1 0 auto;
      width: 5em;
      height: 3em;
      border: none;
      border-radius: 1.5em;
      background: rgba(242, 242, 242);
      margin: 0.5em;
      cursor: pointer;
    }
    > button.delete {
      flex: 1 0 auto;
      width: 5em;
      height: 3em;
      border: 0.2em solid red;
      border-radius: 1.5em;
      margin: 0.5em;
      background: white;
      color: red;
      cursor: pointer;
    }
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
      // console.log(JSON.stringify(loginInfo))
      axios
        .post(`${serverUrl}/user/signin`, loginInfo, {
          "Content-Type": "application/json",
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log(res);
            // const { accessToken } = res.data;
            // axios.defaults.headers.common['jwt'] = `Bearer ${accessToken}`;
            handleResponseSuccess(res.data.data);
          }
        });
    }
  };

  return (
    <ModalContainer>
      <ModalBackdrop onClick={() => modalHandler("close")}>
        <ModalView onClick={(e) => e.stopPropagation()}>
          <span className="close-btn" onClick={() => modalHandler("close")}>
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

export function AddItemModal({ userinfo, modalHandler, items, setItems }) {
  // items: app.js에서 받아온 전체 목록, item: 모달에서 추가하는 품목 한 개의 속성
  const [item, setItem] = useState({
    userId: userinfo.id,
    name: "",
    desc: "",
    quantity: "",
    expiration: "",
    storage: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputValue = (e, key) => {
    setItem({ ...item, [key]: e.target.value });
  };

  const handleAdd = () => {
    console.log(item);
    if (
      item.name.length === 0 ||
      item.quantity.length === 0 ||
      item.expiration.length === 0
    ) {
      return setErrorMessage("최소한의 정보를 입력해주세요");
    } else {
      axios.post(`${serverUrl}/items`, item).then((res) => {
        // console.log(res)
        setItems([...items, item]);
      });
      modalHandler("close");
      window.location.replace("/");
    }
  };

  return (
    <ModalContainer>
      <ModalBackdrop onClick={() => modalHandler("close")}>
        <ModalView onClick={(e) => e.stopPropagation()}>
          <div className="title">상품 추가하기</div>
          <div className="body">
            <div className="index">이름</div>
            <input onChange={(e) => handleInputValue(e, "name")} />
          </div>
          <div className="body">
            <div className="index">설명</div>
            <input onChange={(e) => handleInputValue(e, "desc")} />
          </div>
          <div className="body">
            <div className="index">수량</div>
            <input onChange={(e) => handleInputValue(e, "quantity")} />
          </div>
          <div className="body">
            <div className="index">유통기한</div>
            <input
              type="date"
              onChange={(e) => handleInputValue(e, "expiration")}
            />
          </div>
          <div className="body">
            <div className="index">보관</div>
            <input onChange={(e) => handleInputValue(e, "storage")} />
          </div>
          <div className="footer">
            <div>{errorMessage}</div>
            <button className="cancel" onClick={() => modalHandler("close")}>
              취소
            </button>
            <button className="save" onClick={handleAdd}>
              저장
            </button>
          </div>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}

export function EditItemModal({ index, modalHandler, items, setItems }) {
  // item: app.js에서 받아온 전체 목록, items: 모달에서 추가하는 품목 한 개의 속성
  const [item, setItem] = useState({
    itemId: items[index].id,
    name: items[index].name,
    desc: items[index].desc,
    quantity: items[index].quantity,
    expiration: items[index].expiration,
    storage: items[index].storage,
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputValue = (e, key) => {
    setItem({ ...item, [key]: e.target.value });
  };

  const handleAdd = () => {
    if (
      item.name.length === 0 ||
      item.quantity.length === 0 ||
      item.expiration.length === 0
    ) {
      return setErrorMessage("최소한의 정보를 입력해주세요");
    } else {
      axios.put(`${serverUrl}/items`, item).then((res) => {
        // console.log(res)
        // setItems([...items, item]);
        modalHandler("close");
        window.location.replace("/");
      });
    }
  };
  const handleDelete = () => {
    axios.delete(`${serverUrl}/items/${items[index].id}`).then((res) => {
      console.log(res);
    });
    modalHandler("close");
    window.location.replace("/");
  };

  return (
    <ModalContainer>
      <ModalBackdrop onClick={() => modalHandler("close")}>
        <ModalView onClick={(e) => e.stopPropagation()}>
          <div className="title">상품 상세정보</div>
          <div className="body">
            <div className="index">이름</div>
            <input
              onChange={(e) => handleInputValue(e, "name")}
              placeholder={item.name}
            />
          </div>
          <div className="body">
            <div className="index">설명</div>
            <input
              onChange={(e) => handleInputValue(e, "desc")}
              placeholder={item.desc}
            />
          </div>
          <div className="body">
            <div className="index">수량</div>
            <input
              onChange={(e) => handleInputValue(e, "quantity")}
              placeholder={item.quantity}
            />
          </div>
          <div className="body">
            <div className="index">보관</div>
            <input
              onChange={(e) => handleInputValue(e, "storage")}
              placeholder={item.storage}
            />
          </div>
          <div className="body">
            <div className="index">유통기한</div>
            <input
              type="date"
              onChange={(e) => handleInputValue(e, "expiration")}
              placeholder={item.expiration}
            />
          </div>

          <div className="footer">
            <div>{errorMessage}</div>
            <button className="cancel" onClick={() => modalHandler("close")}>
              취소
            </button>
            <button className="save" onClick={handleAdd}>
              저장
            </button>
            <button className="delete" onClick={handleDelete}>
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
}
