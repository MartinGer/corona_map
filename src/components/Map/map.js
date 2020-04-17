import React, { Component } from 'react';

import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

import './map.css';
import geoJSON from '../../data/countries.geo.json';

export default class Maps extends Component {
  constructor(props) {
    super(props);
    this.todaysData = {};
    this.maxConfirmed = 0;
    this.maxConfirmedFraction = 0;

    this.state = {
      lat: 36,
      lng: 0,
      zoom: 3,
      zoomSnap: 0.90,
      fractionMode: true,
      status: 'Percentage of Population',
    };
  }

  getColorFraction = (countryCode) => {
    if (this.todaysData[countryCode]) {
      const { confirmed } = this.todaysData[countryCode];
      const { populationData } = this.props;
      const confirmedFraction = confirmed / populationData[countryCode];
      const rgb = (255
        - Math.round((confirmedFraction / this.maxConfirmedFraction) * 255));
      return `rgb(${rgb},${rgb},${rgb})`;
    }
    return 'rgb(255,255,255)';
  };

  getColorFull = (countryCode) => {
    if (this.todaysData[countryCode]) {
      const { confirmed } = this.todaysData[countryCode];
      const rgb = (255
        - Math.round((confirmed / this.maxConfirmed) * 255));
      return `rgb(${rgb},${rgb},${rgb})`;
    }
    return 'rgb(255,255,255)';
  };

  styleMap = (feature) => ({
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
    if (status === 'Confirmed Cases' && fractionMode === false) {
      this.setState({ status: 'Percentage of Population' });
      this.setState({ fractionMode: true });
    }
  }

  changeStatusToConfirmedCases = () => {
    const { fractionMode, status } = this.state;
    if (status === 'Percentage of Population' && fractionMode === true) {
      this.setState({ status: 'Confirmed Cases' });
      this.setState({ fractionMode: false });
    }
  }

  render() {
    const {
      lat, lng, zoom, zoomSnap, fractionMode, status,
    } = this.state;

    const { curDate, countryData, populationData } = this.props;

    if (Object.keys(this.todaysData).length === 0 && countryData && curDate) {
      countryData[curDate].forEach((country) => {
        this.todaysData[country.countryCode] = country;
        this.maxConfirmed = Math.max(this.maxConfirmed, country.confirmed);
        this.maxConfirmedFraction = Math.max(this.maxConfirmedFraction,
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
            max={fractionMode ? (this.maxConfirmedFraction * 100).toFixed(2)
              : this.maxConfirmed}
            changeStatusToFraction={this.changeStatusToFraction}
            changeStatusToConfirmedCases={this.changeStatusToConfirmedCases}
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

function GradientBar({
  rgbStart, rgbEnd, max, changeStatusToFraction, changeStatusToConfirmedCases, status,
}) {
  return (
    <div
      className="legend"
      style={
      {
        border: 'solid',
        borderWidth: 'thin',
        backgroundImage: `linear-gradient(to right, rgb(${rgbStart},${rgbStart},${rgbStart}), rgb(${rgbEnd},${rgbEnd},${rgbEnd}))`,
        width: '25%',
        height: '1.5%',
        position: 'absolute',
        bottom: '4%',
        right: '4%',
        zIndex: '500',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }
    }
    >
      <div
        className="gradientBar"
      />
      <p style={{
        top: '110%',
        left: '0%',
        position: 'absolute',
      }}
      >
        0
      </p>
      <p style={{
        top: '110%',
        right: '0%',
        position: 'absolute',
      }}
      >
        { max }
      </p>
      <DropdownButton
        id="dropdown-item-button"
        title={status}
        className="format"
        size="sm"
        variant="secondary"
        style={{
          top: '110%',
          position: 'absolute',
        }}
      >
        <Dropdown.Item as="button"><div role="button" tabIndex={0} onClick={changeStatusToFraction} onKeyDown={changeStatusToFraction}> Percentage of Population </div></Dropdown.Item>
        <Dropdown.Item as="button"><div role="button" tabIndex={0} onClick={changeStatusToConfirmedCases} onKeyDown={changeStatusToConfirmedCases}> Confirmed Cases </div></Dropdown.Item>
      </DropdownButton>
    </div>
  );
}

GradientBar.defaultProps = {
  rgbStart: 0,
  rgbEnd: 0,
  max: 0,
  changeStatusToFraction: null,
  changeStatusToConfirmedCases: null,
  status: '',
};

GradientBar.propTypes = {
  rgbStart: PropTypes.number,
  rgbEnd: PropTypes.number,
  max: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  changeStatusToFraction: PropTypes.func,
  changeStatusToConfirmedCases: PropTypes.func,
  status: PropTypes.string,
};
