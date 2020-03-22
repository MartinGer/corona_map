import React, { Component } from 'react';
import './App.css';
import State from '../State/state.js'

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
//const QUERY = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
const QUERY = "https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief";

class App extends Component {

  render() {
    var helloWorld = 'Welcome to the Road to learn React!';
    return (
        <div className="App">
          <h2>{helloWorld}</h2>
          <State name="Berlin" QUERY={QUERY}></State>
      </div>
    );
  }
}

export default App;
