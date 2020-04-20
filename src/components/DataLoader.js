import CountryInfo from '../utils/CountryInfo';

const PATH_BASE = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu';
const PATH_TIMESERIES = '/timeseries';
const PATH_SEARCH = 'iso2=';
const PATH_BRIEF = '/brief';
const COUNTRY_QUERY = `${PATH_BASE}${PATH_TIMESERIES}?${PATH_SEARCH}`;
const FULL_QUERY = `${PATH_BASE}${PATH_BRIEF}`; // https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief
const SUM_UP_PARAM = '&onlyCountries=false';
const POPULATION_QUERY = 'https://restcountries.eu/rest/v2/all';

const countryList = require('country-list');
const axios = require('axios').default;

const countries = countryList.getCodes();

export default class DataLoader {
    countryData = {};

    fullData = {};

    curDate = null;

    populationData = {};

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

      Object.entries(timeseries).forEach(([key, value]) => {
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

    fillCoronaData = (timestamp, countryInfo) => {
      if (!this.countryData[timestamp]) {
        this.countryData[timestamp] = [];
      }
      this.countryData[timestamp].push(countryInfo);
    }

    fetchPopulationData = async () => {
      await axios.get(POPULATION_QUERY)
        .then((response) => this.setPopulationData(response.data))
        .catch((e) => e);
      return this.populationData;
    }

    setPopulationData = (result) => {
      result.forEach((country) => {
        this.populationData[country.alpha2Code] = country.population;
      });
    }
}
