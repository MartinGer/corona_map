import React, { Component } from 'react';
import './countryList.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const countryList = require('country-list');
const countries = countryList.getCodes();

class CountryList extends Component {
  constructor(props) {
    super(props);

    this.cur_date = props.cur_date;
    this.country_data = props.country_data;
    this.full_data = props.full_data;

    this.state = {
      full_data: props.full_data,
    };
  }

  render() {
    console.log('render')
    if (!this.state.full_data || this.country_data.length === 0) { 
      console.log('keine daten')
      return null; }
    console.log('full data');
    console.log(this.state.full_data)
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
            <td>{this.state.full_data.infected}</td>
            <td>{this.full_data.deaths}</td>
            <td>{this.full_data.recovered}</td> 
          </tr>
          {/* {
          this.state.countries_result.map(country =>
            <React.Fragment key={country.name}>
              <tr>
                <th scope="row">{country.name}</th>
                <td>{country.infected}</td>
                <td>{country.deaths}</td>
                <td>{country.recovered}</td>
              </tr>
            </React.Fragment>
            )
          } */}
        </tbody>
      </table>
    </div>
    );
  }

  // componentDidMount() {
  //   this.fetchFullCoronaData(this.fullSearch);
  //   countries.forEach(this.fetchCoronaData);
  // }
}

export default CountryList;
