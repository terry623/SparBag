import axios from 'axios';
const BaseUrl = 'http://ptx.transportdata.tw/MOTC/v2/Air/';

export function search_flight(flight_code, date) {

    let url = `${BaseUrl}/GeneralSchedule/International?$filter=FlightNumber%20eq%20'${flight_code}'&$top=30&$format=JSON`;
    
    console.log(`Making request to: ${url}`);

    return axios.get(url).then(function (res) {
        return res;
    });
}
