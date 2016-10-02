//160928-recipeApp_tabs_html
(function () {
  angular.module('app')
    .controller('indexController', function (authenticationService) {
      var vm = this;

      vm.user = authenticationService.initialCheck();

    });

})();
