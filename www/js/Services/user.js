//160928-recipeApp_Services_user_js
(function () {
  angular.module('app')
    .service('userService', function ($state, $rootScope, $q) {

      var user;
      var registeredFunctions = [];

      if (window.localStorage.getItem('firebase:authUser:AIzaSyDtNbp-weG3kHrkLuhl6f9Ymy5JMQ0F8W8:[DEFAULT]')) {
        var userStorage = window.localStorage.getItem('firebase:authUser:AIzaSyDtNbp-weG3kHrkLuhl6f9Ymy5JMQ0F8W8:[DEFAULT]');
        user = JSON.parse(userStorage);
      }

      this.getUser = getUser;
      this.getProfile = getProfile;
      this.onUpdate = onUpdate;
      this.setUser = setUser;
      this.saveProfile = saveProfile;
      /**
       * @tyeren gets the firebase user id so we can use specfic user ids thru out the app
       * @returns {Promise}
         */
      function getProfile() {
        var promise = $q.defer();
        if(user) {
          firebase.database().ref('users/' + user.uid)
            .once('value').then(
            function (snapshot) {
              promise.resolve(snapshot.val());
            },
            function (errorResponse) {
              promise.reject(errorResponse);
            });
        } else
        {
          promise.reject('No User Defined')
        }
        return promise.promise;
      }

      /**
       * @tyeren returns the defined user object
       * @returns {*}
         */
      function getUser() {
        return user;
      }

      /**
       * @tyeren saves the defined user id so we can save updated information to firebase
       * @param data
         */
      function saveProfile(data) {
        var ref = firebase.database().ref('users/' + user.uid).update(data);
      }

      /**
       * @tyeren allows controller to set local user to current user
       * @param theUser
         */
      function setUser(theUser) {
        user = theUser;
        update(user);
      }

      /**
       * @tyeren allows a controller to register itself to be updated by the service
       * @param param
         */
      function onUpdate(param) {
        if (typeof param === 'function') {
          registeredFunctions.push(param);
        }
        update(user);
      }

      /**
       * @tyeren updates all of the registered controllers with the data they neeed
       * @param user
         */
      function update(user) {
        registeredFunctions.forEach(function (element) {
          element(user);
        });
      }

      $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
          if (!user && toState !== 'tabs.login') {
            event.preventDefault();
            $state.go('tabs.login');
          }
        });

    })
})();
