import React from 'react';
import PropTypes from 'prop-types';

export default function InfoBox({ countryData, population }) {
  const {
    country, confirmed, deaths, recovered,
  } = countryData;
  const infected = confirmed - deaths - recovered;
  const infectedPercentage = (infected / confirmed) * 100;
  const recoveredPercentage = (recovered / confirmed) * 100;
  const deathsPercentage = (deaths / confirmed) * 100;
  console.log(deathsPercentage);
  return (
    <div>
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
        width: '18%',
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
            <div style={
              { textAlign: 'left' }
        }
            >
              <h4 style={
                { textAlign: 'center' }
          }
              >
                {country}
              </h4>
              <div style={{}}>
                Total Cases:
                {' '}
                {confirmed}
              </div>
              <div
                className="bar"
                style={{
                  height: '10px',
                  width: '99%',
                  display: 'flex',
                  textAlign: 'center',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <div
                  className="slice"
                  style={{
                    background: 'rgb(255, 64, 0)', width: `${infectedPercentage}%`, marginRight: '4px', borderRadius: '.2rem',
                  }}
                />
                <div
                  className="slice"
                  style={{
                    background: 'rgb(96, 187, 105)', width: `${recoveredPercentage}%`, marginRight: '4px', borderRadius: '.2rem',
                  }}
                />
                <div className="slice" style={{ background: 'rgb(0, 0, 0)', width: `${deathsPercentage}%`, borderRadius: '.2rem' }} />
              </div>
              <div style={{}}>
                Currently Infected:
                {' '}
                {infected}
              </div>
              <div style={{}}>
                Recovered:
                {' '}
                {recovered}
              </div>
              <div style={{}}>
                Deaths:
                {' '}
                {deaths}
              </div>
              <div style={{}} />
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
