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
        $scope.loginData = {username: username, password: password};
        Login.save($scope.loginData, function (response) {
            if (response.status == "ok") {
                $state.go('app.home');
                localStorage.setItem('username', $scope.loginData.username);
                localStorage.setItem('password', $scope.loginData.password);
            }
            else {
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
            }
            else {
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

.controller('HomeCtrl', function ($scope, User){
    $scope.User = User.query();
})
