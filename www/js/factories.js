var resturl = "https://einkaufsapp-hftlswe.rhcloud.com/";

var module = angular.module('einkaufsapp.factories', ['ngResource']);

module.factory("Article", function ($resource) {
    return $resource(resturl + "article/:id");
});

module.factory("User", function ($resource) {
    return $resource(resturl + "user/:id");
});

module.factory("Login", function ($resource) {
    return $resource(resturl + "login/app");
});

module.factory("Register", function ($resource) {
    return $resource(resturl + "signup/app");
});

