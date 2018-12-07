"use strict"; {
    angular.module('app')
        .service('weatherService', function ($http) {
            const service = this;
            service.weatherData = [];
            service.userdaypref = null;
            service.usertemppref = null;
            service.boardMessages = [
                {name: 'Devin Scillian', 
                location: 'Detroit',
                message: 'Roads are icy today.'}, 
                {name: 'Kim Gill',
                location: 'Detroit',
                message: 'Make sure to bring hats and gloves'},
                {name: 'Rhonda Walker',
                location: 'Detroit',
                message: 'First one to post here! '}, 

            ];
            
            
            service.getWeather = function(){
    
                return $http.get('/proxy/https://api.darksky.net/forecast/33bfadcb23406507fb40ff261ed9828c/42.331429,-83.045753').then((responseData) => {
                        service.weatherData = responseData.data;
                        console.log("This is the data", responseData.data);
                        
                        return service.weatherData;

                    });
            }
            
        });

}