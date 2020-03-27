import React, { Component } from 'react';
import './App.css';
import State from '../State/state.js'

const PATH_BASE = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu';
const PATH_LATEST = '/latest';
const PATH_BRIEF =  '/brief';
const PATH_SEARCH = 'iso2=';
const COUNTRY_QUERY = `${PATH_BASE}${PATH_LATEST}?${PATH_SEARCH}`;
const FULL_QUERY = `${PATH_BASE}${PATH_BRIEF}`;  //https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief   
const SUM_UP_PARAM = '&onlyCountries=true';

class App extends Component {

  render() {
    return (
        <div className="App">
          <h2>Corona Map</h2>
          <State name="Berlin" full_query={FULL_QUERY} country_query={COUNTRY_QUERY} sum_up_param={SUM_UP_PARAM}></State>
      </div>
    );
  }
}

export default App;
