const PATH_BASE = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu';
const PATH_TIMESERIES = '/timeseries';
const PATH_SEARCH = 'iso2=';
const COUNTRY_QUERY = `${PATH_BASE}${PATH_TIMESERIES}?${PATH_SEARCH}`;
const SUM_UP_PARAM = '&onlyCountries=false';

const countryList = require('country-list');
const countries = countryList.getCodes();

class DataLoader {
    data = {};

    constructor() {
        console.log('Setup dataloader');
        countries.forEach(this.fetch_data);
    }

    fetch_data = (country) => {
        console.log('Load data for', country);
        let searchTerm = COUNTRY_QUERY + country + SUM_UP_PARAM;
        fetch(searchTerm, {
            method: 'GET', 
            })
            .then(response => response.json())
            .then(result => this.set_data(result))
            .catch(e => console.log(e));
        }

    set_data(result) {
        console.log('Fill data');
        // let country = result.countryregion;
        // let location = result.location;
        // let countrycode = result.countrycode;
        // let timeseries = result.timeseries;

        // timeseries.forEach(this.fill_data);
    }

    // fetch_data(country) {
    //     console.log('Load data for', country);
    //     let searchTerm = COUNTRY_QUERY + country + SUM_UP_PARAM;
    //     axios.get(searchTerm)
    //         // .then(response => console.log(response.data[0]))
    //         .then(response => this.set_data(response))
    //         .catch(e => e);
    // }



    fill_data(cur_data) {
        console.log(cur_data);
        // let timestamp = cur_data.
        // if !(this.data[])
    }
}

export default DataLoader;