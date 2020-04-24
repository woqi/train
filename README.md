此项目是一个多页面项目
eject后不能恢复

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

### **useContext**

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
