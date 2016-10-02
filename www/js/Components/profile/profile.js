//160928-recipeApp_profile_js
(function () {
  angular.module('app')
    .component(
      'profile', {
        bindings: {},
        templateUrl: 'www/js/Components/profile/profile.html',
        controller: profileController,
        controllerAs: 'vm'
      });

  function profileController(userService, toastService, $scope) {
    // Declares Local variables
    var vm = this;
    //Declares Public variables
    vm.$onInit = onInit;
    vm.saveProfile = saveProfile;
    /**
       * @tyeren grabs user profile to display avatar
     */
    function onInit () {
      userService.getProfile()
        .then(
          function (successResponse) {
            vm.data = successResponse;
          },
          function (errorResponse) {
            console.log(errorResponse);
          });
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

    /**
     * saves users profile and displays profile saved toast
     * @param user
       */
    function saveProfile (user) {
      userService.saveProfile(user);
      toastService.showToast(user.displayName + 'profile saved!');
    }
  }
})();
