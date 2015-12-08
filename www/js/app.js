// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('einkaufsapp', ['ionic', 'ngCordova','chart.js','einkaufsapp.controllers', 'einkaufsapp.factories', 'einkaufsapp.services'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })

    .state('register', {
        url: '/register',
        templateUrl: 'templates/signup.html',
        controller: 'RegisterCtrl'
    })

     .state('app.purchases_overview', {
        url: '/purchases_overview',
        views: {
            'menuContent': {
                templateUrl: 'templates/purchase_overview.html',
                controller: 'PurchasesCtrl'
            }
        }
    })

    .state('app.purchases', {
        url: '/purchases',
        views: {
            'menuContent': {
                templateUrl: 'templates/purchases.html',
                controller: 'PurchaseCtrl'
            }
        }
    })

     .state('app.purchases_match', {
        url: '/purchases_match',
        views: {
            'menuContent': {
                templateUrl: 'templates/purchases_match.html',
                controller: 'MatchCtrl'
            }
        }
    })

    .state('app.purchases_details', {
        url: '/purchases_details',
        views: {
            'menuContent': {
                templateUrl: 'templates/purchases_details.html'
            }
        }
    })

    .state('app.product_details', {
        url: '/product_details',
        views: {
            'menuContent': {
                templateUrl: 'templates/product_details.html'
            }
        }
    })

    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            }
        }
    })
//first selection
    .state('app.market', {
        url: '/market',
        views: {
            'menuContent': {
                templateUrl: 'templates/market_select.html',
                controller: 'MarketCtrl'
            }
        }
    })

    .state('app.market-add', {
      url: '/market-add',
      views: {
        'menuContent': {
          templateUrl: 'templates/market_add.html',
          controller: 'MarketAddCtrl'
        }
      }
    })

      .state('app.settings', {
        url: '/settings',
        views: {
            'menuContent': {
                templateUrl: 'templates/einstellungen.html',
            }
        }
    })
    .state('app.auswertung', {
        url: '/auswertung',
        views: {
            'menuContent': {
                templateUrl: 'templates/auswertung_select.html',
                controller: 'AuswertungenCtrl'
            }
        }
    })
    
    .state('app.purchase-quantity', {
        url: '/purchase-quantity',
        views: {
            'menuContent': {
                templateUrl: 'templates/auswertung_kaufhaufigkeit.html',
                controller : 'PurchaseQuantityCtrl'
            }
        }
    })
        
    .state('app.purchase-timeline', {
        url: '/purchase-timeline',
        views: {
            'menuContent': {
                templateUrl: 'templates/ausgabenverlauf_chart.html',
                controller : 'Purchase-TimelineCtrl'
                
            }
        }
    })
    
     .state('app.grouppurchase-timeline', {
        url: '/grouppurchase-timeline',
        views: {
            'menuContent': {
                templateUrl: 'templates/gruppenverlauf_chart.html',
                controller: 'GroupPurchase-TimelineCtrl'
                
            }
        }
    })

    .state('app.groups', {
        url: '/groups',
        views: {
            'menuContent': {
                templateUrl: 'templates/gruppenverwaltung.html',
                controller: 'GroupsCtrl'
            }
        }
    })

    .state('app.group', {
        url: '/groups/:id',
        views: {
            'menuContent' : {
                templateUrl: 'templates/group_details.html',
                controller: 'GroupDetailCtrl'
            }
        }
    })

    .state('app.group-add', {
        url: '/group-add',
        views: {
            'menuContent' : {
                templateUrl: 'templates/group_add.html',
                controller: 'GroupAddCtrl'
            }
        }
    });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});
