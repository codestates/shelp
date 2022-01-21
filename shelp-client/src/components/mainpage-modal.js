import { useState, useRef, useEffect } from "react";
import { Route, Switch, Link, Routes } from "react-router-dom";
import styled from "styled-components";
const axios = require('axios').default;

export function MainpageModal ({modalcontroller}) {

    let temp = 'apple';
    const [item, setItem] = useState(temp);
    const [exp, setExp] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [modal, setModal] = useState(false);

    const deleteButtonController = () => {
        axios.delete('http://localhost:4000/items/id');
        setModal(false);
    }

    const itemValueController = (e) => {
        // 모달창의 아이템 이름을 입력하면 입력한 이름으로 설정
        setItem(null);
    }

    const editItem = () => {

    }

    return (
        <modal className="mainpage-modal">
            <options className='mainpage-options'>
                <input className="itemName" type="text" value={item} onClick={itemValueController}/>
                <input className="expDate" type="date" value={exp}/>
                <input className="quantity" type="number" value={quantity}/>
                <div className="options">
                    <input
                    className="option1"
                    type="radio"
                    name="storage"
                    value="상온"
                    />
                    <input
                    className="option2"
                    type="radio"
                    name="storage"
                    value="냉장"
                    />
                    <input
                    className="option3"
                    type="radio"
                    name="storage"
                    value="냉동"
                    />
                </div>
            </options>
            <decisionbutton>
                <input
                className="cancelButton"
                type="button"
                value="cancel"
                onClick={modalcontroller}
                />
                <input
                    className="doneButton"
                    type="button"
                    value="done"
                    onClick={editItem}
                />
                <input
                    className="deleteButton"
                    type="button"
                    value="delete"
                    onClick={deleteButtonController}
                />
            </decisionbutton>
        </modal>
    )
}
