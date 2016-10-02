<!-- 160928-recipeApp_browse-online_js-->
(function() {
  angular.module('app')
    .component(
      'browseOnline',{
        bindings: {},
        templateUrl: 'www/js/Components/browse-online/browse-online.html',
        controller: browseOnlineController,
        controllerAs: 'vm'
      });
  
    function browseOnlineController(apiCallsService, userService) {
      var vm = this;
      vm.$onInit = onInit;
      vm.onlineDetails = onlineDetails;
      vm.goBack = goBack;
      vm.nextPage = nextPage;
      vm.previousPage = previousPage;
      var pageNumber = 1;
  
      /**
       * kazeki - moves back to Browse page
       */
      function goBack() {
        vm.selectedRecipe = undefined;
      }
  
      /**
       * kazeki nav button
       */
      function nextPage() {
        pageNumber = pageNumber + 1;
        vm.recipes = [];
        apiCall(pageNumber);
      }
  
      /**
       * kazeki nav button
       */
      function previousPage() {
        if (pageNumber > 1) {
          pageNumber = pageNumber - 1;
          vm.recipes = [];
        }

        apiCall(pageNumber);
      }
  
      /**
       * kazeki - get selected recipe details
       * @param recipeId
       */
      function onlineDetails(recipeId) {
        apiCallsService.getRecipe(recipeId)
          .then( function (successResponse) {
            console.log(successResponse);
            vm.selectedRecipe = successResponse.recipe;
          }, function (errorResponse) {
            console.log(errorResponse)

        })
      }
  
      /**
       * kazeki - get pageNumber of selected recipe
       * @param pageNumber
       */
      function apiCall(pageNumber) {
        apiCallsService.browseRecipes(pageNumber).then(
          function (sucessResponse) {
            vm.recipes = sucessResponse;
            console.log(vm.recipes);
          }, function (errorResponse) {

          }
        )
      }
  
      /**
       * kazeki - onInit gets page numbers
       */
      function onInit() {
        apiCall(pageNumber);
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
