const api_key = "b62f4c776e3b79a63706347f061baefe";
const url_base_weather = "http://api.openweathermap.org/data/2.5/weather";

const getUrlByCity = (city) =>{
    return `${url_base_weather}?q=${city}&appid=${api_key}&units=metric`;
}

export default getUrlByCity;