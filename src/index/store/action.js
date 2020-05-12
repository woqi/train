export const ACTION_SET_FROM = 'SET_FROM';
export const ACTION_SET_TO = 'SET_TO';
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE = 'SET_IS_CITY_SELECTOR_VISIBLE';
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY = 'SET_CURRENT_SELECTING_LEFT_CITY';
export const ACTION_SET_CITY_DATA = 'SET_CITY_DATA';
export const ACTION_SET_IS_LOADING_CITY_DATA = 'SET_IS_LOADING_CITY_DATA';
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE = 'SET_IS_DATE_SELECTOR_VISIBLE';
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED';
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE';

export function setFrom(from) {
  return {
    type: ACTION_SET_FROM,
    payload: from,
  };
}

export function setTo(to) {
  return {
    type: ACTION_SET_TO,
    payload: to,
  };
}

export function setIsLoadingCityData(isLoadingCityData) {
  return {
    type: ACTION_SET_IS_LOADING_CITY_DATA,
    payload: isLoadingCityData,
  };
}

export function setCityData(cityDate) {
  return {
    type: ACTION_SET_CITY_DATA,
    payload: cityDate,
  };
}

export function toggleHighSpeed() {
  return (dispatch, getState) => {
    const { highSpeed } = getState();
    dispatch({
      type: ACTION_SET_HIGH_SPEED,
      payload: !highSpeed,
    });
  };
}

export function showCitySelector(currentCity){
  return (dispatch)=>{
    dispatch({
      type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
      payload: true
    })
    dispatch({
      type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
      payload: currentCity
    })
  }
}

export function hideCitySelector(){
  return{
    type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload: false
  }
}
export function setSelectedCity(city){
  return(dispatch,getState)=>{
    const {currentCity} = getState();
    if(currentCity){
      dispatch(setFrom(city))
    }else{
      dispatch(detFrom(city))
    }
    dispatch(hideCitySelector())
  }
}

export function showDateSelector() {
  return {
      type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
      payload: true,
  };
}
export function hideDateSelector() {
  return {
      type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
      payload: false,
  };
}

export function exchangeFromTo(){
  return (dispatch,getState)=>{
    const {from,to}= getState();
    dispatch(setFrom(to));
    dispatch(setTo(from));
  }
}
export function setDepartDate(departDate) {
  return {
      type: ACTION_SET_DEPART_DATE,
      payload: departDate,
  };
}
export function fetchCityData(){
  return (dispatch,getState)=>{
    const {isLoadingCityData}= getState();
    if(isLoadingCityData) return;
    const cache = JSON.parse(localStorage.getItem('city_data_cache')|| '{}')
    if(Date.now()<cache.expires){
      dispatch(setCityData(cache.daya))
      return;
    }
    dispatch(setIsLoadingCityData(true));
    fetch(
      '/rest/cities?_' + Date.now()
    )
    .then(res=>res.json())
    .then(citeyData =>{
      dispatch(setCityData(citeyData));
      localStorage.setItem('city_data_cache',
      JSON.stringify({
        expires:Date.now()+60*1000,
        data:citeyData
      }))
    })
  }
}