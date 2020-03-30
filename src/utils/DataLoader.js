const PATH_BASE = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu';
const PATH_TIMESERIES = '/timeseries';
const PATH_SEARCH = 'iso2=';
const COUNTRY_QUERY = `${PATH_BASE}${PATH_TIMESERIES}?${PATH_SEARCH}`;
const SUM_UP_PARAM = '&onlyCountries=false';

const countryList = require('country-list');
const countries = countryList.getCodes();

const axios = require('axios').default;

class DataLoader {
    data = {};

    constructor() {
        console.log('Setup dataloader');
        this.set_data = this.set_data.bind(this);
        countries.forEach(this.fetch_data);
    }

    fetch_data = (country) => {
        console.log('Load data for', country);
        let searchTerm = COUNTRY_QUERY + country + SUM_UP_PARAM;
        axios.get(searchTerm)
            .then(response => this.set_data(response.data[0]))
            .catch(e => e);
    }

    set_data(result) {
        // console.log(result);
        let country = result.countryregion;
        let location = result.location;
        let countrycode = result.countrycode;
        let timeseries = result.timeseries;
        // console.log(timeseries);
        for (const [key, value] of Object.entries(timeseries)) {
            console.log(key, value);
          }
    }

    fill_data(cur_data) {
        // console.log(cur_data);
        // let timestamp = cur_data.
        // if !(this.data[])
    }
}

export default DataLoader;