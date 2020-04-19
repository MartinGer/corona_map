/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';

import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

import './map.css';
import GradientBar from '../../utils/GradientBar';
import geoJSON from '../../data/countries.geo.json';

export default class Maps extends Component {
  constructor(props) {
    super(props);
    this.todaysData = {};
    this.maxInfected = 0;
    this.maxInfectedFraction = 0;

    this.state = {
      lat: 36,
      lng: 0,
      zoom: 3,
      zoomSnap: 0.90,
      fractionMode: true,
      status: 'Infected Percentage of Population',
    };
  }

  getColorFraction = (countryCode) => {
    if (this.todaysData[countryCode]) {
      const { confirmed, deaths, recovered } = this.todaysData[countryCode];
      const { populationData } = this.props;
      const currentInfected = confirmed - deaths - recovered;
      const infectedFraction = currentInfected / populationData[countryCode];
      const rgb = (255
        - Math.round((infectedFraction / this.maxInfectedFraction) * 255));
      return `rgb(${rgb},${rgb},${rgb})`;
    }
    return 'rgb(255,255,255)';
  };

  getColorFull = (countryCode) => {
    if (this.todaysData[countryCode]) {
      const { confirmed, deaths, recovered } = this.todaysData[countryCode];
      const currentInfected = confirmed - deaths - recovered;
      const rgb = (255
        - Math.round((currentInfected / this.maxInfected) * 255));
      return `rgb(${rgb},${rgb},${rgb})`;
    }
    return 'rgb(255,255,255)';
  };

  styleMap = (feature) => ({
    // eslint-disable-next-line react/destructuring-assignment
    fillColor: this.state.fractionMode ? this.getColorFraction(feature.properties.iso_a2)
      : this.getColorFull(feature.properties.iso_a2),
    weight: 2,
    opacity: 1,
    color: 'grey',
    dashArray: '3',
    fillOpacity: 0.7,
    position: 'relative',
  });

  changeStatusToFraction = () => {
    const { fractionMode, status } = this.state;
    if (status === 'Confirmed Infections' && fractionMode === false) {
      this.setState({ status: 'Infected Percentage of Population' });
      this.setState({ fractionMode: true });
    }
  }

  changeStatusToInfectedCases = () => {
    const { fractionMode, status } = this.state;
    if (status === 'Infected Percentage of Population' && fractionMode === true) {
      this.setState({ status: 'Confirmed Infections' });
      this.setState({ fractionMode: false });
    }
  }

  highlightCountry = ({ target }) => {
    target.setStyle({
      weight: 4,
      color: '#666',
      fillOpacity: 0.7,
    });

    // this.info.update(target.feature.properties);
  };

  resetHighlight = ({ target }) => {
    target.setStyle(this.styleMap(target.feature));
    // this.info.update();
  };

  zoomToCountry = ({ target }) => {
    target._map.fitBounds(target.getBounds().pad(0.05));
  }

  onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: this.highlightCountry,
      mouseout: this.resetHighlight,
      click: this.zoomToCountry,
    });
  };

  render() {
    const {
      lat, lng, zoom, zoomSnap, fractionMode, status,
    } = this.state;

    const { curDate, countryData, populationData } = this.props;

    if (Object.keys(this.todaysData).length === 0 && countryData && curDate) {
      countryData[curDate].forEach((country) => {
        this.todaysData[country.countryCode] = country;
        const currentInfected = country.confirmed - country.deaths - country.recovered;
        this.maxInfected = Math.max(this.maxInfected, currentInfected);
        this.maxInfectedFraction = Math.max(this.maxInfectedFraction,
          currentInfected / populationData[country.countryCode]);
      });
    }

    return (
      <div className="MapContainer">
        <Map
          center={[lat, lng]}
          zoom={zoom}
          zoomSnap={zoomSnap}
          style={{
            width: '100%',
            height: '100%',
          }}
          worldCopyJump
        >
          <TileLayer
            attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON
            data={geoJSON}
            style={this.styleMap}
            onEachFeature={this.onEachFeature}
          />
          <GradientBar
            rgbStart={255}
            rgbEnd={0}
            max={fractionMode ? (this.maxInfectedFraction * 100).toFixed(2)
              : this.maxInfected}
            changeStatusToFraction={this.changeStatusToFraction}
            changeStatusToInfectedCases={this.changeStatusToInfectedCases}
            status={status}
          />
        </Map>
      </div>
    );
  }
}

Maps.defaultProps = {
  countryData: {},
  curDate: '',
  populationData: {},
};

Maps.propTypes = {
  countryData: PropTypes.objectOf(PropTypes.array),
  curDate: PropTypes.string,
  populationData: PropTypes.objectOf(PropTypes.number),
};
