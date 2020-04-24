此项目是一个多页面项目
npm run eject 后不能恢复

#### 第三章内容

### context  提供了一种方式，让数据在组件树种传递而不必一级一级手动传递，意思就是跨级传递

**派生两个组件 ：**

- provide携带变量值，像后代组件统一传递值

- 后代组件使用consumer来接收provide发出的信息
  consumer标签里面只能写函数

*注：hooks和class都可以使用多层嵌套context*
*如果有多个context 需要嵌套 provide标签*

**使用createContext(默认值)是唯一创建context的方式**

```js
import React,{createContext,useState} from 'react';
import './App.css';
const BatteryContext = createContext()
const OnlineContext = createContext()
function Leaf(){
  return(
    <BatteryContext.Consumer>
      {
        battery =>(
          <OnlineContext.Consumer>
            {
            online =>(
              <p>传递值：{battery},
              Online: {String(online)}</p>
              )
            }            
          </OnlineContext.Consumer>        
        )
      }
    </BatteryContext.Consumer>
  )
} 
function Middle(){
  return(
    <Leaf></Leaf>
  )
}
function App() {
  const [battery,setBattery] = useState(60)
  const [online,setOnline]=useState(false)
  const changeBattery = ()=>{
  setBattery(battery + 1)
  }
  const changeonline = ()=>{
    setOnline(!online)
  }
  return (
    <div className="App">
      <BatteryContext.Provider value={battery}>
      <OnlineContext.Provider value={online}>
        <button type="button" onClick={changeBattery}>press</button>
        <button type="button" onClick={changeonline}>Switch</button>
        <Middle></Middle>
      </OnlineContext.Provider>
      </BatteryContext.Provider>
    </div>
  );
}
export default App;
```

### **contextType 对context的补充 是一个语法糖**

如果使用contextType就可以不用使用Consumer标签来接收所传数据，这个语法糖只能在class里使用，*在只有一个context时使用*

### 

### lazy 懒加载组件，和suspense配合

应用场景是图片懒加载，webpack提供了codes plitting这样一个功能，import是用来代码拆分，

动态导入 `import('文件路径')`.then(...)

这个api是封装的组件导入行为，并非它本身

suspense lazy会触发load状态 补齐这个状态的视觉

```js

import React,{lazy,Suspense } from 'react';
import './App.css';
// import About from './component/About.jsx'
const About = lazy(()=>import(/*webpackChunkName:"About"*/ './component/About.jsx'))
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

```

Suspense中fallback必须加一个实例或组件`<Load/>`

`/*webpackChunkName:"About"*/`用来修改你引入的包名



#### 第四章内容

hooks是函数组件，所有逻辑在函数内部，没有实例化概念，提高了组件复用性，没有了this指向问题，也可以自定义hook

所有hook函数都应以use开头，

如果一个文件中有多次useState调用useState如何判断该改变哪个变量呢，是根据执行顺序来确定



**useContext**

useEffect 在组件每次渲染之后调用，并且自定义状态来决定调用与否，第一次调用相当于componentDidMount，后面的调用相当于componentDidUpdate，这个函数的作用是清除上一次函数遗留下来的状态，比如一个组件在渲染第3次第5次第7次执行useEffect函数，那么在4,6,8次渲染前会执行useEffect

**useEffect** 第二项是数组，只有数组每一项都不变的情况下才不会执行

```js
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
  useEffect(()=>{
    console.log(count)
  },[])
  useEffect(()=>{
    window.addEventListener('resize',onResize,false)
    return ()=>{
      window.removeEventListener('resize',onResize,false)
    }
  },[count])
  return (
    <div className="App">
      <button onClick = {()=>{setCount(count+1)}}>click {count}, size: 宽{size.width} 高{size.height}</button>
        <About></About> 
    </div>
  );
}
export default App;
```

useEffect第一个参数是函数，第二个参数是数组，数组在改变后才会重新订阅



### memo 用来优化渲染性能



## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactiv;e watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
