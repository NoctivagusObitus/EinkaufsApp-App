angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
        
      
    
      
        
    .state('signup', {
      url: '/register',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })
        
      
    
      
    .state('menu', {
      url: '/side-menu',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })
      
    
      
        
    .state('menu.home', {
      url: '/home',
      views: {
        'side-menu21': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })
        
      
    
      
        
    .state('menu.marktAuswäHlen', {
      url: '/market',
      views: {
        'side-menu21': {
          templateUrl: 'templates/marktAuswäHlen.html',
          controller: 'marktAuswäHlenCtrl'
        }
      }
    })
        
      
    
      
        
    .state('einkaufen', {
      url: '/purchases',
      templateUrl: 'templates/einkaufen.html',
      controller: 'einkaufenCtrl'
    })
        
      
    
      
        
    .state('menu.gruppenverwaltung', {
      url: '/groups',
      views: {
        'side-menu21': {
          templateUrl: 'templates/gruppenverwaltung.html',
          controller: 'gruppenverwaltungCtrl'
        }
      }
    })
        
      
    
      
        
    .state('neueGruppe', {
      url: '/newgroup',
      templateUrl: 'templates/neueGruppe.html',
      controller: 'neueGruppeCtrl'
    })
        
      
    
      
        
    .state('menu.auswertungen', {
      url: '/auswertung',
      views: {
        'side-menu21': {
          templateUrl: 'templates/auswertungen.html',
          controller: 'auswertungenCtrl'
        }
      }
    })
        
      
    
      
        
    .state('details', {
      url: '/details',
      templateUrl: 'templates/details.html',
      controller: 'detailsCtrl'
    })
        
      
    
      
        
    .state('mitgliederdetails', {
      url: '/page10',
      templateUrl: 'templates/mitgliederdetails.html',
      controller: 'mitgliederdetailsCtrl'
    })
        
      
    
      
        
    .state('einkäUfe', {
      url: '/page11',
      templateUrl: 'templates/einkäUfe.html',
      controller: 'einkäUfeCtrl'
    })
        
      
    
      
        
    .state('details2', {
      url: '/page12',
      templateUrl: 'templates/details2.html',
      controller: 'details2Ctrl'
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});