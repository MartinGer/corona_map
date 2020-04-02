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
    const data = this.props.country_data
    // console.log('render List')
    // console.log(this.props.full_data)
    // console.log(this.props.country_data)
    if (!this.props.full_data || !this.props.country_data) { 
      console.log('keine daten')
      return null; 
    };

    // if (this.state.cur_date === null && this.props.country_data) {
    //   console.log(this.props.country_data)
    //   console.log(Object.keys(this.props.country_data[0]))
    //   this.setState = {
    //     cur_date: Object.keys(this.props.country_data).pop()
    //   };
    //   console.log('set state')
    //   console.log(this.state.cur_date)
    // };

    // console.log('full data');
    // console.log(this.props.country_data)
    console.log(this.props.cur_date)
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
            <td>{this.props.full_data.infected}</td>
            <td>{this.props.full_data.deaths}</td>
            <td>{this.props.full_data.recovered}</td> 
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

  componentDidMount() {
    console.log('list did mount')
  }

  componentWillReceiveProps(nextProps) {
    console.log('props are updated')
    // this.setState({ data: nextProps.data });  
    console.log(this.props.country_data)
    if (this.props.country_data) {
      console.log('daten sind da')
      this.setState = {
        cur_date: Object.keys(this.props.country_data).pop()
      };
    };
    console.log(this.state.cur_date);
  }
}

export default CountryList;
