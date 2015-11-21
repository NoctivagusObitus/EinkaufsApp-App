angular.module('einkaufsapp.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state) {
    $scope.username = localStorage.getItem('username');

    $scope.logout = function () {
        localStorage.clear();
        $state.go('welcome');
    }
})


.controller('WelcomeCtrl', function ($scope, $ionicModal, Login, $state) {
    var init = function () {
        var username = localStorage.getItem('username');
        var password = localStorage.getItem('password');
        $scope.loginData = {
            username: username,
            password: password
        };
        Login.save($scope.loginData, function (response) {
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

    $scope.login = function () {
        $state.go('login');
    };

    $scope.register = function () {
        $state.go('register');
    };
})

.controller('LoginCtrl', function ($state, $sanitize, $scope, Login) {
    $scope.loginData = {};
    $scope.error = {};

    $scope.doLogin = function () {
        Login.save($scope.loginData, function (response) {
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

.controller('RegisterCtrl', function ($state, $sanitize, $scope, Register) {
    $scope.registerData = {};
    $scope.register = function () {
        Register.save($scope.registerData, function (response) {
            if (response.status == "ok") {
                $state.go('app.home');
                localStorage.setItem('username', $scope.registerData.username);
                localStorage.setItem('password', $scope.registerData.password);
            } else alert(response.message);
        });
    }
})

.controller('GroupsCtrl', function ($state, $stateParams, Group, User, $ionicModal, $scope) {

    $ionicModal.fromTemplateUrl('templates/modals/group-add.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    Group.getGroupsForUser().success(function (groups) {
        $scope.groups = groups;
    });

    $scope.showAddModal = function () {
        $scope.modal.show();
        User.getUsers().success(function (users) {
            $scope.users = users;
        });
    };
    $scope.closeAddModal = function () {
        $scope.modal.hide();
    };

    $scope.addUser = function (user) {
        if (!$scope.submitusers) $scope.submitusers = [];
        $scope.submitusers.push(user);
    }

    $scope.AddGroup = function () {
        var group = [];
        var users = [];
        for (var i = 0; i < $scope.submitusers.length; i++)
            users.push($scope.submitusers[i]._id);
        User.getUserByName(localStorage.getItem('username')).success(function (usera) {
            console.log(usera);
            var creator = usera._id;
            var name = $scope.groupname;
            group.push({name: name, creator: creator, users: users});

            console.log(group);
            //Group.addGroup(group);
        });
    };

})

.controller('HomeCtrl', function ($scope, User) {
})