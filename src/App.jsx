import React,{useState,useEffect} from 'react';
import './App.css';
import About from './component/About.jsx'
function App() {  
  const[count,setCount]=useState(0)
  const[size,setSize]=useState(
    {width:document.documentElement.clientWidth,
    height:document.documentElement.clientHeight}
  )
  const onResize = ()=>{
    setSize({
      width:document.documentElement.clientWidth,
      height:document.documentElement.clientHeight
    })
  }
  const onClick = ()=>{
    console.log('点击')
  }
  useEffect(()=>{
    console.log(count)
  },[])
  useEffect(()=>{
    window.addEventListener('resize',onResize,false)
    return ()=>{
      window.removeEventListener('resize',onResize,false)
    }
  },[])
  useEffect(()=>{
    document.querySelector('#size').addEventListener('click',onClick,false)
  },[])
  return (
    <div className="App">
      <button onClick = {()=>{setCount(count+1)}}>click {count}, size: 宽{size.width} 高{size.height}</button>
      <span id="size"> size: 宽{size.width} 高{size.height}</span>
      <About></About> 
    </div>
  );
}
export default App;





