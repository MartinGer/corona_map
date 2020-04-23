import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCaretDown, faCaretUp, faAngleLeft, faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

import './CountryList.css';
import compareValues from '../../utils/UtilFunctions';

library.add(faCaretDown, faCaretUp, faAngleLeft, faAngleRight);

const sortTypes = {
  country: {
    asc: {
      class: 'caret-up',
      fn: compareValues('country', 'asc'),
    },
    desc: {
      class: 'caret-down',
      fn: compareValues('country', 'desc'),
    },
  },
  confirmed: {
    asc: {
      class: 'caret-up',
      fn: compareValues('confirmed', 'asc'),
    },
    desc: {
      class: 'caret-down',
      fn: compareValues('confirmed', 'desc'),
    },
  },
  deaths: {
    asc: {
      class: 'caret-up',
      fn: compareValues('deaths', 'asc'),
    },
    desc: {
      class: 'caret-down',
      fn: compareValues('deaths', 'desc'),
    },
  },
  recovered: {
    asc: {
      class: 'caret-up',
      fn: compareValues('recovered', 'asc'),
    },
    desc: {
      class: 'caret-down',
      fn: compareValues('recovered', 'desc'),
    },
  },
};

export default class CountryList extends Component {
  constructor(props) {
    super(props);

    this.state = { sortBy: 'confirmed', sortHow: 'desc', hidden: false };
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

  changeCountryList = () => {
    const { hidden } = this.state;
    if (!hidden) {
      console.log('hide');
      this.setState({ hidden: true });
    } else {
      console.log('show');
      this.setState({ hidden: false });
    }
  }

  render() {
    const { fullData, countryData, curDate } = this.props;
    const { sortBy, sortHow, hidden } = this.state;

    let summarizedData;
    let seperateData;

    if (fullData) {
      summarizedData = (
        <tr>
          <th scope="row">Global</th>
          <td>{((fullData.infected - fullData.deaths - fullData.recovered) || '-').toLocaleString()}</td>
          <td>{(fullData.deaths || '-').toLocaleString()}</td>
          <td>{(fullData.recovered || '-').toLocaleString()}</td>
        </tr>
      );
    }
    if (countryData && Object.keys(countryData).length !== 0) {
      const curData = countryData[curDate].sort(sortTypes[sortBy][sortHow].fn);
      seperateData = (
        curData.map((countryInfo) => (
          <React.Fragment key={countryInfo.countryCode}>
            <tr>
              <th scope="row">{countryInfo.country}</th>
              <td>
                {((countryInfo.confirmed - countryInfo.deaths - countryInfo.recovered)
                  || '-').toLocaleString()}
              </td>
              <td>{(countryInfo.deaths || '-').toLocaleString()}</td>
              <td>{(countryInfo.recovered || '-').toLocaleString()}</td>
            </tr>
          </React.Fragment>
        ))
      );
    }

    return (
      <div className="countryList">
        <table className="table table-dark">
          <thead>
            <tr>
              <th>
                State
                <button type="button" id="countryButton" onClick={(e) => this.sort(e.target.id)}>
                  <FontAwesomeIcon className="icon" icon={sortTypes[sortBy][sortHow].class} />
                </button>
              </th>
              <th>
                Infected
                <button type="button" id="confirmedButton" onClick={(e) => this.sort(e.target.id)}>
                  <FontAwesomeIcon className="icon" icon={sortTypes[sortBy][sortHow].class} />
                </button>
              </th>
              <th>
                Deaths
                <button type="button" id="deathsButton" onClick={(e) => this.sort(e.target.id)}>
                  <FontAwesomeIcon className="icon" icon={sortTypes[sortBy][sortHow].class} />
                </button>
              </th>
              <th>
                Recovered
                <button type="button" id="recoveredButton" onClick={(e) => this.sort(e.target.id)}>
                  <FontAwesomeIcon className="icon" icon={sortTypes[sortBy][sortHow].class} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {summarizedData}
            {seperateData}
          </tbody>
        </table>
        <div className="hideArea">
          <button type="button" className="hideButton" onClick={() => this.changeCountryList()}>
            <FontAwesomeIcon size={120} className="hideIcon icon" icon={hidden ? 'angle-right' : 'angle-left'} />
          </button>
        </div>
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
