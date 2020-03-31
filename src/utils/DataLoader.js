import CountryInfo from './CountryInfo';
import React, { Component } from 'react';

const PATH_BASE = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu';
const PATH_TIMESERIES = '/timeseries';
const PATH_SEARCH = 'iso2=';
const PATH_BRIEF =  '/brief';
const COUNTRY_QUERY = `${PATH_BASE}${PATH_TIMESERIES}?${PATH_SEARCH}`;
const FULL_QUERY = `${PATH_BASE}${PATH_BRIEF}`;  //https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief   
const SUM_UP_PARAM = '&onlyCountries=false';

const countryList = require('country-list');
const countries = countryList.getCodes();

const axios = require('axios').default;

class DataLoader extends Component {
    country_data = {};
    full_data = {}
    cur_date = null;

    constructor() {
        // this.fetchFullCoronaData(FULL_QUERY);
        // countries.forEach(this.fetchCoronaData);
    }

    fetchData = () => {
        return new Promise(function (resolve, reject) {
            resolve(this.fetchFullCoronaData(FULL_QUERY));
            // resolve(countries.forEach(this.fetchCoronaData));
          });
        // return this.fetchFullCoronaData(FULL_QUERY);
        // countries.forEach(this.fetchCoronaData);
    }

    fetchFullCoronaData = () => {
        return axios.get(FULL_QUERY)
            .then(response => this.setFullCoronaData(response.data))
            .catch(e => e);
    }

    setFullCoronaData = (result) => {
        console.log(result)
        this.full_data = {
          infected: result.confirmed,
          deaths: result.deaths,
          recovered: result.recovered,
        };
        console.log(this.full_data)
      }

    async fetchCoronaData = (country) => {
        let searchTerm = COUNTRY_QUERY + country + SUM_UP_PARAM;
        return axios.get(searchTerm)
            .then(console.log('before set'))
            .then(response => { await this.setCoronaData(response.data[0]) })
            .then(console.log('after set'))
            .catch(e => e);
    }

    async setCoronaData = (result) => {
        let country = result.countryregion;
        let location = result.location;
        let countrycode = result.countrycode;
        let timeseries = result.timeseries;
        console.log('before fill')
        for (const [key, value] of Object.entries(timeseries)) {
            const countryInfo = new CountryInfo(  countrycode,
                                            location, 
                                            value.confirmed, 
                                            value.deaths,
                                            value.recovered
                                            );
            console.log('fill')
            await this.fillCoronaData(key, country, countryInfo);
        };
        if (this.cur_date === null) {
            this.cur_date = Object.keys(timeseries).pop();
            console.log(this.cur_date)
        };
    }

    async fillCoronaData(timestamp, country, countryInfo) {
        // console.log(countryInfo)
        if (!this.country_data[timestamp]) {
            this.country_data[timestamp] = [];
        }
        this.country_data[timestamp].push({country: countryInfo});
        return
    }
}

export default DataLoader;