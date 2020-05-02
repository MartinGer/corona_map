import React, { Component } from 'react';

import './App.css';
import CountryList from '../CountryList/CountryList';
import Map from '../Map/Map';
import DataLoader from '../DataLoader';
import Timeseries from '../Timeseries/Timeseries';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.dataLoader = new DataLoader();

    this.state = {
      fullData: null,
      countryData: null,
      curDate: null,
      populationData: null,
    };
  }

  async componentDidMount() {
    const fullData = await this.dataLoader.fetchFullCoronaData();
    const timeseriesData = await this.dataLoader.fetchCoronaData();
    const countryData = timeseriesData[0];
    const curDate = timeseriesData[1];
    const populationData = await this.dataLoader.fetchPopulationData();

    this.setState({
      fullData,
      countryData,
      curDate,
      populationData,
    });
  }

  render() {
    const {
      curDate, fullData, countryData, populationData,
    } = this.state;

    return (
      <div className="app">
        <div className="components">
          <CountryList curDate={curDate} fullData={fullData} countryData={countryData} />
          <Map curDate={curDate} countryData={countryData} populationData={populationData} />
          <Timeseries curDate={curDate} countryData={countryData} />
        </div>
      </div>
    );
  }
}
