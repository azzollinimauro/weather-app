import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css'
import ForecastItem from '../components/ForecastItem';
import transformForecast from './../services/transformForecast'

/*const days=[
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes'
];
const data ={
    temperature: 15,
    humidity: 25,
    weatherState: 'sun',
    wind: 'normal',
}*/

const api_key = "b62f4c776e3b79a63706347f061baefe";

class ForecastExtended extends Component {

    constructor() {
        super();
        this.state = { forecastData: null }
    }
    renderForecastItemDays(forecastData) {
        return forecastData.map(
            forecast => (<ForecastItem key={`${forecast.weekDay} ${forecast.hour}`}
                weekDay={forecast.weekDay}
                hour={forecast.hour}
                data={forecast.data}></ForecastItem>)
        )


    }


    componentDidMount() {
       this.updateCity(this.props.city);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.city !== this.props.city){
            this.setState({
                forecastData:null,
            })
            this.updateCity(nextProps.city);
        }
    }
    updateCity = city =>{
        const url_forecast_weather = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=metric`;
        console.log(url_forecast_weather);

        fetch(url_forecast_weather).then(
            data => (data.json())
        ).then(
            weather_data => {
                console.log(weather_data);
                const forecastData = transformForecast(weather_data);
                console.log(forecastData);

                this.setState(
                    { forecastData },
                );
            }
        );
    }
    renderProgress = () => {
        return <h3>"Cargando Pronóstico Extendido..."</h3>;
    }

    render() {
        const city = this.props.city;
        const { forecastData } = this.state;
        return (<div>
            <h2 className='forecast-title'>Pronóstico extendido de {city}</h2>
            {forecastData === null ? this.renderProgress()
                : this.renderForecastItemDays(forecastData)}
        </div>
        )

    }
}

ForecastExtended.propTypes = {
    city: PropTypes.string.isRequired,
}
export default ForecastExtended;