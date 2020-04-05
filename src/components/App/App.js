import React, { Component } from 'react';
import './App.css';
import CountryList from '../CountryList/countryList';
import Maps from '../Map/map';
import DataLoader from '../../utils/DataLoader';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.data_loader = new DataLoader();

    this.state = {
      fullData: null,
      countryData: null,
      curDate: null,
    };
  }

  async componentDidMount() {
    const fullData = await this.data_loader.fetchFullCoronaData();
    const timeseriesData = await this.data_loader.fetchCoronaData();
    const countryData = timeseriesData[0];
    const curDate = timeseriesData[1];
    this.setState({
      fullData,
      countryData,
      curDate,
    });
  }

  render() {
    const { curDate, fullData, countryData } = this.state;
    return (
      <div className="App">
        <h2>Corona Map</h2>
        <div className="Components">
          <CountryList curDate={curDate} fullData={fullData} countryData={countryData} />
          <Maps />
        </div>
      </div>
    );
  }
}
