import React,{useEffect} from 'react'
// import  {connect} from 'react-redux'

import Header from '../Header/Header.jsx'
import DepartDate from '../DepartDate/DepartDate.jsx'
import HighSpeed from '../HighSpeed/HighSpeed.jsx'
import Journey from '../Journey/Journey.jsx'
import Submit from '../Submit/Submit.jsx'
import Debounced from 'lodash.debounce'
import './App.scss'

  function App() {
    useEffect(() => {}, []);
    function showText() {
      console.log("使用防抖");           
    }
    return (
      <div>
        index-App
        <Header></Header>
        <Journey></Journey>
        <DepartDate></DepartDate>
        <HighSpeed></HighSpeed>
        <Submit></Submit>
        <button onClick={()=>Debounced(showText, 1000)()}>2秒后出现</button>
      </div>
    );
  }
  // export default connect(
  //   function mapStateToProps(state) {},
  //   function mapDispatchToProps(dispatch) {}
  // )(App);      
  export default App