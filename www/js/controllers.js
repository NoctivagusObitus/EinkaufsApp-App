angular.module('einkaufsapp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
  $scope.username = localStorage.getItem('username');

  $scope.logout = function() {
    localStorage.clear();
    $state.go('login');
  }
})

.controller('WelcomeCtrl', function($scope, $ionicModal, Login, $state) {
  var init = function() {
    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');
    $scope.loginData = {
      username: username,
      password: password
    };
    Login.save($scope.loginData, function(response) {
      if (response.status == "ok") {
        $state.go('app.home');
        localStorage.setItem('username', $scope.loginData.username);
        localStorage.setItem('password', $scope.loginData.password);
      } else {
        console.log(response);
      }
    });
  }
  init();

  $scope.login = function() {
    $state.go('login');
  };

  $scope.register = function() {
    $state.go('register');
  };
})

.controller('LoginCtrl', function($state, $sanitize, $scope, Login) {
  var init = function() {
    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');
    $scope.loginData = {
      username: username,
      password: password
    };
    Login.save($scope.loginData, function(response) {
      if (response.status == "ok") {
        $state.go('app.home');
        localStorage.setItem('username', $scope.loginData.username);
        localStorage.setItem('password', $scope.loginData.password);
      } else {
        console.log(response);
      }
    });
  }
  init();
  $scope.loginData = {};
  $scope.error = {};

  $scope.doLogin = function() {
    Login.save($scope.loginData, function(response) {
      if (response.status == "ok") {
        $state.go('app.home');
        localStorage.setItem('username', $scope.loginData.username);
        localStorage.setItem('password', $scope.loginData.password);
      } else {
        console.log(response);
        $scope.error.state = true;
        $scope.error.message = response.message;
      }
    });
  }
})

.controller('RegisterCtrl', function($state, $sanitize, $scope, Register) {
  $scope.registerData = {};
  $scope.register = function() {
    Register.save($scope.registerData, function(response) {
      if (response.status == "ok") {
        $state.go('app.home');
        localStorage.setItem('username', $scope.registerData.username);
        localStorage.setItem('password', $scope.registerData.password);
      } else alert(response.message);
    });
  }
})

.controller('GroupsCtrl', function($state, $stateParams, Group, User, $ionicModal, $scope) {
  var creatoruser = {};

  //Get Groups for Groupmembers ! :)
  User.getUserByName(localStorage.getItem('username')).success(function(usera){
      creatoruser = usera;
      Group.getGroupsForUser(creatoruser[0]._id).success(function(groups) {
        $scope.groups = groups;
      });
    });

//Show Add View
  $scope.showAddModal = function() {
    $state.go('app.group-add')
  };
})

.controller('GroupAddCtrl', function($state, $stateParams, Group, User, $ionicModal, $scope) {

  //Scope Variables have to be initialized in order for them to be accessible!
  $scope.newData = {};

  //Get UserList
  User.getUsers().success(function(users) {
    $scope.users = users;
  });

  $scope.AddGroup = function() {
    var name = $scope.newData.group;
    var users = [];
    var group = [];
    for (var i = 0; i < $scope.submitusers.length; i++)
      users.push({'user_id': $scope.submitusers[i]._id, 'permission': 1});

    User.getUserByName(localStorage.getItem('username')).success(function(usera) {
      users.push({'user_id': usera[0]._id, 'permission': 2});
      group.push({
        name: name,
        users: users
      });

      Group.addGroup(group[0]).success(function(res){
        //tbd error handling
      });
    });
  };

  $scope.addUser = function(user) {
    if (!$scope.submitusers) $scope.submitusers = [];
    $scope.submitusers.push(user);
  };


})

.controller('HomeCtrl', function($scope, User) {})
