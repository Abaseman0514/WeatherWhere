"use strict"; {
    angular.module('app')
        .controller('weatherController', function (weatherService) {
            const $ctrl = this;
            weatherService.getWeather().then(result => {
                $ctrl.userData = result
            });
            $ctrl.user = function() {
                //const usernum = 70;
                const dayTemp = [
                    {temp: 100, clothing: "Swim Suit is best", actOne:"Turn on A/C", actTwo:"Find a pool", actThree: "Drink water"},
                    {temp: 80, clothing: "Light clothing", actOne:"Go outside", actTwo:"Go camping", actThree: "Go for a bike ride" },
                    {temp: 60, clothing: "Dress casually", actOne:"Activity one 60", actTwo:"Go for a hike", actThree: "Activity Three 60" },
                    {temp: 40, clothing: "Dress Warmly", actOne:"Activity one 40", actTwo:"Activity Two 40", actThree: "Activity Three 40" },
                    {temp: 20, clothing: "Multiple Layers", actOne:"Get the fireplace started", actTwo:"Go Skiing", actThree: "Drink Hot Chocolate" },
                    {temp: 0, clothing: "Bundle Up", actOne:"Stay Inside", actTwo:"Watch TV", actThree: "Play Board Games" }
                ]
               
  
                for (const userInfo of dayTemp) {
                    if ($ctrl.userData.currently.apparentTemperature >= userInfo.temp) {
                        $ctrl.wear = userInfo.clothing
                        $ctrl.actOne = userInfo.actOne
                        $ctrl.actTwo = userInfo.actTwo
                        $ctrl.actThree = userInfo.actThree
                        console.log(userInfo.activity);
                        break;
                    }
                    }
              };


              $ctrl.getLocation = function() {
                  
                  if(navigator.geolocation) {
                      
                      // timeout at 60000 milliseconds (60 seconds)
                      var options = {timeout:60000};
                      navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
                    } else {
                        alert("Sorry, browser does not support geolocation!");
                    }
                                              function showLocation(position) {
                                                var latitude = position.coords.latitude;
                                                var longitude = position.coords.longitude;
                                                alert("Latitude : " + latitude + " Longitude: " + longitude);
                                             }
                                           
                                             function errorHandler(err) {
                                                if(err.code == 1) {
                                                   alert("Error: Access is denied!");
                                                } else if( err.code == 2) {
                                                   alert("Error: Position is unavailable!");
                                                }
                                             }
                                           
             }

        });

}