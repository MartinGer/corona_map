/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'rc-slider/assets/index.css';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import PropTypes from 'prop-types';

import './Timeseries.css';

const SliderWithTooltip = createSliderWithTooltip(Slider);

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

    return (
      <div>
        { this.dates.length > 0
          ? (
            <div className="timeSliderContainer">
              <p>Range with custom tooltip</p>
              <SliderWithTooltip marks={this.marks} defaultValue={105} tipFormatter={this.thumbText} valueLabelDisplay="on" />
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
