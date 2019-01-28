const location = "Buenos Aires,ar";
const api_key = "b62f4c776e3b79a63706347f061baefe";
const url_forecast_weather=`https://samples.openweathermap.org/data/2.5/forecast?q=${location}&appid=${api_key}`;
const url_base_weather = "http://api.openweathermap.org/data/2.5/weather";

export const api_weather = `${url_base_weather}?q=${location}&appid=${api_key}&units=metric`;