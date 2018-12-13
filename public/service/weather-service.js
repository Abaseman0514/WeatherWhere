"use strict"; {
    angular.module('app')
        .service('weatherService', function ($http) {
            const service = this;
           
            service.userdaypref = null;
            service.usertemppref = null;

            service.getLocation = function (search) {
                let apiKey = 'AIzaSyBdFcPIEFuPTF-m6mnU2JdDQNQthUGOTkY';
                return $http.post('/proxy/https://maps.googleapis.com/maps/api/geocode/json?components=locality:' + search + '&key=' + apiKey)
                    .then((response) => {
                        service.locationData = response.results;
                        console.log("This is the Location data", response);

                        let lat = response.data.results[0].geometry.location.lat;
                        let lng = response.data.results[0].geometry.location.lng;
                        let address = response.data.results[0].formatted_address;

                        return {
                            lat,
                            lng,
                            address
                        };
                    });
            }

            service.getWeather = function ({
                lat,
                lng,
                address
            } = {}) {
                let latitude = lat || 42.331429;
                let longitude = lng || -83.045753;


                return $http.get('/proxy/https://api.darksky.net/forecast/33bfadcb23406507fb40ff261ed9828c/' + latitude + ',' + longitude).then((responseData) => {
                    service.weatherData = responseData.data;
                    service.weatherData.address = address;
                    console.log("This is the Weather data", responseData.data);

                    return service.weatherData;

                });
            }

        });

}