var resturl = "https://einkaufsapp-hftlswe.rhcloud.com/";
//var resturl = "http://localhost:3000/"

var module = angular.module('einkaufsapp.factories', ['ngResource']);

module.factory("Article", function ($resource) {
    return $resource(resturl + "article/:id");
});

module.factory("User", function ($http) {
    var url = 'user';
    var User = {};

    User.getUsers = function () {
        return $http.get(resturl + url);
    };

    User.getUser = function (id) {
        return $http.get(resturl + url + '/' + id);
    };

    User.getUserByName = function (name) {
        return $http.get(resturl + url + '/name/' + name);
    };

    return User;
});

module.factory("Group", function ($http) {
    var url = 'group';
    var Group = {};

    Group.getGroupsForUser = function (user_id) {
        return $http.get(resturl + url + '/member/' + user_id);
    };

    Group.getUsersByGroup = function(id){
        return $http.get(resturl + url + '/groupusers/' + id);
    };

    Group.getRichGroup = function(id){
        return $http.get(resturl + url + '/rich/' + id);
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
        return $http.post(resturl + url + '/delete/' + id);
    };

    return Group;
});

module.factory("Articles", function ($http) {
    var url = 'article';
    var Article = {};

    Article.getArticles = function () {
        return $http.get(resturl + url);
    };

    Article.getArticleById = function (id) {
        return $http.get(resturl + url + '/' + id);
    };

    Article.getArticleByEAN = function (ean) {
        return $http.get(resturl + url + '/ean/' + ean);
    };

    Article.addArticle = function (article) {
        return $http.post(resturl + url + '/add', article);
    };

    Article.editArticle = function (article) {
        return $http.post(resturl + url + '/edit/' + article.id, {
            name: article.name,
            ean: article.ean
        });
    };

    Article.deleteArticle = function (id) {
        return $http.post(resturl + url + '/delete/' + id);
    };

    return Article;

});
module.factory("Purchases", function ($http) {
    var url = 'purchase';
    var Purchase = {};


    Purchase.getPurchases = function () {
        return $http.get(resturl + url);
    };

    Purchase.getPurchaseById = function (id) {
        return $http.get(resturl + url + '/' + id);
    };

    Purchase.getPurchaseById = function (id) {
        return $http.get(resturl + url + '/' + id);
    };

    Purchase.getPurchasesByOwner = function (owner) {
        return $http.get(resturl + url + '/owner/' + owner);
    };

    Purchase.getPurchasesByBenefitial = function (benefitial) {
        return $http.get(resturl + url + '/benefitial' + benefitial)
    };

    Purchase.getRichPurchase = function (id) {
        return $http.get(resturl + url + '/rich/' + id);
    };

    Purchase.addPurchase = function (owner_id, store_id, cart) {
        return $http.post(resturl + url + '/add', {
            owner_id: owner_id,
            store_id: store_id,
            cart: cart
        });
    };

    Purchase.editPurchase = function (id, owner_id, store_id, cart) {
        return $http.post(resturl + url + '/edit/' + id, {
            owner_id: owner_id,
            store_id: store_id,
            cart: cart
        });
    };

    Purchase.deletePurchase = function (id) {
        return $http.post(resturl + url + '/delete/' + id);
    };


    return Purchase;

});
module.factory("Stores", function ($http) {
    var url = 'store';
    var Store = {};

    Store.getStore = function () {
        return $http.get(resturl + url);
    };

    Store.getStoreById = function (id) {
        return $http.get(resturl + url + '/' + id);
    };

    Store.addStore = function (store) {
        return $http.post(resturl + url + '/add', store);
    };

    Store.editStore = function (store) {
        return $http.post(resturl + url + '/edit/' + store.id, store);
    };

    Store.deleteStore = function (id) {
        return $http.post(resturl + url + '/delete/' + id);
    };

    return Store;

});


// Login and Register Factories are implemented using Angular Resource
module.factory("Login", function ($resource) {
    return $resource(resturl + "login/app");
});

module.factory("Register", function ($resource) {
    return $resource(resturl + "signup/app");
});
