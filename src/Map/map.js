import React, { Component } from 'react';
import './map.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import 'bootstrap/dist/css/bootstrap.min.css';

const countryList = require('country-list');
const countries = countryList.getCodes();

class Maps extends Component {
  constructor(props) {
    super(props);

    this.name = props.name;
    this.fullSearch = props.full_query;
    this.countrySearch = props.country_query;
    this.sum_up_param = props.sum_up_param;

    this.state = {
      lat: 37.7749,
      lng: -122.4194,
      zoom: 3,
    };

    this.setCoronaData = this.setCoronaData.bind(this);
    this.fetchCoronaData = this.fetchCoronaData.bind(this);
    this.setFullCoronaData = this.setFullCoronaData.bind(this);
    this.fetchFullCoronaData = this.fetchFullCoronaData.bind(this);
  }

  render() {
    const { full_result, countries_result} = this.state;

    return (
      <div className="Map">
        <Map 
          center={[this.state.lat, this.state.lng]} 
          zoom={this.state.zoom} 
          style={{ width: '100%', height: '900px'}}
        >
        <TileLayer
          attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Map>
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

export default Maps;
