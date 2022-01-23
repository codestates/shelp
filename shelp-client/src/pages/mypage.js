import { Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
const axios = require("axios").default;

const Navigator = styled.nav`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
  left: 0;
  height: 3.5rem;
  min-width: 100%;
  background-color: white;
  border: lightgrey solid 1px;
`;

const Logo = styled.div`
  flex: 1 0 auto;

  border: black solid 1px;
  background-size: 1% auto; // cover;
  background-repeat: no-repeat;

  > img {
    max-height: 2rem;
    margin: 1rem;
  }
`;

const Blank = styled.div`
  flex: 10 0 auto;
  border: black solid 1px;
`;

const NavButton = styled.div`
  flex: 1 0 auto;
  border: black solid 1px;
`;

function Mypage({ userinfo, setUserinfo }) {
  //<img src="shelp-logo.png" />;
  return (
    <div>
      <Navigator>
        <Logo>
          <img src="shelp-logo.png" />
        </Logo>
        <Blank>Blank</Blank>
        <NavButton>NavButton</NavButton>
        <NavButton>NavButton</NavButton>
      </Navigator>
      <input
        type="image"
        src="https://www.freeiconspng.com/thumbs/pepe-png/pepe-png-free-download-16.png"
      />
      <div>{userinfo.email}</div>
      <div>{userinfo.name}</div>
      <div>{userinfo.desc}</div>
      <div>{userinfo.image}</div>
    </div>
  );
}
export default Mypage;
