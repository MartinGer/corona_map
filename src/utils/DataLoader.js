import CountryInfo from './CountryInfo.js';

const PATH_BASE = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu';
const PATH_TIMESERIES = '/timeseries';
const PATH_SEARCH = 'iso2=';
const PATH_BRIEF = '/brief';
const COUNTRY_QUERY = `${PATH_BASE}${PATH_TIMESERIES}?${PATH_SEARCH}`;
const FULL_QUERY = `${PATH_BASE}${PATH_BRIEF}`; // https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief
const SUM_UP_PARAM = '&onlyCountries=false';
const countryList = require('country-list');

const countries = countryList.getCodes();
const { Dataset } = require('data.js');

const GEOJSON_PATH = 'https://datahub.io/core/geo-countries/datapackage.json';
const axios = require('axios').default;

export default class DataLoader {
    countryData = {};

    fullData = {};

    curDate = null;

    fetchFullCoronaData = async () => {
      const response = await axios.get(FULL_QUERY);
      const fullData = this.setFullCoronaData(response.data);
      return fullData;
    }

    setFullCoronaData = (result) => {
      const fullData = {
        infected: result.confirmed,
        deaths: result.deaths,
        recovered: result.recovered,
      };
      return fullData;
    }

    fetchCoronaData = async () => {
      await Promise.all(countries.map(async (country) => {
        const searchTerm = COUNTRY_QUERY + country + SUM_UP_PARAM;
        await axios.get(searchTerm)
          .then((response) => this.setCoronaData(response.data[0]))
          .catch((e) => e);
      }));
      return [this.countryData, this.curDate];
    }

    setCoronaData = (result) => {
      const country = result.countryregion;
      const { location } = result;
      const { countrycode } = result;
      const { timeseries } = result;

      Object.entries(timeseries).map(([key, value]) => {
        const countryInfo = new CountryInfo(country,
          countrycode.iso2,
          [location.lat, location.lng],
          value.confirmed,
          value.deaths,
          value.recovered);
        this.fillCoronaData(key, countryInfo);
      });
      if (this.curDate === null) {
        this.curDate = Object.keys(timeseries).pop();
      }
    }

    // setCoronaData = (result) => {
    //   const country = result.countryregion;
    //   const { location } = result;
    //   const { countrycode } = result;
    //   const { timeseries } = result;
    //   for (const [key, value] of Object.entries(timeseries)) {
    //     const countryInfo = new CountryInfo(country,
    //       countrycode.iso2,
    //       [location.lat, location.lng],
    //       value.confirmed,
    //       value.deaths,
    //       value.recovered);
    //     this.fillCoronaData(key, countryInfo);
    //   }
    //   if (this.curDate === null) {
    //     this.curDate = Object.keys(timeseries).pop();
    //   }
    // }

    fillCoronaData = (timestamp, countryInfo) => {
      if (!this.countryData[timestamp]) {
        this.countryData[timestamp] = [];
      }
      this.countryData[timestamp].push(countryInfo);
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
