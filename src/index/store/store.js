import { createStore, combineReducers, applyMiddleware} from 'redux'
import reducers from './reducers.js'
import thunk from 'redux-thunk'
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
  combineReducers(reducers),
  {
    from: '北京',
    to: '上海',
    isCitySelectorVisible: false,
    currentSelectingLeftCity: false,
    cityData: null,
    isLoadingCityData: false,
    isDataSelectorVisible: false,
    highSpeed: false
  },
  applyMiddleware(thunk)
  // composeEnhancers(applyMiddleware(thunk))
)
