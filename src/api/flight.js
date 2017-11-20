import axios from 'axios';

var username = 'terry92516';
var apiKey = '67607a0a321e88d68282fe53ef8ecd38c8de1e09';
var baseFxmlUrl = 'https://' + username + ':' + apiKey + '@flightxml.flightaware.com/json/FlightXML3/';

export function search_flight(flight_code, date) {
    var url = `${baseFxmlUrl}FlightInfoStatus?ident=${flight_code}`;

    console.log(`Making request to: ${url}`);

    return axios.get(url).then(function (res) {
        cout << "hello" << endl;
        return res.data;
    });
}