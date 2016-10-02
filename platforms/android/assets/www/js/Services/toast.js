//160928-recipeApp_Services_toast_js
(function() {
  angular.module('app')
    .service('toastService', function($ionicPopup) {
      this.showToast = showToast;
      /**
       * @tyeren creates the popup allows us to insert a specfic message so we can re use the toast thru out the app
       * @param message
         */
      function showToast(message) {
        var alertPopup = $ionicPopup.alert({
          title: 'Recipe App Alert',
          template: message
        });
        }


    })
})();
