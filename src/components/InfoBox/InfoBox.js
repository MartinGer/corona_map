import React from 'react';
import PropTypes from 'prop-types';

import CanvasJSReact from '../../utils/canvasjs.react';

import './InfoBox.css';

const { CanvasJSChart } = CanvasJSReact;

const fillDataPoints = (countryData, country) => {
  const dataPointsInfected = [];
  const dataPointsRecovered = [];
  const dataPointsDeaths = [];
  Object.entries(countryData).forEach(([key, value]) => {
    Object.entries(value).forEach((countryInfo) => {
      if (countryInfo[1].country === country) {
        const [month, day, year] = key.split('/');
        dataPointsInfected.push({
          x: new Date(year, month, day),
          y: countryInfo[1].confirmed - countryInfo[1].recovered - countryInfo[1].deaths,
        });
        dataPointsRecovered.push({ x: new Date(year, month, day), y: countryInfo[1].recovered });
        dataPointsDeaths.push({ x: new Date(year, month, day), y: countryInfo[1].deaths });
      }
    });
  });
  return [dataPointsInfected, dataPointsRecovered, dataPointsDeaths];
};

export default function InfoBox({ todaysData, population, countryData }) {
  const {
    country, confirmed, deaths, recovered,
  } = todaysData;
  const infected = confirmed - deaths - recovered;
  const infectedPercentage = (infected / confirmed) * 100;
  const recoveredPercentage = (recovered / confirmed) * 100;
  const deathsPercentage = (deaths / confirmed) * 100;

  let options = {};

  if (countryData && country) {
    const [
      dataPointsInfected, dataPointsRecovered,
      dataPointsDeaths,
    ] = fillDataPoints(countryData, country);

    options = {
      animationEnabled: true,
      zoomEnabled: true,
      axisX: {
        valueFormatString: 'DD MMM',
      },
      axisY: {
        includeZero: false,
      },
      height: 200,
      data: [{
        yValueFormatString: '#.###',
        xValueFormatString: 'DD/MM',
        type: 'spline',
        color: 'red',
        dataPoints: dataPointsInfected,
      },
      {
        yValueFormatString: '#.###',
        xValueFormatString: 'DD/MM',
        type: 'spline',
        color: 'green',
        dataPoints: dataPointsRecovered,
      },
      {
        yValueFormatString: '#.###',
        xValueFormatString: 'DD/MM',
        type: 'spline',
        color: 'black',
        dataPoints: dataPointsDeaths,
      },
      ],
    };
  }
  return (
    <div>
      {!(Object.keys(todaysData).length === 0) && population
        ? (
          <div className="infoBox">
            <h4>{country}</h4>
            <div className="totalLine">
              Total Cases:
              {' '}
              {(confirmed || '-').toLocaleString()}
            </div>
            <div className="bar">
              <div className="slice red" style={{ width: `${infectedPercentage}%` }} />
              <div className="slice green" style={{ width: `${recoveredPercentage}%` }} />
              <div className="slice black" style={{ width: `${deathsPercentage}%` }} />
            </div>
            <div className="infoLine">
              <div className="circle red" />
              <div className="infoLineText">Currently Infected:</div>
              <div className="infoLineData">{(infected || '-').toLocaleString()}</div>
            </div>
            <div className="infoLine">
              <div className="circle green" />
              <div className="infoLineText">Recovered:</div>
              <div className="infoLineData">{(recovered || '-').toLocaleString()}</div>
            </div>
            <div className="infoLine">
              <div className="circle black" />
              <div className="infoLineText">Deaths:</div>
              <div className="infoLineData">{(deaths || '-').toLocaleString()}</div>
            </div>
            <div className="percentageLine">
              ~
              {((infected / population) * 100).toFixed(2)}
              % of
              {' '}
              {population.toLocaleString()}
              {' '}
              people are currently infected
            </div>
            <CanvasJSChart className="chart" options={options} />
          </div>
        )
        : null }
    </div>
  );
}

InfoBox.defaultProps = {
  todaysData: {},
  population: 0,
  countryData: {},
};

InfoBox.propTypes = {
  todaysData: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.number,
    ]),
  ),
  population: PropTypes.number,
  countryData: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.number,
    ]),
  ),
};
