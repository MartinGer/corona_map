import React, { Component } from 'react';

import './App.css';
import CountryList from '../CountryList/countryList';
import Map from '../Map/map';
import DataLoader from '../DataLoader';

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
      <div className="App">
        <div className="Components">
          <CountryList curDate={curDate} fullData={fullData} countryData={countryData} />
          <Map curDate={curDate} countryData={countryData} populationData={populationData} />
        </div>
      </div>
    );
  }
}

export {
  CountryList,
  Map,
};
