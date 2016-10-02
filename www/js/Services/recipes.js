//160928-recipeApp_Services_recipes_js
(function () {
  angular.module('app')
    .service('recipesService', function ($firebaseObject, $firebaseArray, $q) {

      //Declaring Variables for use in the service
      var selectedRecipe;

      //Declaring functions for use in the Controller
      this.addIngredient = addIngredient;
      this.deleteIngredient = deleteIngredient;
      this.editRecipe = editRecipe;
      this.getAppRecipes = getAppRecipes;
      this.getRecipes = getRecipes;
      this.getSelectedRecipe = getSelectedRecipe;
      this.saveRecipe = saveRecipe;
      this.setSelectedRecipe = setSelectedRecipe;
      this.deleteRecipe = deleteRecipe;


      //Functions for use in the Service
      /**
       * @loghen41 addIngredient() recipes a recipe, and adds an ingredient to it in the database
       * @param recipeObject
       * @returns {Promise}
         */
      function addIngredient(recipeObject) {
        var promise = $q.defer();

        var newIngredient = {
          name: '',
          quantity: ''
        };

        editRecipe(recipeObject)
          .then(function (successResponse) {
            successResponse.$add(newIngredient)
              .then(
                function () {
                  redefineArray(recipeObject.$id)
                    .then(
                      function (successResponse) {
                        promise.resolve(successResponse);
                      },
                      function (errorResponse) {
                        promise.reject(errorResponse);
                      }
                    )
                },
                function (errorResponse) {
                  console.log(errorResponse)
                });
          });

        return promise.promise;
      }

        /**
         * @loghen41 deleteIngredient() deletes an ingredient in the database
         * @param recipeObject
         * @param index
         * @returns {Promise}
         */
      function deleteIngredient(recipeObject, index) {
        var promise = $q.defer();
        editRecipe(recipeObject)
          .then(function (successResponse) {
            successResponse.$remove(index)
              .then(
                function () {
                  redefineArray(recipeObject.$id)
                    .then(
                      function (successResponse) {
                        promise.resolve(successResponse);
                      },
                      function (errorResponse) {
                        promise.reject(errorResponse);
                      }
                    )
                },
                function (errorResponse) {
                  console.log(errorResponse)
                });
          });


        return promise.promise;
      }

      function deleteRecipe(recipe) {
        var promise = $q.defer();
        firebase.database().ref("recipes/" + recipe.$id).remove()
          .then(function (successResponse) {
            promise.resolve(successResponse)
          }, function (errorResponse) {
            promise.reject(errorResponse);
        });

        return promise.promise;
      }

      /**
       * @loghen41 editRecipe() allows the user to edit a previously created recipe
       * @param recipe
       * @returns {Promise}
       */
      function editRecipe(recipe) {
        //$q makes a promise object that waits for a resolve, or a reject
        var promise = $q.defer();

        //var record is a local object that has been prepared to make an update to the database
        var record = {
          title: recipe.title,
          directions: recipe.directions,
          status: recipe.status
        };

        //var ref is a firebase reference to the recipes table
        var ref = firebase.database().ref("recipes");

        //we access the individual recipe we wish to update through ref.child(recipe.$id)
        ref.child(recipe.$id).update(record);

        if (!recipe.ingredients.hasOwnProperty('$save')) {
          var ingredientsRef = $firebaseArray(ref.child(recipe.$id + "/ingredients"));
          ingredientsRef.forEach(function (element) {
            ingredientsRef.$save(element);
          });
        }
        else {
          //We now loop through all of the ingredients on the recipe.ingredients array to save them to the database
          recipe.ingredients.forEach(function (element) {
            recipe.ingredients.$save(element);
          });
        }
        promise.resolve(redefineArray(recipe.$id));
        //we Return the $q object by saying return promise.promise
        return promise.promise;

      }

      /**
       * getAppRecipes() gets all of the public recipes built by the App
       * @returns {Promise}
         */
      function getAppRecipes() {
        var promise = $q.defer();
        var newRef = firebase.database().ref("recipes").orderByChild('status').equalTo('Public');
        var userRecipes = $firebaseArray(newRef);
        userRecipes.$loaded(
          function (successResponse) {
            successResponse.forEach(function (arrayNode) {
              var ref = firebase.database().ref('recipes/' + arrayNode.$id + '/ingredients');
              arrayNode.ingredients = $firebaseArray(ref);
              return arrayNode;
            });
            promise.resolve(successResponse);
          },
          function (errorResponse) {
            promise.reject(errorResponse);
          });
        return promise.promise;
      }

      function getRecipes(userId) {
        var promise = $q.defer();
        var newRef = firebase.database().ref("recipes").orderByChild('user').equalTo(userId);
        var userRecipes = $firebaseArray(newRef);
        userRecipes.$loaded(
          function (successResponse) {
            successResponse.forEach(function (arrayNode) {
              var ref = firebase.database().ref('recipes/' + arrayNode.$id + '/ingredients');
              arrayNode.ingredients = $firebaseArray(ref);
              return arrayNode;
            });
            promise.resolve(successResponse);
          },
          function (errorResponse) {
            promise.reject(errorResponse);
          });
        return promise.promise;
      }


      /**
       * @loghen41 allows the controller to get the selectedRecipe variable in the service
       * @returns {*}
       */
      function getSelectedRecipe() {
        return selectedRecipe;
      }

      function redefineArray(recipeId) {
        var promise = $q.defer();

        var ref = firebase.database().ref('recipes/' + recipeId + '/ingredients');
        var ingredientsArray = $firebaseArray(ref);
        promise.resolve(ingredientsArray);
        promise.reject('error');
        return promise.promise;
      }

      /**
       * @loghen41 saveRecipe() allows the user to save a brand new recipe
       * @param user
       * @param recipe
       */
      function saveRecipe(user, recipe) {
        var promise = $q.defer();

        //var record is a local object that we are preparing to send to firebase, this is only done to take out the ingredients, and add in the user, and public variables
        var record = {
          title: recipe.title,
          directions: recipe.directions,
          status: recipe.status,
          user: user.uid
        };

        //var ref is a reference to the recipes table on the database using standard firebase
        var ref = firebase.database().ref("recipes");
        //var recipesRef is a firebaseArray of the recipes table created from AngularFire
        var recipesRef = $firebaseArray(ref);

        //$add is a function on a firebaseArray, we are using $add to add the inidividual recipe to the recipes table
        recipesRef.$add(record)
          .then(
            //once the recipe has been created, we need to add the ingredients to the recipe in their own firebaseArray
            function (successResponse) {
              //var newRef gets a reference in the recipes table to the specific recipe we have just created using the firebase connection
              var newRef = firebase.database().ref("recipes").child(successResponse.key).child('ingredients');
              //var ingredientsRef takes the reference to the ingredients key on the newly made recipe, and it turns it into a firebaseArray using AngularFire
              var ingredientsRef = $firebaseArray(newRef);
              //for each ingredient in our local array, we add it to the firebaseArray, and updload it to the database
              for (var i = 0; i < recipe.ingredients.length; i++) {
                ingredientsRef.$add(recipe.ingredients[i]);
              }
              promise.resolve();
            },
            //This is a basic error catch in case the program breaks
            function (error) {
              console.log(error);
              promise.reject();
            });
        return promise.promise;
      }

      /**
       * @loghen41 allows a controller to set the selectedRecipe variable in the service for other controllers to see
       * @param recipe
       */
      function setSelectedRecipe(recipe) {
        selectedRecipe = recipe;
      }


    })
})();
