"use strict"; {
    angular.module('app')
        .service('weatherService', function ($http) {
            const service = this;
            service.weatherData = [];
            service.locationData = [];
            
            // service.miami = [];
            // service.seattle = [];
            // service.phoenix = [];
            // service.dallas = [];
            // service.nyc = [];

            service.userdaypref = null;
            service.usertemppref = null;
          
            service.getLocation = function (search){ 
                let apiKey = 'AIzaSyBdFcPIEFuPTF-m6mnU2JdDQNQthUGOTkY';
                return $http.post('/proxy/https://maps.googleapis.com/maps/api/geocode/json?components=locality:'+ search +'&key=' + apiKey)
                .then((response) => {
                    service.locationData = response.results;
                    console.log("This is the Location data", response);
                    
                    
                    let lat = response.data.results[0].geometry.location.lat;
                    let lng = response.data.results[0].geometry.location.lng;
                    let address = response.data.results[0].formatted_address;
                    
                    return {lat, lng, address};
                });
            }
            
            
            // service.getLocation().then(results => service.getWeather(results)).then(new =>{
              
            //     return service.weatherData
            // });
            service.getWeather = function({lat, lng, address} = {}){
               let latitude = lat || 42.331429;
               let longitude = lng || -83.045753;
            

                return $http.get('/proxy/https://api.darksky.net/forecast/33bfadcb23406507fb40ff261ed9828c/'+ latitude + ',' + longitude).then((responseData) => {
                        service.weatherData = responseData.data;
                        service.weatherData.address = address;
                        console.log("This is the Weather data", responseData.data);
                        
                        return service.weatherData;

                    });
            }

            // service.miamiWeather = function(){
            //     let latitude = 25.775084;
            //     let longitude =  -80.194702;
            //      return $http.get('/proxy/https://api.darksky.net/forecast/33bfadcb23406507fb40ff261ed9828c/'+ latitude + ',' + longitude).then((responseData) => {
            //              service.miami = responseData.data;
            //              console.log("This is Miami Weather data", responseData.data);
                         
            //              return service.miami;
 
            //          }).then(result => service.miami = result);
            //  }

            //  service.miamiWeather();

            //  service.seattleWeather = function(){
            //     let latitude = 47.603229;
            //     let longitude = -122.33028;
            //      return $http.get('/proxy/https://api.darksky.net/forecast/33bfadcb23406507fb40ff261ed9828c/'+ latitude + ',' + longitude).then((responseData) => {
            //              service.seattle = responseData.data;
            //              console.log("This is Seattle Weather data", responseData.data);
                         
            //              return service.seattle;
 
            //          });
            //  }

            //  service.phoenixWeather = function(){
            //     let latitude = 33.448204;
            //     let longitude = -112.072585;
            //      return $http.get('/proxy/https://api.darksky.net/forecast/33bfadcb23406507fb40ff261ed9828c/'+ latitude + ',' + longitude).then((responseData) => {
            //              service.phoenix = responseData.data;
            //              console.log("This is Phoenix Weather data", responseData.data);
                         
            //              return service.phoenix;
 
            //          });
            //  }
            //  service.dallasWeather = function(){
            //     let latitude = 32.777977;
            //     let longitude = -96.796215;
            //      return $http.get('/proxy/https://api.darksky.net/forecast/33bfadcb23406507fb40ff261ed9828c/'+ latitude + ',' + longitude).then((responseData) => {
            //              service.dallas = responseData.data;
            //              console.log("This is dallas Weather data", responseData.data);
                         
            //              return service.dallas;
 
            //          });
            //  }

            //  service.nycWeather = function(){
            //     let latitude = 40.713054;
            //     let longitude = -73.935242;
            //      return $http.get('/proxy/https://api.darksky.net/forecast/33bfadcb23406507fb40ff261ed9828c/'+ latitude + ',' + longitude).then((responseData) => {
            //              service.nyc = responseData.data;
            //              console.log("This is NYC Weather data", responseData.data);
                         
            //              return service.nyc;
 
            //          });
            //  }
             
        });

}