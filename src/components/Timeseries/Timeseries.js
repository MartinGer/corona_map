/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import PropTypes from 'prop-types';

import './Timeseries.css';

function valuetext(value) {
  return `${value}°C`;
}

export default class Timeseries extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { countryData } = this.props;

    return (
      <div className="timeSliderContainer">
        <Typography id="discrete-slider-small-steps" gutterBottom>
          Small steps
        </Typography>
        <Slider
          defaultValue={0.00000005}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-small-steps"
          step={0.00000001}
          marks
          min={-0.00000005}
          max={0.0000001}
          valueLabelDisplay="auto"
        />
      </div>
    );
  }
}

Timeseries.defaultProps = {
  countryData: {},
};

Timeseries.propTypes = {
  countryData: PropTypes.objectOf(PropTypes.array),
};
