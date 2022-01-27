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
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 500px;

  > div.header {
    > div.title {
      cursor: default;
      float: left;
      margin: 30px;
      color: rgba(92, 201, 165);
      font-size: 100px;
      font-weight: bold;
    }
    > button.trash {
      cursor: pointer;
      padding-left: 80px;
      margin-top: 13px;
      height: 50px;
      background: white;
      width: 100px;
      color: black;
      border: 0;
      outline: 0;
    }
  }
  > div.body {
    > div.text {
      cursor: default;
      flex-direction: column;
      float: center;
      color: rgba(178, 178, 178);
      margin-top: 3px;
    }
    > input {
      cursor: pointer;
      border-style: solid;
      border-radius: 10px;
      border-color: gray;
      margin: 5px;
      height: 25px;
      width: 200px;
    }
  }
  > div.footer {
    > button.save {
      cursor: pointer;
      border: 3px solid gray;
      border-radius: 2rem;
      margin-top: 30px;
      margin-left: 10px;
      height: 50px;
      background: rgba(92, 201, 165);
      width: 100px;
      color: white;
      border: 0;
      outline: 0;
    }
    > button.fail {
      cursor: pointer;
      border: 3px solid gray;
      border-radius: 2rem;
      margin-top: 30px;
      height: 50px;
      background: rgba(242, 242, 242);
      width: 100px;
      color: black;
      border: 0;
      outline: 0;
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
          <div className="header">
            <div className="title">상품 추가하기</div>
          </div>
          <div className="body">
            <div className="text">이름</div>
            <input onChange={(e) => handleInputValue(e, "name")} />
            <div className="text">설명</div>
            <input onChange={(e) => handleInputValue(e, "desc")} />
            <div className="text">수량</div>
            <input onChange={(e) => handleInputValue(e, "quantity")} />

            <div className="text">유통기한</div>
            <input
              type="date"
              onChange={(e) => handleInputValue(e, "expiration")}
            />
            <div className="text">보관</div>
            <input onChange={(e) => handleInputValue(e, "storage")} />
          </div>
          <div className="footer">
            <div>{errorMessage}</div>
            <button className="fail" onClick={() => modalHandler("close")}>
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
          <div className="header">
            <div className="title">상품 상세정보</div>
            <button className="trash" onClick={handleDelete}>
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
          <div className="body">
            <div className="text">이름</div>
            <input onChange={(e) => handleInputValue(e, "name")} />
            <div className="text">설명</div>
            <input onChange={(e) => handleInputValue(e, "desc")} />
            <div className="text">수량</div>
            <input onChange={(e) => handleInputValue(e, "quantity")} />
            <div className="text">유통기한</div>
            <input
              type="date"
              onChange={(e) => handleInputValue(e, "expiration")}
            />
            <div className="text">보관</div>
            <input onChange={(e) => handleInputValue(e, "storage")} />
          </div>
          <div className="footer">
            <div>{errorMessage}</div>
            <button className="fail" onClick={() => modalHandler("close")}>
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
