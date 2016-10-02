<!-- 160928-recipeApp-browse-app_js -->
(function() {
  angular.module('app')
    .component(
      'browseApp',{
        bindings: {},
        templateUrl: 'www/js/Components/browse-app/browse-app.html',
        controller: browseAppController,
        controllerAs: 'vm'
      });
    function browseAppController(recipesService, userService) {
      var vm = this;
      vm.goBack = goBack;
      vm.$onInit = onInit;
      vm.saveToProfile = saveToProfile;
      vm.selectRecipe = selectRecipe;
  
      /**
       * kazeki click on 'browse' button to return to browser - this goBack function erased the recipe screen by making it undefined
       * @type {goBack}
       */
      function goBack() {
        vm.selectedRecipe = undefined;
      }
      function onInit() {
        /**
         * kazeki - onInit evokes recipesService for recipes
         */
        recipesService.getAppRecipes()
          .then(
            function (successResponse) {
              vm.appRecipes = successResponse;
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
       * kazeki - save all selections to firebase
       * @param selectedRecipe
       */
      function saveToProfile(selectedRecipe) {
      }
  
      /**
       * kazekl - get recipe from firebase
       * @param recipe
       */
      function selectRecipe(recipe) {
        vm.selectedRecipe = recipe;
      }
    }
  })();
