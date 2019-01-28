import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ForecastExtended from './../components/ForecastExtended';
import {connect} from 'react-redux';
import {getForecastDataFromCities, getCity} from './../reducers';

class ForecastExtendedContainer extends Component {
    
    render() {
        return (
            this.props.city &&
           <ForecastExtended city={this.props.city}></ForecastExtended>
        );
    }
}

ForecastExtendedContainer.PropTypes={
    city: PropTypes.string.isRequired,

}

const mapStateToProps = state => ({city: getCity(state), forecastData: getForecastDataFromCities(state)});
export default connect(mapStateToProps, null)(ForecastExtendedContainer);