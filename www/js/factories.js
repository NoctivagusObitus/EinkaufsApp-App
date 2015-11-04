var resturl = "https://einkaufsapp-hftlswe.rhcloud.com/";

var module = angular.module('einkaufsapp.factories', ['ngResource']);

module.factory("Article", function ($resource) {
    return $resource(resturl + "article/:id");
});

module.factory("User", function ($http) {
    var url = 'user';
    var User = {};
    
    User.getUsers = function(){
        return $http.get(resturl + url);
    };
    
    User.getUser = function(id){
        return $http.get(resturl + url + '/' + id);
    };
    
     User.getUserByName = function(name){
        return $http.get(resturl + url + '/name/' + name);
    };
    
    
    return User;
});

module.factory("Login", function ($resource) {
    return $resource(resturl + "login/app");
});

module.factory("Register", function ($resource) {
    return $resource(resturl + "signup/app");
});

module.factory("Group", function ($http) {
    var url = 'group';
    var Group = {};
    Group.getGroupsForUser = function (user_id) {
        console.log("k");
        return $http.get(resturl + url + '/creator/' + user_id);
    };
    
    Group.getGroups = function (id) {
        return $http.get(resturl + url + '/' + id);
    };
    
    Group.addGroup = function (group) {
        return $http.post(resturl + url + '/add', group);
    };
    
    Group.editGroup = function (group) {
        return $http.post(resturl + url + '/edit/' + group._id, group);
    };
    
    Group.deleteGroup = function (id) {
        return $http.post(resturl + url + '/remove/' + id);
    };
    
    return Group;
});


