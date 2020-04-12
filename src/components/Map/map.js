import React, { Component } from 'react';
import './map.css';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';

import PropTypes from 'prop-types';
import { Stage, Layer, Rect } from 'react-konva';
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
      <div className="Map">
        <GradientBar
          width={"20vh"}
          height={"100vh"}
        />
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
  populationData: {},
};

Maps.propTypes = {
  countryData: PropTypes.objectOf(PropTypes.array),
  curDate: PropTypes.string,
  populationData: PropTypes.objectOf(PropTypes.number),
};

const GradientBar = ({ width, height }) => (
  <Stage width={width} height={height}>
    <Layer>
      <Rect
        width={100}
        height={height}
        fill="red"
        shadowBlur={5}
      />
    </Layer>
  </Stage>

  // <div id="container"></div>
  // var width = window.innerWidth;
  // var height = window.innerHeight;
  // stage = new Konva.Stage({
  //   container: 'container',
  //   width: width,
  //   height: height
  // });

  // var layer = new Konva.Layer();

  // var rect1 = new Konva.Rect({
  //   x: 20,
  //   y: 20,
  //   width: 100,
  //   h eight: 50,
  //   fill: 'green',
  //   stroke: 'black',
  //   strokeWidth: 4
  // });
  // // add the shape to the layer
  // layer.add(rect1);
  // stage.add(layer);
  // // <View
  // //   style={{
  // //     height: 1,
  // //     backgroundColor: 'rgba(255, 255, 255 ,0.3)',
  // //     alignSelf: 'stretch',
  // //   }}
  // // />
);
