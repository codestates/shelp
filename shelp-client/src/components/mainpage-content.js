import { useState, useRef, useEffect } from "react";
import { Route, Switch, Link, Routes } from "react-router-dom";
import styled from "styled-components";
const axios = require('axios').default;


export function MainPageContent({modalcontroller}) {

    let temp = 'apple';
    const [item, setItem] = useState(temp);
    const [exp, setExp] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [storage, setStorage] = useState(null);
    const [recipes, setRecipes] = useState(null); //초기값은 데이터 없음 안내문구를 넣어줄 것

    async function searchRecipe (el)  {
        const uerId = await axios.get(); // el 의 id를 찾기 위해서 서버에 요청
        const recipes = await axios.get(); // 위에서 찾은 id를 가지고 서버에 레시피 요청
        setRecipes(recipes.data[0]);
    }

    return (
        <content className='mainpage-content'>
            <shelf className='mainpage-shelf'>
                <div className="searchArea">
                <input className="searchBar" />
                <input className="searchButton" type="button" />
                </div>
                <scrollbox className='mainpage-scrollbox'>
                    <ul className="grocery">
                    {/* props: expDate, name, quant, storage, desc */}
                        <li>
                        <iteminfo onClick={()=>{searchRecipe(item)}}>
                            <itemname>{item}</itemname>
                            <itemexp>{exp}</itemexp>
                            <itemquant>{quantity}</itemquant>
                            <itemstorage>{storage}</itemstorage>
                        </iteminfo>
                        <input
                                className="editButton"
                            type="button"
                            value="수정"
                            onClick={modalcontroller}
                        />
                        </li>
                    </ul>
                </scrollbox>
                <input className="addButton" type="button" value="add item" onClick={modalcontroller} />
            </shelf>
            <recipes className='mainpage-recipes'>
                <ul>
                    <li>
                        <recipeimg></recipeimg>
                        <recipename>우유김치찌개</recipename>
                        <a href="https://www.dispatch.co.kr/2034029">
                        delicious kimchichigae recipe
                        </a>
                    </li>
                </ul>
            </recipes>
        </content>
    )
}