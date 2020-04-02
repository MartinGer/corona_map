import React, { Component } from 'react';
import './App.css';
import State from '../State/state.js';
import CountryList from '../CountryList/countryList.js';
import Maps from '../Map/map.js';
import DataLoader from '../../utils/DataLoader.js';

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
    let timeseries_data = await this.data_loader.fetchCoronaData();
    let country_data = timeseries_data[0];
    let cur_date = timeseries_data[1];
    this.setState({
      full_data: full_data,
      country_data: country_data,
      cur_date: cur_date,
    });
  }
}

export default App;
