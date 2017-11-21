import axios from 'axios';
const BaseUrl = 'http://ptx.transportdata.tw/MOTC/v2/Air/';

export function search_flight(flight_code, date) {

    let url = `${BaseUrl}/GeneralSchedule/International?$filter=FlightNumber%20eq%20'${flight_code}'&$top=30&$format=JSON`;

    console.log(`Making request to: ${url}`);

    return axios.get(url).then(function (res) {
        return res;
    });
}

export function search_flight_by_destination(departure, arrival, date) {

    let url = `${BaseUrl}/GeneralSchedule/International?$filter=DepartureAirportID%20eq%20'${departure}'%20and%20ArrivalAirportID%20eq%20%20'${arrival}'&$top=10&$format=JSON`;

    console.log(`Making request to: ${url}`);

    return axios.get(url).then(function (res) {
        return res;
    });
}