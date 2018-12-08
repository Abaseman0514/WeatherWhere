"use strict"; {
    angular.module('app')
    .controller('futureController', function (weatherService, $timeout) {
        const $ctrl = this;
        // icons = [];
        weatherService.getWeather().then(result => {
            const skycons = new Skycons({ color: 'white' });
            $ctrl.userData = result;
            result.daily.data.forEach((day, index) => {
                $timeout(() => skycons.add(`icon${index}`, day.icon));
            });
            $ctrl.icons = skycons;
            skycons.play();
            console.log($ctrl.icons)
            
            return $ctrl.icons;
        });
    })
}



