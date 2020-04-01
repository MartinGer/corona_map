class CountryInfo {
    constructor(countryCode, location, confirmed, deaths, recovered) {
        this.countryCode =  countryCode;
        this.location    =  location;
        this.confirmed   =  confirmed;
        this.deaths      =  deaths;
        this.recovered   =  recovered;
    }
}

export default CountryInfo;
