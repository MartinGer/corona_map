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

    fetchFullCoronaData = async () => {
        const response = await axios.get(FULL_QUERY);
        const full_data = this.setFullCoronaData(response.data);
        return full_data;
    }

    setFullCoronaData = (result) => {
        const full_data = {
          infected: result.confirmed,
          deaths: result.deaths,
          recovered: result.recovered,
        };
        return full_data;
      }
    
    fetchCoronaData = async () => {
        let countries = ['US', 'GB', 'AU', 'GR'];  // TODO: Parallize calls to be faster
        for (const country of countries) {
            const searchTerm = COUNTRY_QUERY + country + SUM_UP_PARAM;
            await axios.get(searchTerm)
            .then(response => this.setCoronaData(response.data[0]))
            .catch(e => e);  
            console.log(this.country_data)
        }; 
        return this.country_data, this.cur_date;
    }
      
    setCoronaData = (result) => {
        let country = result.countryregion;
        let location = result.location;
        let countrycode = result.countrycode;
        let timeseries = result.timeseries;
        for (const [key, value] of Object.entries(timeseries)) {
            let countryInfo = new CountryInfo(countrycode.iso2,
                                            [location.lat, location.lng], 
                                            value.confirmed, 
                                            value.deaths,
                                            value.recovered
                                            );
            this.fillCoronaData(key, country, countryInfo);
        };
        if (this.cur_date === null) {
            this.cur_date = Object.keys(timeseries).pop();
            console.log(this.cur_date)
        };
    }

    fillCoronaData = (timestamp, country, countryInfo) => {
        if (!this.country_data[timestamp]) {
            this.country_data[timestamp] = [];
        }
        this.country_data[timestamp].push({country: countryInfo});
    }
}

export default DataLoader;

