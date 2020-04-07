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

  getColor = (d) => {
    return d > 1000 ? '#800026'
      : d > 500 ? '#BD0026'
        : d > 200 ? '#E31A1C'
          : d > 100 ? '#FC4E2A'
            : d > 50 ? '#FD8D3C'
              : d > 20 ? '#FEB24C'
                : d > 10 ? '#FED976'
                  : '#FFEDA0';
  }

  render() {
    const {
      lat, lng, zoom, zoomSnap,
    } = this.state;

    const { curDate, countryData } = this.props;

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
            style={{
              fillColor: this.getColor(500),
              weight: 2,
              opacity: 1,
              color: 'white',
              dashArray: '3',
              fillOpacity: 0.7,
            }}
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

// Maps.defaultProps = {
//   geoData: {},
// };

// Maps.propTypes = {
//   placeholderProp(props, geoData, Maps) {
//     try {
//       JSON.parse(props[geoData]);
//     } catch (e) {
//       return new Error(`Invalid prop \`${geoData}\` supplied to \`${Maps}\`. Validation failed.`);
//     }
//   },
// };
