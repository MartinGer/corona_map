import React, { Component } from 'react';
import './App.css';
import State from '../State/state.js';
import CountryList from '../CountryList/countryList.js';
import Maps from '../Map/map.js';
import DataLoader from '../../utils/DataLoader.js';

// const PATH_BASE = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu';
// const PATH_LATEST = '/latest';
// const PATH_BRIEF =  '/brief';
// const PATH_SEARCH = 'iso2=';
// const COUNTRY_QUERY = `${PATH_BASE}${PATH_LATEST}?${PATH_SEARCH}`;
// const FULL_QUERY = `${PATH_BASE}${PATH_BRIEF}`;  //https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief   
// const SUM_UP_PARAM = '&onlyCountries=true';

// const countryList = require('country-list');
// const countries = countryList.getCodes();

class App extends Component {
  constructor(props) {
    super(props);

    this.data_loader = new DataLoader();

    this.state = {
      full_data: null,
      country_data: null,
      cur_date: null,
    };
  }
  
  render() {
    return (
        <div className="App">
          <h2>Corona Map</h2>
          <div className="Components">
            <CountryList cur_date={this.state.cur_date} full_data={this.state.full_data} country_data={this.state.country_data}></CountryList>
            {/* <State name="States" full_query={FULL_QUERY} country_query={COUNTRY_QUERY} sum_up_param={SUM_UP_PARAM}></State> */}
            <Maps></Maps>
          </div>
      </div>
    );
  }

  async componentDidMount() {
    let full_data = await this.data_loader.fetchFullCoronaData();
    let country_data = await this.data_loader.fetchCoronaData();

    this.setState({
      full_data: full_data,
      country_data: country_data,
      cur_date: this.data_loader.cur_date,
    });
    console.log('mounted')
    console.log(this.state.cur_date)
    for (const c in this.state.country_data) {
      console.log(c)
    }
  }
}

export default App;
