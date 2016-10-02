//160928-recipeApp_Comp_tabs_js
(function() {
  angular.module('app')
    .component(
      'tabs',{
        bindings: {},
        templateUrl: 'js/Components/tabs/tabs.html',
        controller: tabsController,
        controllerAs: 'vm'
      });
 
    function tabsController(userService) {
      //Declaring Local Variables
      var vm = this;
      
      //Declaring Public Variables
      vm.$onInit = onInit;

      /**
       *@tyeren update the user thru out the app so we can call the user
       */
      function onInit() {
        userService.onUpdate(updateUser.bind(vm));
      }

      /**
       * updates user
       * @param user
         */
      function updateUser(user) {
        this.user = user;
      }

    }
  })();
