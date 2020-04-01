import CountryInfo from './CountryInfo.js';

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

class DataLoader {
    country_data = {};
    full_data = {}
    cur_date = null;

    fetchFullCoronaData = () => {
        return axios.get(FULL_QUERY)
            .then(response => this.setFullCoronaData(response.data))
            .catch(e => e);
    }

    setFullCoronaData = (result) => {
        this.full_data = {
          infected: result.confirmed,
          deaths: result.deaths,
          recovered: result.recovered,
        };
      }

    fetchCoronaData = async () => {
        // console.log(countries)
        for await (const country of countries) {
            
            let searchTerm = COUNTRY_QUERY + country + SUM_UP_PARAM;
            // console.log(searchTerm)
            axios.get(searchTerm)
                .then(response => this.setCoronaData(response.data[0]))
                .catch(e => e);
        }
    }

    setCoronaData = (result) => {
        let country = result.countryregion;
        let location = result.location;
        let countrycode = result.countrycode;
        let timeseries = result.timeseries;
        // console.log(result)
        for (const [key, value] of Object.entries(timeseries)) {
            console.log(countrycode.iso2, [location.lat, location.lng], value)
            let countryInfo = new CountryInfo(countrycode.iso2,
                                            [location.lat, location.lng], 
                                            value.confirmed, 
                                            value.deaths,
                                            value.recovered
                                            );
            console.log(countryInfo)
            this.fillCoronaData(key, country, countryInfo);
        };
        if (this.cur_date === null) {
            this.cur_date = Object.keys(timeseries).pop();
        };
    }

    fillCoronaData = (timestamp, country, countryInfo) => {
        if (!this.country_data[timestamp]) {
            this.country_data[timestamp] = [];
        }
        // console.log(countryInfo)
        this.country_data[timestamp].push({country: countryInfo});
    }
}

export default DataLoader;

