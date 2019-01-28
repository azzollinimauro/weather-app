import React from 'react';
import WeatherLocation from './WeatherLocation'
import { PropTypes } from 'prop-types';
import './styles.css';


const LocationList = ({ cities, onSelectedLocation }) => {
    const handldeWeatherLocationClick = city =>{
        console.log("handleweatherlocationclick");
        onSelectedLocation(city);
    };
    const strToComponents = cities => {
         return cities.map( city =>
            (
                <WeatherLocation
                    key={city.key}
                    city={city.name}
                onWeatherLocationClick={()=>
                     handldeWeatherLocationClick (city.name)}
                     data={city.data}/>))
    };

    return (<div className="locationList">
        {strToComponents(cities)}
    </div>);
};

LocationList.propTypes = {
    cities: PropTypes.array.isRequired,
    onSelectedLocation: PropTypes.func,
}
export default LocationList;