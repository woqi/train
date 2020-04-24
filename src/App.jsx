import React,{lazy,Suspense } from 'react';
import './App.css';

// import About from './component/About.jsx'
const About = lazy(()=>import(/*webpackChunkName:"About"*/'./component/About.jsx'))
function App() {
  
    
  return (
    <div className="App">
      000000000000000
      <Suspense fallback={<div>loading...</div>}>
        <About></About>
      </Suspense>
      
    </div>
  );
}
export default App;





