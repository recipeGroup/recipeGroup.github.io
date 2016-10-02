//160928-recipeApp_home_js
(function() {
  angular.module('app')
    .component(
      'home',{
        bindings: {},
        templateUrl: 'js/Components/home/home.html',
        controller: homeController,
        controllerAs: 'vm'
      });
  /**
   * @tyeren connects home controller to user service then gets user ID to display user email or display name
   * @param userService
     */
    function homeController(userService) {
      var vm = this;
      vm.$onInit = onInit;
    
      function onInit() {
        vm.user = userService.getUser();
      }
  
      userService.getProfile()
                 .then(
                   function (successResponse) {
                     vm.user = successResponse;
                     var str = vm.user.email;
                     if (vm.user.displayName == null) {
                       var aNum;
                       aNum = str.indexOf("@");
                       vm.displayName = str.substr(0, aNum);
                     }
                     else {
                       vm.displayName = vm.user.displayName;
                     }
      
                   },
                   function (errorResponse) {
      
                   }
                 );
  
  
    }
  })();
