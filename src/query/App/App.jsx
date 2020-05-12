import React from 'react'
import  {connect} from 'react-redux'

import './App.scss'
 function App(){
  return(
    <div>
      搜索
    </div>
  )
}
export default connect(
  function mapStateToProps(state){

  },
  function mapDispatchToProps(dispatch){}
)(App)