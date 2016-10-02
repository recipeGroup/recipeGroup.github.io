//160928-recipeApp_new-recipes_js
(function () {
  angular.module('app')
    .component(
      'newRecipe', {
        bindings: {},
        templateUrl: 'js/Components/new-recipe/new-recipe.html',
        controller: newRecipeController,
        controllerAs: 'vm'
      });
  function newRecipeController(userService, recipesService, toastService) {

    //Declaring variables to be used by this controller
    //Local variables
    var vm = this;
    var theUser;
    //Public variables
    vm.recipe = {};
    vm.recipe.ingredients = [];
    vm.recipe.status = 'Public';

    //Declaring functions to be used by this controller
    vm.$onInit = onInit;
    vm.addIngredient = addIngredient;
    vm.deleteIngredient = deleteIngredient;
    vm.saveRecipe = saveRecipe;


    /**
     * @loghen41 addIngredients() will take a name and quantity and add that ingredient to the ingredients array
     * @param name
     * @param quantity
     */
    function addIngredient(name, quantity) {

      if (!name && !quantity) {
        toastService.showToast('Please Enter in an ingredient and quantity!');
      }
      else if (!name) {
        toastService.showToast('Please Enter in an ingredient!');
      }
      else if (!quantity) {
        toastService.showToast('Please Enter in a quantity!');
      }
      else {

        //This builds the object that we will push into the vm.recipe.ingredients array
        vm.recipe.ingredients.push({
          name: name,
          quantity: quantity
        });
        //This section resets the form variables so they are empty strings after submission
        vm.ingredient = '';
        vm.quantity = '';
      }
    }

    function deleteIngredient(index) {
      vm.recipe.ingredients.splice(index,1);
    }

    /**
     * This checks with the authenticationService to ensure that the user is still logged in, so we can actually do the work we need to do.
     */
    function onInit() {
      theUser = userService.getUser();
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
     * @loghen41 this function requires a recipe to be passed to it, it assumes it will be the vm.recipe object we have been creating to this point
     * @loghen41 the object is then passed to the recipes.js controller, where it saves the recipe on the database
     * @param recipe
     */
    function saveRecipe(recipe) {

      //we pass the recipe object to the recipesService to store the recipe on the database
      recipesService.saveRecipe(theUser, recipe)
        .then(
          function() {
            //We show a toast to the user that displays that the recipe has been created
            toastService.showToast(vm.recipe.title + ' created!');

            //We reset the recipe Object to prepare it for a new recipe
            vm.recipe = {};
            vm.recipe.status = 'Public';
          },
          function() {});



    }

  }
})();
