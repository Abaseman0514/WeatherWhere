"use strict"; {
  angular.module('app')
    .controller('userPrefsController', function (weatherService, $timeout) {
      const $ctrl = this;
      weatherService.getWeather().then(result => {
        $ctrl.userData = result
      })

      function initComparisons(className) {
        var x, i;
        x = document.getElementsByClassName(className);
        for (i = 0; i < x.length; i++) {
          compareImages(x[i]);
        }

        function compareImages(img) {
          var slider, img, clicked = 0,
            w, h;
          w = img.offsetWidth;
          h = img.offsetHeight;
          img.style.width = (w / 2) + "px";
          slider = document.createElement("DIV");
          slider.setAttribute("class", "daylight");
          slider.setAttribute("title", "Slide left or right");
          img.parentElement.insertBefore(slider, img);
          slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
          slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
          slider.addEventListener("mousedown", slideReady);
          window.addEventListener("mouseup", slideFinish);
          slider.addEventListener("touchstart", slideReady);
          window.addEventListener("touchstop", slideFinish);

          function slideReady(e) {
            e.preventDefault();
            clicked = 1;
            window.addEventListener("mousemove", slideMove);
            window.addEventListener("touchmove", slideMove);
          }

          function slideFinish() {

            const percent = (img.offsetWidth / img.parentElement.offsetWidth) * 100
            $timeout(() => {
              $ctrl[className] = `${Math.round(percent)}`
              console.log($ctrl[className], $ctrl);
              weatherService.userdaypref = $ctrl.daytime;
              weatherService.usertemppref = $ctrl.temperature;
              clicked = 0;
            });
          }

          function slideMove(e) {
            var pos;
            if (clicked == 0) return false;
            pos = getCursorPos(e)
            if (pos < 0) pos = 0;
            if (pos > w) pos = w;
            slide(pos);
          }

          function getCursorPos(e) {
            var a, x = 0;
            e = e || window.event;
            a = img.getBoundingClientRect();
            x = e.pageX - a.left;
            x = x - window.pageXOffset;
            return x;
          }

          function slide(x) {
            img.style.width = x + "px";
            slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
          }

        }
      }

      $ctrl.$onInit = function () {
        initComparisons('daytime');
        initComparisons('temperature');
      }

    });
}