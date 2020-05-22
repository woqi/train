import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";

import Header from "../Header/Header.jsx";
import DepartDate from "../DepartDate/DepartDate.jsx";
import HighSpeed from "../HighSpeed/HighSpeed.jsx";
import Journey from "../Journey/Journey.jsx";
import Submit from "../Submit/Submit.jsx";
import Debounced from "lodash.debounce";

import { exchangeFromTo, showCitySelector } from "../store/action.js";

import "./App.scss";

function App(props) {
  const { from, to,dispatch } = props;
  useEffect(() => {}, []);
  function showText() {
    console.log("使用防抖");
  }
  const onBack = useCallback(() => {
    window.history.back();
  }, []);
  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack}></Header>
      </div>
      <Journey from={from} to={to}
        exchangeFromTo={()=>dispatch(exchangeFromTo())}
        showCitySelector={i=>dispatch(showCitySelector(i))}
        ></Journey>
      <DepartDate></DepartDate>
      <HighSpeed></HighSpeed>
      <Submit></Submit>
      <button onClick={() => Debounced(showText, 1000)()}>2秒后出现</button>
    </div>
  );
}
export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch };
  }
)(App);
