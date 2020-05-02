/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import PropTypes from 'prop-types';

import './Timeseries.css';

export default class Timeseries extends Component {
  constructor(props) {
    super(props);

    this.dates = [];
    this.marks = [];
    this.state = {
    };
  }

  buildMarks = (dates) => {
    let i;
    for (i = 0; i < dates.length; i += 1) {
      const newEntry = {
        value: i,
        label: dates[i],
      };
      this.marks.push(newEntry);
    }
  }

  valueText = (value) => {
    if (value === 0 || value === this.marks.length - 1) {
      console.log(this.marks[value].label);
      return this.marks[value].label;
    }
    return '';
  }

  thumbText = (index) => this.marks[index].label

  render() {
    const { curDate, countryData } = this.props;

    if (countryData && this.dates.length === 0) {
      this.dates = Object.keys(countryData);
      this.buildMarks(this.dates);
    }

    console.log(this.dates, curDate, this.marks);
    return (
      <div>
        { this.dates.length > 0
          ? (
            <div className="timeSliderContainer">
              <Typography id="discrete-slider-small-steps" gutterBottom>
                Date
              </Typography>
              <Slider
                defaultValue={this.marks.length - 1}
                // getAriaValueText={this.valueText}
                getAriaLabel={this.thumbText}
                aria-labelledby="discrete-slider-small-steps"
                step={null}
                marks={this.marks}
                valueLabelDisplay="on"
              />
            </div>
          )
          : null}
      </div>
    );
  }
}

Timeseries.defaultProps = {
  curDate: '',
  countryData: {},
};

Timeseries.propTypes = {
  curDate: PropTypes.string,
  countryData: PropTypes.objectOf(PropTypes.array),
};
