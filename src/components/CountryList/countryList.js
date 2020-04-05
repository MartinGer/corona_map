import React, { Component } from 'react';
import './countryList.css';

import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class CountryList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { fullData, countryData, curDate } = this.props;

    if (!fullData || !countryData) {
      console.log('keine daten');
      return null;
    }
    return (
      <div className="CountryList">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">State</th>
              <th scope="col">Infected</th>
              <th scope="col">Deaths</th>
              <th scope="col">Recovered</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Global</th>
              <td>{fullData.infected}</td>
              <td>{fullData.deaths}</td>
              <td>{fullData.recovered}</td>
            </tr>
            {
          countryData[curDate].map((countryInfo) => (
            <React.Fragment key={countryInfo.countryCode}>
              <tr>
                <th scope="row">{countryInfo.country}</th>
                <td>{countryInfo.confirmed}</td>
                <td>{countryInfo.deaths}</td>
                <td>{countryInfo.recovered}</td>
              </tr>
            </React.Fragment>
          ))
          }
          </tbody>
        </table>
      </div>
    );
  }
}

CountryList.defaultProps = {
  fullData: {},
  countryData: {},
  curDate: '',
};

CountryList.propTypes = {
  fullData: PropTypes.objectOf(PropTypes.number),
  countryData: PropTypes.objectOf(PropTypes.array),
  curDate: PropTypes.string,
};
