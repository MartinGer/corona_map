import React from 'react';
import PropTypes from 'prop-types';

import './InfoBox.css';

export default function InfoBox({ countryData, population }) {
  const {
    country, confirmed, deaths, recovered,
  } = countryData;
  const infected = confirmed - deaths - recovered;
  const infectedPercentage = (infected / confirmed) * 100;
  const recoveredPercentage = (recovered / confirmed) * 100;
  const deathsPercentage = (deaths / confirmed) * 100;

  return (
    <div>
      {!(Object.keys(countryData).length === 0) && population
        ? (
          <div className="infoBox">
            <div style={{ textAlign: 'left' }}>
              <h4>{country}</h4>
              <div className="totalLine">
                Total Cases:{' '}{(confirmed || '-').toLocaleString()}
              </div>
              <div className="bar">
                <div className="slice" style={{ background: 'rgb(255, 64, 0)', width: `${infectedPercentage}%`, marginRight: '4px' }} />
                <div className="slice" style={{ background: 'rgb(96, 187, 105)', width: `${recoveredPercentage}%`, marginRight: '4px' }} />
                <div className="slice" style={{ background: 'rgb(0, 0, 0)', width: `${deathsPercentage}%` }} />
              </div>
              <div className="infoLine">
                <div className="circle" style={{ background: 'rgb(255, 64, 0)' }} />
                <div className="infoLineText">Currently Infected:</div>
                <div className="infoLineData">{(infected || '-').toLocaleString()}</div>
              </div>
              <div className="infoLine">
                <div className="circle" style={{ background: 'rgb(96, 187, 105)' }} />
                <div className="infoLineText">Recovered:</div>
                <div className="infoLineData">{(recovered || '-').toLocaleString()}</div>
              </div>
              <div className="infoLine">
                <div className="circle" style={{ background: 'rgb(0, 0, 0)' }} />
                <div className="infoLineText">Deaths:</div>
                <div className="infoLineData">{(deaths || '-').toLocaleString()}</div>
              </div>
              <div className="percentageLine">
                ~{((infected / population) * 100).toFixed(2)}% of{' '}{population.toLocaleString()}{' '}people are currently infected
              </div>
            </div>
          </div>
        )
        : null }
    </div>
  );
}

InfoBox.defaultProps = {
  countryData: {},
  population: 0,
};

InfoBox.propTypes = {
  countryData: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.number,
    ]),
  ),
  population: PropTypes.number,
};
