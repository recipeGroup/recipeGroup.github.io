<!--160928-recipeApp_Services_apiCalls_js-->
(function () {
  angular.module('app')
    .service('apiCallsService', function ($http, $q) {
      this.browseRecipes = browseRecipes;
      this.getRecipe = getRecipe;
      /**
       * @tyeren gets the page number to allow users to change pages on the browse online page
       * @param pageNumber
         * @returns {Promise}
         */
      function browseRecipes(pageNumber) {
        var promise = $q.defer();
        $http({
          method: 'GET',
          url: 'https://food2fork.com/api/search',
          params: {
            key: '70b859c8408ff3d711daad538ff406cd',
            page: pageNumber
          }

        })
          .then( function (sucessResponse) {
            promise.resolve(sucessResponse.data.recipes);
          }, function (errorResponse) {
            console.log(errorResponse);
          });
        return promise.promise;
      }

      /**
       * @tyeren gets the recipe ID from the API so we can grab specfic information and display it to the user
       * @param recipeId
         * @returns {Promise}
         */
      function getRecipe(recipeId) {
        var promise = $q.defer();
        
        $http ({
          method: 'GET',
          url: 'https://food2fork.com/api/get',
            params: {
            key: '70b859c8408ff3d711daad538ff406cd',
            rId: recipeId
          }
        })
          .then(
            function (successResponse) {
              promise.resolve(successResponse.data)
            },function (errorResponse) {
              promise.reject(errorResponse.data)
        }
          );
        return promise.promise
      }

    });
})();
