import React, { Component } from 'react';
import './state.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const data = [
  {
   infected: 10000,
   healed:    2000,
   dead:       800,
   objectID:     0,
  },
];

class State extends Component {
  constructor(props) {
    super(props);

    this.name = props.name;
    this.searchTerm = props.QUERY;

    this.state = {
      data: data,
      result: null,
    };

    this.setCoronaData = this.setCoronaData.bind(this);
    this.fetchCoronaData = this.fetchCoronaData.bind(this);
  }

  render() {
    const { data, result } = this.state;

    if (!result) { return null; }

    return (
      <div className="State">
        {
          this.state.data.map(item =>
            <div key={item.objectID} className="Data">
             <h3>{this.name}</h3>
              <p>Infected: {item.infected} </p>
              <p>Healed: {item.healed} </p>
              <p>Dead: {item.dead} </p>
            </div>
            )
        }    
        <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">State</th>
            <th scope="col">Infected</th>
            <th scope="col">Deaths</th>
            <th scope="col">Recovered</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Global</th>
            <td>{result.infected}</td>
            <td>{result.deaths}</td>
            <td>{result.recovered}</td>
          </tr>
          <tr>
            <th scope="row">Germany</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">USA</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
    );
  }

  setCoronaData(result) {
    console.log(typeof result);
    console.log("da " + result);
    console.log(result);
    this.setState({ result: {
      infected: result.confirmed,
      deaths: result.deaths,
      recovered: result.recovered,
    } });
  }

  fetchCoronaData(searchTerm) {
    console.log('fetch');
    fetch(searchTerm, {
      method: 'GET', 
    //   headers: {
    //     "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
	  //     "x-rapidapi-key": "SIGN-UP-FOR-KEY"
    // },
      })
      .then(response => response.json())
      .then(result => this.setCoronaData(result))
      .catch(e => e);
  }

  componentDidMount() {
    console.log(this.searchTerm);
    this.fetchCoronaData(this.searchTerm);
  }
}

export default State;
