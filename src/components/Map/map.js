import React, { Component } from 'react';
import './map.css';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';

import PropTypes from 'prop-types';
import geoJSON from '../../data/countries.geo.json';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default class Maps extends Component {
  constructor(props) {
    super(props);
    this.todaysData = {};
    this.maxConfirmed = 0;
    this.maxConfirmedPercentage = 0;

    this.state = {
      lat: 36,
      lng: 0,
      zoom: 3,
      zoomSnap: 0.88,
    };
  }

  getColor = (countryCode) => {
    if (this.todaysData[countryCode]) {
      const { confirmed } = this.todaysData[countryCode];
      const { populationData } = this.props;
      const confirmedPercentage = confirmed / populationData[countryCode];
      const rgb = (255
        - Math.round((confirmedPercentage / this.maxConfirmedPercentage) * 255)) - 40;
      return `rgb(${rgb},${rgb},${rgb})`;
    }
    return 'rgb(255,255,255)';
  };

  styleMap = (feature) => ({
    fillColor: this.getColor(feature.properties.iso_a2),
    weight: 2,
    opacity: 1,
    color: 'grey',
    dashArray: '3',
    fillOpacity: 0.7,
    position: 'relative',
  });

  styleBar = () => ({
    border: 'solid',
    borderWidth: 'thin',
    backgroundImage: 'linear-gradient(to right, rgb(200,255,255), rgb(255,255,255))',
    width: '30%',
    height: '2%',
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    zIndex: '500',
  });

  render() {
    const {
      lat, lng, zoom, zoomSnap,
    } = this.state;

    const { curDate, countryData, populationData } = this.props;

    if (Object.keys(this.todaysData).length === 0 && countryData && curDate) {
      countryData[curDate].forEach((country) => {
        this.todaysData[country.countryCode] = country;
        this.maxConfirmed = Math.max(this.maxConfirmed, country.confirmed);
        this.maxConfirmedPercentage = Math.max(this.maxConfirmedPercentage,
          country.confirmed / populationData[country.countryCode]);
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
          />
          <GradientBar
            rgbStart={255}
            rgbEnd={0}
            max={1000}
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

function GradientBar({ rgbStart, rgbEnd, max }) {
  return (
    <div
      className="legend"
      style={
      {
        border: 'solid',
        borderWidth: 'thin',
        backgroundImage: `linear-gradient(to right, rgb(${rgbStart},${rgbStart},${rgbStart}), rgb(${rgbEnd},${rgbEnd},${rgbEnd}))`,
        width: '30%',
        height: '2%',
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        zIndex: '500',
      }
    }
    >
      <div
        className="gradientBar"
      />
      <p style={{
        top: '100%',
        position: 'absolute',
      }}
      >
        0
      </p>
      <p style={{
        top: '100%',
        left: '25%',
        position: 'absolute',
      }}
      >
        Percentage of Confirmed Cases
      </p>
      <p style={{
        top: '100%',
        left: '90%',
        position: 'absolute',
      }}
      >
        { max }
      </p>
    </div>
  );
}
