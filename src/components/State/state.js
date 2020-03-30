import React, { Component } from 'react';
import './state.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const countryList = require('country-list');
const countries = countryList.getCodes();

class State extends Component {
  constructor(props) {
    super(props);

    this.name = props.name;
    this.fullSearch = props.full_query;
    this.countrySearch = props.country_query;
    this.sum_up_param = props.sum_up_param;

    this.state = {
      full_result: null,
      countries_result: []
    };

    this.setCoronaData = this.setCoronaData.bind(this);
    this.fetchCoronaData = this.fetchCoronaData.bind(this);
    this.setFullCoronaData = this.setFullCoronaData.bind(this);
    this.fetchFullCoronaData = this.fetchFullCoronaData.bind(this);
  }

  render() {
    const { full_result, countries_result} = this.state;
    
    if (!full_result || countries_result.length === 0) { return null; }

    return (
      <div className="State">
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
            <td>{full_result.infected}</td>
            <td>{full_result.deaths}</td>
            <td>{full_result.recovered}</td> 
          </tr>
          {
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
          }
        </tbody>
      </table>
    </div>
    );
  }

  setFullCoronaData(result) {
    this.setState({ full_result: {
      infected: result.confirmed,
      deaths: result.deaths,
      recovered: result.recovered,
      } 
    });
  }

  fetchFullCoronaData(searchTerm) {
    fetch(searchTerm, {
      method: 'GET', 
      })
      .then(response => response.json())
      .then(result => this.setFullCoronaData(result))
      .catch(e => e);
  }

  setCoronaData(result) {
    let cur_data = {
      name: result[0].countryregion,
      infected: result[0].confirmed,
      deaths: result[0].deaths,
      recovered: result[0].recovered,
    }
    let data = [...this.state.countries_result, cur_data];
    this.setState({
      countries_result: data
    });
  }

  fetchCoronaData(country) {
    let searchTerm = this.countrySearch + country + this.sum_up_param;
    fetch(searchTerm, {
      method: 'GET', 
      })
      .then(response => response.json())
      .then(result => this.setCoronaData(result))
      .catch(e => e);
  }

  componentDidMount() {
    this.fetchFullCoronaData(this.fullSearch);
    countries.forEach(this.fetchCoronaData);
  }
}

export default State;
