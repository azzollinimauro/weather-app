import transformForecast from './../services/transformForecast';
import getUrlByCity from './../services/getUrlWeatherByCity'
import transformWeather from './../services/transformWeather';
export const SET_CITY='SET_CITY';
export const SET_WEATHER='SET_WEATHER';
export const GET_WEATHER_CITY='GET_WEATHER_CITY';
export const SET_WEATHER_CITY='SET_WEATHER_CITY';


const getWeatherCity = payload =>({type: GET_WEATHER_CITY, payload});

const setWeatherCity = payload =>({type: SET_WEATHER_CITY, payload});
 const setCity= (value) => (
    {type: SET_CITY, value});
export const SET_FORECAST_DATA= 'SET_FORECAST_DATA';

const setForecastData = payload => ({type: SET_FORECAST_DATA, payload})
const api_key = "b62f4c776e3b79a63706347f061baefe";


    export const setSelectedCity = payload => {
    return (dispatch, getState) =>{
        const url_forecast_weather = `http://api.openweathermap.org/data/2.5/forecast?q=${payload}&appid=${api_key}&units=metric`;
        dispatch(setCity(payload));
        const state= getState();
        const date= state.cities[payload] && state.cities[payload].forecastDataDate;
        const now= new Date();
         if (date && (now-date) < 1*60*1000) {
             return;
         }
        
        return fetch(url_forecast_weather).then(
            data => (data.json())
        ).then(
            weather_data => {
                const forecastData = transformForecast(weather_data);

                dispatch(setForecastData({city: payload , forecastData}));
            }
        );
        
    };
}

export const setWeather = payload =>{

    return dispatch =>{
        payload.forEach(city=>{
            dispatch(getWeatherCity(city))
            const api_weather = getUrlByCity(city);
            fetch(api_weather).then(resolve => {
                return resolve.json();
            }).then(weather_data => {
                const weather = transformWeather(weather_data);

                dispatch(setWeatherCity({city, weather}))
            });;
        })
    }
    /*handleUpdateClick = () => {
        console.log("Actualizado");
        const { city } = this.props;
   
       
    
    
    }*/
}