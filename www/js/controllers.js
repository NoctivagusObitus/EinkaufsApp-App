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
  var init = function(){
    User.getUserByName(localStorage.getItem('username')).success(function(usera){
      creatoruser = usera;
      Group.getGroupsForUser(creatoruser[0]._id).success(function(groups) {
        $scope.groups = groups;
      });
    });
  }
  init();

    $scope.delete = function(id){
    //added Permissioncheck
    var admin; 
    User.getUserByName(localStorage.getItem('username')).success(function(res){
    Group.getGroups(id).success(function(res1) {
    for(var i = 0; i < res1.users.length;i++){
               if(res[0]._id == res1.users[i].user_id._id){
                    admin = res1.users[i].permission;
               }
                  
           }
           
           //Wenn Admin dann 
           if(admin = 2){
            Group.deleteGroup(id).success(function(res){
            init();
            //tbd Error handling
            });   
           }
            //Else sollte eine Fehlermeldung ausggeben werden 
            
      });
       });
    }
                                    
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
        $state.go('app.groups')
        //tbd error handling
      });
    });
  };

  $scope.removeUser = function(index){
    if ($scope.submitusers)
      $scope.submitusers.splice(index, 1);
  };

  $scope.addUser = function(user) {
    if (!$scope.submitusers) $scope.submitusers = [];
    $scope.submitusers.push(user);
  };
})

.controller('GroupDetailCtrl', function($scope, User,  $stateParams, Group){
  $scope.users = [];
  $scope.group = [];
  var init = function() {
    Group.getUsersByGroup($stateParams.id).success(function(res){
      for(var i = 0; i < res.users.length; i++){
        var permissionString;
        switch(res.users[i].permission){
          case 1:
            permissionString = "Member";
            break;
          case 2:
            permissionString = "Admin";
            break;
        }
        $scope.users.push({username: res.users[i].user_id.username, permission: permissionString});
      }
      
      $scope.group.name = res.name;
    });
  }
  
  init();
  
  $scope.makeAdmin = function(index) {
        var admin;
           var groupa;
      //check permission
      User.getUserByName(localStorage.getItem('username')).success(function(res){
           Group.getUsersByGroup($stateParams.id).success(function(res1) {
           for(var i = 0; i < res1.users.length;i++){
               if(res[0]._id == res1.users[i].user_id._id){
                    admin = res1.users[i].permission;
               }
                  
           }
           
           //Wenn Admin dann 
           if(admin = 2){
           groupa = res1;
           groupa.users[index].permission = 2;
           Group.editGroup(groupa).success(function(res3){
           console.log(res3);
          });}
            //Else sollte eine Fehlermeldung ausggeben werden 
            
      });
       });
      
  }
    
  $scope.showDelete = function (){
    if($scope.enabledelete == true)
      $scope.enabledelete = false;
    else
      $scope.enabledelete = true;
  }

  /*var PopUp = $ionicPopup.show({
      template: '<input type="password" ng-model="data.wifi">',
      title: 'Enter Wi-Fi Password',
      subTitle: 'Please use normal things',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.wifi) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              return $scope.data.wifi;
            }
          }
        }
      ]
    });
    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });*/




})

.controller('HomeCtrl', function($scope, User) {})

.controller('PurchaseCtrl', function($scope, Purchases, User){
  var init = function(){
    User.getUserByName(localStorage.getItem('username')).success(function(user){
      Purchases.getPurchasesByOwner(user[0].id).success(function(purchases){
        $scope.purchases = purchases;
      });
    });
  }

  init();
})

.controller('MarketCtrl', function($scope, Purchases, Stores){
  var init = function(){

  }
});
