import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
const serverUrl = "http://localhost:4000";

// font-family: adobe-clean-han-japanese,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;
const TouchPoint = styled.div`
  position: relative;
  width: 36vw;
  height: 90vh;
  z-index: 999;
  padding: 5vh;
  margin-left: 32vw;
  background-color: white;
  align-content: space-between;

  > div.title {
    margin-top: 1rem;
    font-weight: bold;
    font-size: 200%;
  }

  > div.requirment {
    margin-top: 4rem;
    font-size: 90%;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.5);
  }

  > input {
    color: rgba(0, 0, 0, 0.3);
    padding-top: 0.3rem;
    font-size: 1.2rem;
    width: 25rem;
    outline: none;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    border-bottom-width: 0.5px;
    border-color: rgba(0, 0, 0, 0.1);
  }

  > input:focus {
    color: rgba(0, 0, 0, 0.8);
    border-bottom-width: 2.5px;
    border-color: rgba(0, 0, 0, 0.5);
  }

  > div.message {
    margin-top: 0.5rem;
    color: rgba(0, 0, 0, 0.5);
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  > button.submit {
    height: auto;
    margin-top: 3rem;
    margin-right: 0.7rem;
    padding: 0.7rem 1rem;
    background-color: grey;
    color: white;
    font-weight: bold;
    border-style: hidden;
    border-radius: 2rem;
    cursor: pointer;
  }

  > button.oauth {
    width: 14rem;
    height: auto;
    margin-top: 1rem;
    padding: 0.7rem 1rem;
    background-color: gold;
    color: black;
    font-weight: bold;
    border-style: hidden;
    border-radius: 2rem;
    cursor: pointer;
  }
`;

export default function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    email: null,
    name: null,
    password: null,
    image:
      "https://www.freeiconspng.com/thumbs/pepe-png/pepe-png-free-download-16.png",
    desc: null,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const handleInputValue = (e, key) => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  };

  // const handlePasswordError = (checkPassword) => {
  //   if (checkPassword !== signupInfo.password) {
  //     setErrorMessage("??????????????? ????????? ?????????");
  //   } else {
  //     setErrorMessage("");
  //   }
  // };

  const handleSignup = () => {
    if (signupInfo.email && signupInfo.name && signupInfo.password) {
      console.log("handleSignup works");
      console.log(signupInfo);
      if (errorMessage === "") {
        axios.post(`${serverUrl}/user/signup`, signupInfo).then((res) => {
          console.log(res);
        });
      }
      window.location.replace("/login");
    } else {
      setErrorMessage("????????? ?????? ??????????????????");
    }
  };

  const checkEmail = () => {
    axios
      .post(`${serverUrl}/user/check`, { email: signupInfo.email })
      .then((res) => {
        if (res.data.available === true) {
          setEmailMessage("??????????????? ????????? ?????????.");
          handleSignup();
        }
        if (res.data.available === false) {
          setEmailMessage("?????? ???????????? ????????? ?????????.");
        }
      });
    // .then(()=>{
    //   console.log(emailMessage);
    //   if(emailMessage === "??????????????? ????????? ?????????."){
    //     handleSignup();
    //   }
    // });
  };

  const oAuthHandler = () => {
    axios.get(`${serverUrl}user/auth/kakao`).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <TouchPoint>
        <div className="title">????????????</div>
        <div className="requirment">????????? ??????</div>
        <input
          placeholder="???????????? ????????? ????????? ????????? ?????????"
          onChange={(e) => handleInputValue(e, "email")}
        ></input>
        <div className="message">{emailMessage}</div>
        <div className="requirment">????????????</div>
        <input
          type="password"
          placeholder="???????????? ??????????????? ????????? ?????????"
          onChange={(e) => handleInputValue(e, "password")}
        ></input>
        <div className="message">
          {errorMessage === "" ? "??????????????? ??????????????????" : errorMessage}
        </div>
        <div className="requirment">?????????</div>
        <input
          placeholder="???????????? ???????????? ????????? ?????????"
          onChange={(e) => handleInputValue(e, "name")}
        ></input>
        <div className="message">
          {errorMessage === ""
            ? "???????????? ???????????? ????????? ?????????"
            : errorMessage}
        </div>
        <button className="submit" onClick={checkEmail}>
          ????????? ???????????? ????????????
        </button>
        {/* <button className="oauth" onClick={oAuthHandler}>
          ????????? ???????????? ????????????
        </button> */}
      </TouchPoint>
    </div>
  );
}
