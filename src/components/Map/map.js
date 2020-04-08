import React, { Component } from 'react';
import './map.css';
import {
  Map, TileLayer, Marker, Popup, GeoJSON,
} from 'react-leaflet';

import PropTypes from 'prop-types';
import geoJSON from '../../data/countries.geo.json';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

// const style = ({ properties }) => properties.style;

export default class Maps extends Component {
  constructor(props) {
    super(props);
    this.todaysData = {};
    this.maxConfirmed = 0;
    this.state = {
      lat: 36,
      lng: 0,
      zoom: 3,
      zoomSnap: 0.88,
    };
  }

  // zoomToFeature = ({ target }) => {
  //   target._map.fitBounds(target.getBounds().pad(0.05));
  // }

  // highlightFeature = ({ target }) => {
  //   target.setStyle({
  //     weight: 5,
  //     color: '#666',
  //     dashArray: '',
  //     fillOpacity: 0.7,
  //   });

  //   if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
  //     target.bringToFront();
  //   }

  //   this.info.update(target.feature.properties);
  // };

  // resetHighlight = ({ target }) => {
  //   target.setStyle(style(target.feature));
  //   this.info.update();
  // };

  // onEachFeature = (feature, layer) => {
  //   layer.on({
  //     mouseover: this.highlightFeature,
  //     mouseout: this.resetHighlight,
  //     click: this.zoomToFeature,
  //   });
  // };

  // fetch = () => {
  //   console.log(geoJSON);
  //   return <GeoJSON data={geoJSON} />;
  // }

  getColor = (countryCode) => {
    if (this.todaysData[countryCode]) {
      const { confirmed } = this.todaysData[countryCode];
      const rgb = 255 - Math.round((confirmed / this.maxConfirmed) * 255);
      return `rgb(${rgb},${rgb},${rgb})`;
    }
    return 'rgb(255,255,255)';
  };

  styleMap = (feature) => ({
    fillColor: this.getColor(feature.properties.iso_a2),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
  });

  render() {
    const {
      lat, lng, zoom, zoomSnap,
    } = this.state;

    const { curDate, countryData } = this.props;

    if (Object.keys(this.todaysData).length === 0 && countryData && curDate) {
      countryData[curDate].forEach((country) => {
        this.todaysData[country.countryCode] = country;
        this.maxConfirmed = Math.max(this.maxConfirmed, country.confirmed);
      });
    }

    return (
      <div className="Map">
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
          <GeoJSON
            data={geoJSON}
            // onEachFeature: console.log(features)
            style={this.styleMap}
          />
          <TileLayer
            attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Map>
      </div>
    );
  }
}

Maps.defaultProps = {
  countryData: {},
  curDate: '',
};

Maps.propTypes = {
  countryData: PropTypes.objectOf(PropTypes.array),
  curDate: PropTypes.string,
};
