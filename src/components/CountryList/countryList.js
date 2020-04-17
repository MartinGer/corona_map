import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';

import './countryList.css';
import compareValues from '../../utils/UtilFunctions';

const sortTypes = {
  country: {
    asc: {
      class: 'sort-up',
      fn: compareValues('country', 'asc'),
    },
    desc: {
      class: 'sort-down',
      fn: compareValues('country', 'desc'),
    },
  },
  confirmed: {
    asc: {
      class: 'sort-up',
      fn: compareValues('confirmed', 'asc'),
    },
    desc: {
      class: 'sort-down',
      fn: compareValues('confirmed', 'desc'),
    },
  },
  deaths: {
    asc: {
      class: 'sort-up',
      fn: compareValues('deaths', 'asc'),
    },
    desc: {
      class: 'sort-down',
      fn: compareValues('deaths', 'desc'),
    },
  },
  recovered: {
    asc: {
      class: 'sort-up',
      fn: compareValues('recovered', 'asc'),
    },
    desc: {
      class: 'sort-down',
      fn: compareValues('recovered', 'desc'),
    },
  },
};

export default class CountryList extends Component {
  constructor(props) {
    super(props);

    this.state = { sortBy: 'confirmed', sortHow: 'desc' };
  }

  sort = (buttonId) => {
    const { sortHow } = this.state;
    if (buttonId === 'countryButton') {
      this.setState({
        sortBy: 'country',
        sortHow: sortHow === 'asc' ? 'desc' : 'asc',
      });
    } else if (buttonId === 'confirmedButton') {
      this.setState({
        sortBy: 'confirmed',
        sortHow: sortHow === 'asc' ? 'desc' : 'asc',
      });
    } else if (buttonId === 'deathsButton') {
      this.setState({
        sortBy: 'deaths',
        sortHow: sortHow === 'asc' ? 'desc' : 'asc',
      });
    } else if (buttonId === 'recoveredButton') {
      this.setState({
        sortBy: 'recovered',
        sortHow: sortHow === 'asc' ? 'desc' : 'asc',
      });
    }
  }

  render() {
    const { fullData, countryData, curDate } = this.props;
    const { sortBy, sortHow } = this.state;

    let summarizedData;
    let seperateData;

    if (fullData) {
      summarizedData = (
        <tr>
          <th scope="row">Global</th>
          <td>{fullData.infected}</td>
          <td>{fullData.deaths}</td>
          <td>{fullData.recovered}</td>
        </tr>
      );
    }
    if (countryData) {
      const curData = countryData[curDate].sort(sortTypes[sortBy][sortHow].fn);
      seperateData = (
        curData.map((countryInfo) => (
          <React.Fragment key={countryInfo.countryCode}>
            <tr>
              <th scope="row">{countryInfo.country}</th>
              <td>{countryInfo.confirmed}</td>
              <td>{countryInfo.deaths}</td>
              <td>{countryInfo.recovered}</td>
            </tr>
          </React.Fragment>
        ))
      );
    }

    return (
      <div className="CountryList">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col" className="header">
                State
                <button type="button" id="countryButton" onClick={(e) => this.sort(e.target.id)}>
                  <i className={`fas fa-${sortTypes[sortBy][sortHow].class}`} />
                </button>
              </th>
              <th scope="col" className="header">
                Infected
                <button type="button" id="confirmedButton" onClick={(e) => this.sort(e.target.id)}>
                  <i className={`fas fa-${sortTypes[sortBy][sortHow].class}`} />
                </button>
              </th>
              <th scope="col" className="header">
                Deaths
                <button type="button" id="deathsButton" onClick={(e) => this.sort(e.target.id)}>
                  <i className={`fas fa-${sortTypes[sortBy][sortHow].class}`} />
                </button>
              </th>
              <th scope="col" className="header">
                Recovered
                <button type="button" id="recoveredButton" onClick={(e) => this.sort(e.target.id)}>
                  <i className={`fas fa-${sortTypes[sortBy][sortHow].class}`} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {summarizedData}
            {seperateData}
          </tbody>
        </table>
      </div>
    );
  }
}

CountryList.defaultProps = {
  fullData: {},
  countryData: {},
  curDate: '',
};

CountryList.propTypes = {
  fullData: PropTypes.objectOf(PropTypes.number),
  countryData: PropTypes.objectOf(PropTypes.array),
  curDate: PropTypes.string,
};
