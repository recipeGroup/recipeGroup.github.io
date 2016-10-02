//160928-recipeApp_js_app_js
(function () {
  //This instantiates the 'app' module, which the entire project is based on.
  angular.module('app',
    //Current Dependenies are ionic, firebase, and ngStorage
    [
      'ionic',
      'firebase',
      'ngStorage'])

//This is the configuaration for the entire 'app' module
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

      $ionicConfigProvider.views.maxCache(0);

      //$urlRouterProvider sets up the default splash page for the app once it is loaded
      $urlRouterProvider.otherwise('/tabs/login');

      //$stateProvider sets up all of the potential states for the app to run in
      $stateProvider

      //The tabs state is the parent state for the app, it is displayed in the ion-nav-view in the index
        .state('tabs', {
          url: '/tabs',
          template: '<tabs></tabs>',
          abstract: true
        })

        //The following states are children to the tabs state, they can only be viewed through the ion-nav-view located in the tabs component
        .state(
          'tabs.login', {
            url: '/login',
            template: '<login></login>'
          })
        /**
         *@kazeki1 Day 4, Thu- added this state to show recipe-detail page from my-recipes page
         */
        .state(
          'tabs.recipeDetail', {
            url: '/recipeDetail',
            template: '<recipe-detail></recipe-detail>'
          })
        .state('tabs.browse', {
          url: '/browse',
          template: '<browse></browse>'
        })
        .state('tabs.browseApp', {
          url: '/browseApp',
          template: '<browse-app></browse-app>'
        })
        .state('tabs.browseOnline', {
          url: '/browseOnline',
          template: '<browse-online></browse-online>'
        })
        .state('tabs.feedback', {
          url: '/feedback',
          template: '<feedback></feedback>'
        })
        .state('tabs.home', {
          url: '/home',
          template: '<home></home>'
        })
        .state('tabs.myRecipes', {
          url: '/myRecipes',
          template: '<my-recipes></my-recipes>'
        })
        .state('tabs.newRecipe', {
          url: '/newRecipe',
          template: '<new-recipe></new-recipe>'
        })
        .state('tabs.profile', {
          url: '/profile',
          template: '<profile></profile>'
        })
    })

    //this is the run state for ionic, it is what makes the actual native application for mobile devices
    .run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          // Don't remove this line unless you know what you are doing. It stops the viewport
          // from snapping when text inputs are focused. Ionic handles this internally for
          // a much nicer keyboard experience.
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    });


})();
