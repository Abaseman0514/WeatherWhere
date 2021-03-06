"use strict"; {
    angular.module('app')
        .controller('weatherController', function (weatherService, $timeout) {
            const $ctrl = this;
            weatherService.getWeather().then(result => {
                const skycons = new Skycons({
                    color: 'white'
                });
                $ctrl.userData = result;
                result.daily.data.forEach((day, index) => {
                    $timeout(() => skycons.add(`icon${index}`, day.icon));
                });
                $ctrl.icons = skycons;
                skycons.play();
                $ctrl.begDay();
                $ctrl.user();
                $ctrl.match();
                $ctrl.recommend();
                $ctrl.showActivity = true;
                $ctrl.showWear = true;
                $ctrl.showRecommend = true;
            });

            $ctrl.locationSearch = function (search) {
                weatherService.getLocation(search)
                    .then(results => weatherService.getWeather(results))
                    .then(newResult => {
                        const skycons = new Skycons({
                            color: 'white'
                        });
                        $ctrl.userData = newResult;
                        newResult.daily.data.forEach((day, index) => {
                            $timeout(() => skycons.add(`icon${index}`, day.icon));
                        });
                        $ctrl.icons = skycons;
                        skycons.play();
                        $ctrl.begDay();
                        $ctrl.user();
                        $ctrl.match();
                        $ctrl.recommend();
                        console.log($ctrl.userDay);
                        console.log($ctrl.userTemp);
                    });
            }

            $ctrl.userDay = weatherService.userdaypref;
            $ctrl.userTemp = weatherService.usertemppref;
            $ctrl.totalHours;
            $ctrl.matchPic;

            $ctrl.begDay = function () {

                var unixTimeBeg = $ctrl.userData.daily.data[0].sunriseTime;
                var unixTimeEnd = $ctrl.userData.daily.data[0].sunsetTime;

                var months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                var dateBeg = new Date(unixTimeBeg * 1000);
                var dateEnd = new Date(unixTimeEnd * 1000);

                var yearBeg = dateBeg.getFullYear();
                var yearEnd = dateEnd.getFullYear();

                var monthBeg = months_arr[dateBeg.getMonth()];
                var monthEnd = months_arr[dateEnd.getMonth()];

                var dayBeg = dateBeg.getDate();
                var dayEnd = dateEnd.getDate();

                var hoursBeg = dateBeg.getHours();
                var hoursEnd = dateEnd.getHours();

                var minutesBeg = "0" + dateBeg.getMinutes();
                var minutesEnd = "0" + dateEnd.getMinutes();

                var secondsBeg = "0" + dateBeg.getSeconds();
                var secondsEnd = "0" + dateEnd.getSeconds();

                var begDayTime = monthBeg + '-' + dayBeg + '-' + yearBeg + ' ' + hoursBeg + ':' + minutesBeg.substr(-2) + ':' + secondsBeg.substr(-2);
                var EndDayTime = monthEnd + '-' + dayEnd + '-' + yearEnd + ' ' + hoursEnd + ':' + minutesEnd.substr(-2) + ':' + secondsEnd.substr(-2);
                var begTotalHours = hoursBeg;
                var endTotalHours = hoursEnd;
                var total = (endTotalHours - begTotalHours);
                console.log(begDayTime);
                console.log(EndDayTime);
                console.log(endTotalHours);
                console.log(begTotalHours);
                console.log(total);
                $ctrl.totalHours = total;
            }

            $ctrl.user = function () {
                const dayTemp = [{
                        temp: 100,
                        clothing: "Swim Suit is best",
                        actOne: "Turn on A/C",
                        actTwo: "Find a pool",
                        actThree: "Drink water"
                    },
                    {
                        temp: 80,
                        clothing: "Light clothing",
                        actOne: "Take out the boat",
                        actTwo: "Go camping",
                        actThree: "Go for a bike ride"
                    },
                    {
                        temp: 60,
                        clothing: "Dress casually",
                        actOne: "Go play baseball",
                        actTwo: "Go for a hike",
                        actThree: "Read a book at a park"
                    },
                    {
                        temp: 40,
                        clothing: "Dress Warmly",
                        actOne: "Go axe throwing",
                        actTwo: "Netflix and Chill -- LOL",
                        actThree: "Get the fireplace ready"
                    },
                    {
                        temp: 20,
                        clothing: "Multiple Layers",
                        actOne: "Build a snowman",
                        actTwo: "Go Skiing",
                        actThree: "Drink Hot Chocolate"
                    },
                    {
                        temp: 0,
                        clothing: "Bundle Up",
                        actOne: "Stay Inside",
                        actTwo: "Watch TV",
                        actThree: "Play Board Games"
                    }
                ]

                for (const userInfo of dayTemp) {
                    if ($ctrl.userData.currently.temperature >= userInfo.temp) {
                        $ctrl.wear = userInfo.clothing
                        $ctrl.actOne = userInfo.actOne
                        $ctrl.actTwo = userInfo.actTwo
                        $ctrl.actThree = userInfo.actThree
                        break;
                    };
                };

            };
            $ctrl.match = function () {
                //   const compare = [
                //     {temp: 100}, {time: 24/100},
                //     {temp: 80}, {time:16/66 },
                //     {temp: 60}, {time: 14/58},
                //     {temp: 40}, {time: 12/50},
                //     {temp: 20}, {time: 10/42},
                //     {temp: 0}, {time:8/33}
                //];

                //0 to 8 hour 0 to 100 temp
                if ($ctrl.userDay >= 0 && $ctrl.userDay <= 33 && $ctrl.userTemp >= 0 && $ctrl.userTemp <= 20 &&
                    $ctrl.userData.currently.temperature >= 0 && $ctrl.userData.currently.temperature <= 20 &&
                    $ctrl.totalHours <= 8
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 20 degrees and 8 hours of daylight";;
                } else if ($ctrl.userDay >= 0 && $ctrl.userDay <= 33 && $ctrl.userTemp >= 21 && $ctrl.userTemp <= 40 &&
                    $ctrl.userData.currently.temperature >= 20.01 && $ctrl.userData.currently.temperature <= 40 &&
                    $ctrl.totalHours <= 8
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 40 degrees and 8 hours of daylight";

                } else if ($ctrl.userDay >= 0 && $ctrl.userDay <= 33 && $ctrl.userTemp >= 41 && $ctrl.userTemp <= 60 &&
                    $ctrl.userData.currently.temperature >= 40.01 && $ctrl.userData.currently.temperature <= 60 &&
                    $ctrl.totalHours <= 8
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 60 degrees and 8 hours of daylight";

                } else if ($ctrl.userDay >= 0 && $ctrl.userDay <= 33 && $ctrl.userTemp >= 61 && $ctrl.userTemp <= 80 &&
                    $ctrl.userData.currently.temperature >= 60.01 && $ctrl.userData.currently.temperature <= 80 &&
                    $ctrl.totalHours <= 8
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 80 degrees and 8 hours of daylight";

                } else if ($ctrl.userDay >= 0 && $ctrl.userDay <= 33 && $ctrl.userTemp >= 81 && $ctrl.userTemp <= 100 &&
                    $ctrl.userData.currently.temperature >= 80.01 && $ctrl.userData.currently.temperature <= 100 &&
                    $ctrl.totalHours <= 8
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 100 degrees and 8 hours of daylight";

                }

                //10 hour 0 to 100 temp
                else if ($ctrl.userDay >= 34 && $ctrl.userDay <= 42 && $ctrl.userTemp >= 0 && $ctrl.userTemp <= 20 &&
                    $ctrl.userData.currently.temperature >= 0 && $ctrl.userData.currently.temperature <= 20 &&
                    $ctrl.totalHours >= 8 && $ctrl.totalHours <= 10
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 20 degrees and around 10 hours of daylight";

                } else if ($ctrl.userDay >= 34 && $ctrl.userDay <= 42 && $ctrl.userTemp >= 20.01 && $ctrl.userTemp <= 40 &&
                    $ctrl.userData.currently.temperature >= 20.01 && $ctrl.userData.currently.temperature <= 40 &&
                    $ctrl.totalHours >= 8 && $ctrl.totalHours <= 10
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 40 degrees and around 10 hours of daylight";

                } else if ($ctrl.userDay >= 34 && $ctrl.userDay <= 42 && $ctrl.userTemp >= 41 && $ctrl.userTemp <= 60 &&
                    $ctrl.userData.currently.temperature >= 40.01 && $ctrl.userData.currently.temperature <= 60 &&
                    $ctrl.totalHours >= 8 && $ctrl.totalHours <= 10
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 60 degrees and around 10 hours of daylight";

                } else if ($ctrl.userDay >= 34 && $ctrl.userDay <= 42 && $ctrl.userTemp >= 61 && $ctrl.userTemp <= 80 &&
                    $ctrl.userData.currently.temperature >= 60.01 && $ctrl.userData.currently.temperature <= 100 &&
                    $ctrl.totalHours >= 8 && $ctrl.totalHours <= 10
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 80 degrees and around 10 hours of daylight";

                } else if ($ctrl.userDay >= 34 && $ctrl.userDay <= 42 && $ctrl.userTemp >= 81 && $ctrl.userTemp <= 100 &&
                    $ctrl.userData.currently.temperature >= 80.01 && $ctrl.userData.currently.temperature <= 100 &&
                    $ctrl.totalHours >= 8 && $ctrl.totalHours <= 10
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 100 degrees and around 10 hours of daylight";

                }

                //12 hour 0 to 100 temp
                else if ($ctrl.userDay >= 43 && $ctrl.userDay <= 50 && $ctrl.userTemp >= 0 && $ctrl.userTemp <= 20 &&
                    $ctrl.userData.currently.temperature >= 0 && $ctrl.userData.currently.temperature <= 20 &&
                    $ctrl.totalHours >= 10 && $ctrl.totalHours <= 12
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 20 degrees and around 12 hours of daylight";

                } else if ($ctrl.userDay >= 43 && $ctrl.userDay <= 50 && $ctrl.userTemp >= 21 && $ctrl.userTemp <= 40 &&
                    $ctrl.userData.currently.temperature >= 20.01 && $ctrl.userData.currently.temperature <= 40 &&
                    $ctrl.totalHours >= 10 && $ctrl.totalHours <= 12
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 40 degrees and around 12 hours of daylight";

                } else if ($ctrl.userDay >= 43 && $ctrl.userDay <= 50 && $ctrl.userTemp >= 41 && $ctrl.userTemp <= 60 &&
                    $ctrl.userData.currently.temperature >= 40.01 && $ctrl.userData.currently.temperature <= 60 &&
                    $ctrl.totalHours >= 10 && $ctrl.totalHours <= 12
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 60 degrees and around 12 hours of daylight";

                } else if ($ctrl.userDay >= 43 && $ctrl.userDay <= 50 && $ctrl.userTemp >= 61 && $ctrl.userTemp <= 80 &&
                    $ctrl.userData.currently.temperature >= 60.01 && $ctrl.userData.currently.temperature <= 80 &&
                    $ctrl.totalHours >= 10 && $ctrl.totalHours <= 12
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 80 degrees and around 12 hours of daylight";

                } else if ($ctrl.userDay >= 43 && $ctrl.userDay <= 50 && $ctrl.userTemp >= 81 && $ctrl.userTemp <= 100 &&
                    $ctrl.userData.currently.temperature >= 80.01 && $ctrl.userData.currently.temperature <= 100 &&
                    $ctrl.totalHours >= 10 && $ctrl.totalHours <= 12
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 100 degrees and around 12 hours of daylight";

                }

                //12 to 14 hour 0 to 100 temp
                else if ($ctrl.userDay >= 51 && $ctrl.userDay <= 66 && $ctrl.userTemp >= 0 && $ctrl.userTemp <= 20 &&
                    $ctrl.userData.currently.temperature >= 0 && $ctrl.userData.currently.temperature <= 20 &&
                    $ctrl.totalHours >= 12 && $ctrl.totalHours <= 14
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 20 degrees and around 14 hours of daylight";

                } else if ($ctrl.userDay >= 51 && $ctrl.userDay <= 66 && $ctrl.userTemp >= 21 && $ctrl.userTemp <= 40 &&
                    $ctrl.userData.currently.temperature >= 20.01 && $ctrl.userData.currently.temperature <= 40 &&
                    $ctrl.totalHours >= 12 && $ctrl.totalHours <= 14
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 40 degrees and around 14 hours of daylight";

                } else if ($ctrl.userDay >= 51 && $ctrl.userDay <= 66 && $ctrl.userTemp >= 41 && $ctrl.userTemp <= 60 &&
                    $ctrl.userData.currently.temperature >= 40.01 && $ctrl.userData.currently.temperature <= 60 &&
                    $ctrl.totalHours >= 12 && $ctrl.totalHours <= 14
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 60 degrees and around 14 hours of daylight";

                } else if ($ctrl.userDay >= 51 && $ctrl.userDay <= 66 && $ctrl.userTemp >= 61 && $ctrl.userTemp <= 80 &&
                    $ctrl.userData.currently.temperature >= 60.01 && $ctrl.userData.currently.temperature <= 80 &&
                    $ctrl.totalHours >= 12 && $ctrl.totalHours <= 14
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 80 degrees and around 14 hours of daylight";

                } else if ($ctrl.userDay >= 51 && $ctrl.userDay <= 66 && $ctrl.userTemp >= 81 && $ctrl.userTemp <= 100 &&
                    $ctrl.userData.currently.temperature >= 80.01 && $ctrl.userData.currently.temperature <= 100 &&
                    $ctrl.totalHours >= 12 && $ctrl.totalHours <= 14
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 100 degrees and around 14 hours of daylight";

                }

                //16 hour 0 to 100 temp
                else if ($ctrl.userDay >= 51 && $ctrl.userDay <= 66 && $ctrl.userTemp >= 0 && $ctrl.userTemp <= 20 &&
                    $ctrl.userData.currently.temperature >= 0 && $ctrl.userData.currently.temperature <= 20 &&
                    $ctrl.totalHours >= 14 && $ctrl.totalHours <= 16
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 20 degrees and around 16 hours of daylight";

                } else if ($ctrl.userDay >= 51 && $ctrl.userDay <= 66 && $ctrl.userTemp >= 21 && $ctrl.userTemp <= 40 &&
                    $ctrl.userData.currently.temperature >= 20.01 && $ctrl.userData.currently.temperature <= 40 &&
                    $ctrl.totalHours >= 14 && $ctrl.totalHours <= 16
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 40 degrees and around 16 hours of daylight";

                } else if ($ctrl.userDay >= 51 && $ctrl.userDay <= 66 && $ctrl.userTemp >= 41 && $ctrl.userTemp <= 60 &&
                    $ctrl.userData.currently.temperature >= 40.01 && $ctrl.userData.currently.temperature <= 60 &&
                    $ctrl.totalHours >= 14 && $ctrl.totalHours <= 16
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 60 degrees and around 16 hours of daylight";

                } else if ($ctrl.userDay >= 51 && $ctrl.userDay <= 66 && $ctrl.userTemp >= 61 && $ctrl.userTemp <= 80 &&
                    $ctrl.userData.currently.temperature >= 60.01 && $ctrl.userData.currently.temperature <= 80 &&
                    $ctrl.totalHours >= 14 && $ctrl.totalHours <= 16
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 80 degrees and around 15 hours of daylight";

                } else if ($ctrl.userDay >= 51 && $ctrl.userDay <= 66 && $ctrl.userTemp >= 81 && $ctrl.userTemp <= 100 &&
                    $ctrl.userData.currently.temperature >= 80.01 && $ctrl.userData.currently.temperature <= 100 &&
                    $ctrl.totalHours >= 14 && $ctrl.totalHours <= 16
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 100 degrees and around 16 hours of daylight";

                }

                //24 hour 0 to 100 temp
                else if ($ctrl.userDay >= 67 && $ctrl.userDay <= 100 && $ctrl.userTemp >= 0 && $ctrl.userTemp <= 20 &&
                    $ctrl.userData.currently.temperature >= 0 && $ctrl.userData.currently.temperature <= 20 &&
                    $ctrl.totalHours >= 17
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 20 degrees and over 16 hours of daylight";

                } else if ($ctrl.userDay >= 67 && $ctrl.userDay <= 100 && $ctrl.userTemp >= 21 && $ctrl.userTemp <= 40 &&
                    $ctrl.userData.currently.temperature >= 20.01 && $ctrl.userData.currently.temperature <= 40 &&
                    $ctrl.totalHours >= 17
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 40 degrees and over 16 hours of daylight";

                } else if ($ctrl.userDay >= 67 && $ctrl.userDay <= 100 && $ctrl.userTemp >= 41 && $ctrl.userTemp <= 60 &&
                    $ctrl.userData.currently.temperature >= 40.01 && $ctrl.userData.currently.temperature <= 60 &&
                    $ctrl.totalHours >= 17
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 60 degrees and over 16 hours of daylight";

                } else if ($ctrl.userDay >= 67 && $ctrl.userDay <= 100 && $ctrl.userTemp >= 61 && $ctrl.userTemp <= 80 &&
                    $ctrl.userData.currently.temperature >= 60.01 && $ctrl.userData.currently.temperature <= 80 &&
                    $ctrl.totalHours >= 17
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 80 degrees and over 16 hours of daylight";

                } else if ($ctrl.userDay >= 67 && $ctrl.userDay <= 100 && $ctrl.userTemp >= 81 && $ctrl.userTemp <= 100 &&
                    $ctrl.userData.currently.temperature >= 80.01 && $ctrl.userData.currently.temperature <= 100 &&
                    $ctrl.totalHours >= 17
                ) {
                    $ctrl.matchPic = "images/happy.png";
                    $ctrl.userClass = "speech-bubble-match";
                    $ctrl.matchPicText = "This day matches your preferences with less than 100 degrees and over 16 hours of daylight";

                } else {
                    $ctrl.matchPic = "images/sad.png";
                    $ctrl.userClass = "speech-bubble-nomatch";
                    $ctrl.matchPicText = "Your location does not match your preferences."
                }

            };
            $ctrl.recommend = function () {
                if ($ctrl.userTemp >= 0 && $ctrl.userTemp <= 20) {
                    $ctrl.recommendation = "Based on your preferences, check out Portland, ME or Green Bay, WI";
                } else if ($ctrl.userTemp >= 21 && $ctrl.userTemp <= 40) {
                    $ctrl.recommendation = "Based on your preferences, check out Nashville, TN or Omaha, NE";
                } else if ($ctrl.userTemp >= 41 && $ctrl.userTemp <= 60) {
                    $ctrl.recommendation = "Based on your preferences, check out Atlanta, GA or New Orleans, LA";
                } else if ($ctrl.userTemp >= 61 && $ctrl.userTemp <= 80) {
                    $ctrl.recommendation = "Based on your preferences, check out Austin, TX or Orlando, FL";
                } else if ($ctrl.userTemp >= 81 && $ctrl.userTemp <= 100) {
                    $ctrl.recommendation = "Based on your preferences, check out Los Angeles, CA or Honolulu, HI ";
                } else {
                    $ctrl.recommendation = "Try searching your favorite city"
                }
            };

        });

}