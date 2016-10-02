<!-- 160928-recipeApp-browse_js -->
(function () {
  angular.module('app')
         .component(
           'browse', {
             bindings: {},
             templateUrl: 'js/Components/browse/browse.html',
             controller: browseController,
             controllerAs: 'vm'
           }
         );
  /**
   * kazeki create service to get user profile info for setting up avatar and username display
   * @param userService
   */
  function browseController(userService) {
    var vm = this;
    vm.$onInit = onInit;
    
    function onInit() {
      userService.getProfile()
       .then(
         function (successResponse) {
           vm.user = successResponse;
           var str = vm.user.email;
           /* kazeki - if no displayName is available from profile default is created from email address
            */
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
    
  }
  
})();
