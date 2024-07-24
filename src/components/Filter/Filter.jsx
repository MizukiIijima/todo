import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import "./Filter.css";

export const Filter = (states, setStatus) => {

    const onSubmit = () => {

    }

    return(
        <div className="filter">
            <p className="statusTitle">ステータス</p>
            <div className="statusBlock">
                <input type="radio" id="notStarted" name="status" />
                <label htmlFor="notStarted">未着手</label>
                <input type="radio" id="working" name="status" />
                <label htmlFor="working">作業中</label>
                <input type="radio" id="complete" name="status" />
                <label htmlFor="complete">完了</label>
            </div>
            <label htmlFor="keyword" className="keywordTitle">キーワード</label>
            <input type="text" id="keyword" className="keywordText"/>
            <button className="searchBtn">検索</button>
        </div>
    );
}