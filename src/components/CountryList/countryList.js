import React, { Component } from 'react';
import './countryList.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const countryList = require('country-list');
const countries = countryList.getCodes();

class CountryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cur_date: null,
      full_data: null,
      country_data: {}
    };
  }

  render() {
    const country_data = this.props.country_data
    const full_data = this.props.full_data
    const cur_date = this.props.cur_date

    if (!full_data || !country_data) { 
      console.log('keine daten')
      return null; 
    };

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
            <td>{full_data.infected}</td>
            <td>{full_data.deaths}</td>
            <td>{full_data.recovered}</td> 
          </tr>
          {
          country_data[cur_date].map(countryInfo =>
            <React.Fragment key={countryInfo.countryCode}>
              <tr>
                <th scope="row">{countryInfo.country}</th>
                <td>{countryInfo.confirmed}</td>
                <td>{countryInfo.deaths}</td>
                <td>{countryInfo.recovered}</td>
              </tr>
            </React.Fragment>
            )
          }
        </tbody>
      </table>
    </div>
    );
  }
  
  componentDidMount() {
    console.log('list did mount')
  }
}

export default CountryList;
