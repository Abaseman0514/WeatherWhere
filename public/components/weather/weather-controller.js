"use strict"; {
    angular.module('app')
        .controller('weatherController', function (weatherService) {
            const $ctrl = this;
            weatherService.getWeather().then(result => {
                $ctrl.userData = result
            })
          

        });

}