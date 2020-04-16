export default class CountryInfo {
  constructor(country, countryCode, location, confirmed, deaths, recovered) {
    this.country = country;
    this.countryCode = countryCode;
    this.location = location;
    this.confirmed = confirmed;
    this.deaths = deaths;
    this.recovered = recovered;
  }
}
