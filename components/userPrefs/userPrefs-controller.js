"use strict"; {
    angular.module('app')
        .controller('userPrefsController', function (weatherService) {
            const $ctrl = this;
            weatherService.getWeather().then(result => {
                $ctrl.userData = result
            })

            var x = document.getElementById("demo");

            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                } else { 
                    x.innerHTML = "Geolocation is not supported by this browser.";
                }
            }
            
            function showPosition(position) {
                x.innerHTML = "Latitude: " + position.coords.latitude + 
                "<br>Longitude: " + position.coords.longitude;
            }
        });

}