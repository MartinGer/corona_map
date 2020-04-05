import React, { Component } from 'react';
import './map.css';
import {
  Map, TileLayer, Marker, Popup,
} from 'react-leaflet';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default class Maps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 37.7749,
      lng: -122.4194,
      zoom: 3,
    };
  }

  render() {
    const { lat, lng, zoom } = this.state;
    return (
      <div className="Map">
        <Map
          center={[lat, lng]}
          zoom={zoom}
          style={{ width: '100%', height: '900px' }}
        >
          <TileLayer
            attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Map>
      </div>
    );
  }
}
