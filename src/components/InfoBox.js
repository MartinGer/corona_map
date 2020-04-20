import React from 'react';
import PropTypes from 'prop-types';

export default function InfoBox({ countryData, population }) {
  const {
    country, confirmed, deaths, recovered,
  } = countryData;
  const infected = confirmed - deaths - recovered;
  return (
    <div style={
      { alignItems: 'left' }
}
    >
      {!(Object.keys(countryData).length === 0) && population
        ? (
          <div
            className="infoBox"
            style={
      {
        padding: '.75rem',
        background: 'rgba(20,23,25,0.5)',
        boxShadow: '0 0 1rem rgba(0,0,0,0.2)',
        borderRadius: '.25rem',
        width: '13%',
        height: '13%',
        top: '1.5%',
        right: '1.5%',
        zIndex: '500',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        color: 'white',
      }
    }
          >
            <div>
              <h4>{country}</h4>
              <div style={{}}>
                Total Cases:
                {' '}
                {confirmed}
              </div>
              <div style={{}}>
                Currently Infected:
                {' '}
                {infected}
              </div>
              <div style={{}}>
                Deaths:
                {' '}
                {deaths}
              </div>
              <div style={{}}>
                Recovered:
                {' '}
                {recovered}
              </div>
              <div style={{}}>
                ~
                {((infected / population) * 100).toFixed(2)}
                % of
                {' '}
                {population}
                {' '}
                people are currently infected
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
