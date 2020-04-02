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

const {Dataset} = require('data.js')
const GEOJSON_PATH = 'https://datahub.io/core/geo-countries/datapackage.json'

const axios = require('axios').default;

class DataLoader {
    country_data = {};
    full_data = {};
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
        }; 
        return [this.country_data, this.cur_date];
    }
      
    setCoronaData = (result) => {
        let country = result.countryregion;
        let location = result.location;
        let countrycode = result.countrycode;
        let timeseries = result.timeseries;
        for (const [key, value] of Object.entries(timeseries)) {
            let countryInfo = new CountryInfo(country,
                                            countrycode.iso2,
                                            [location.lat, location.lng], 
                                            value.confirmed, 
                                            value.deaths,
                                            value.recovered
                                            );
            this.fillCoronaData(key, countryInfo);
        };
        if (this.cur_date === null) {
            this.cur_date = Object.keys(timeseries).pop();
        };
    }

    fillCoronaData = (timestamp, countryInfo) => {
        if (!this.country_data[timestamp]) {
            this.country_data[timestamp] = [];
        }
        this.country_data[timestamp].push(countryInfo);
    }

    // ;(async () => {
    //     const dataset = await Dataset.load(GEOJSON_PATH)
    //     // get list of all resources:
    //     for (const id in dataset.resources) {
    //       console.log(dataset.resources[id]._descriptor.name)
    //     }
    //     // get all tabular data(if exists any)
    //     for (const id in dataset.resources) {
    //       if (dataset.resources[id]._descriptor.format === "csv") {
    //         const file = dataset.resources[id]
    //         // Get a raw stream
    //         const stream = await file.stream()
    //         // entire file as a buffer (be careful with large files!)
    //         const buffer = await file.buffer
    //         // print data
    //         stream.pipe(process.stdout)
    //       }
    //     }
    // })()
}

export default DataLoader;

