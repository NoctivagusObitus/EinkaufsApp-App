angular.module('einkaufsapp.controllers', ['chart.js'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
  $scope.username = localStorage.getItem('username');

  $scope.logout = function() {
    localStorage.clear();
    $state.go('login');
  }
})

.controller('AuswertungenCtrl', function($scope) {
 
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
 
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
  $scope.passwordshow={};
  $scope.Checkbox ={};
  var init = function(){
      $scope.passwordshow.state = false;
  };
  init();
  $scope.showPassword = function(){
      if ($scope.Checkbox.value){
          $scope.passwordshow.state = true;
      }
      else{
          $scope.passwordshow.state = false ;
      }
  }
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
  $scope.error = {};
  $scope.passwordshow={};
  $scope.Checkbox ={};
  var init = function(){
      $scope.passwordshow.state = false;
  };
  init();
  $scope.showPassword = function(){
      if ($scope.Checkbox.value){
          $scope.passwordshow.state = true;
      }
      else{
          $scope.passwordshow.state = false ;
      }
  }
  $scope.register = function() {
    Register.save($scope.registerData, function(response) {
      if (response.status == "ok") {
        $state.go('app.home');
        localStorage.setItem('username', $scope.registerData.username);
        localStorage.setItem('password', $scope.registerData.password);
      } else {
        $scope.error.state = true;
        $scope.error.message = response.message;
      }
    });
  }
})

.controller('GroupsCtrl', function($state, $stateParams, Group, User, $ionicModal, $scope) {
  var creatoruser = {};

  //Get Groups for Groupmembers ! :)
  var init = function() {
    User.getUserByName(localStorage.getItem('username')).success(function(usera) {
      creatoruser = usera;
      Group.getGroupsForUser(creatoruser[0]._id).success(function(groups) {
        $scope.groups = groups;
      });
    });
  }
  init();

  $scope.delete = function(id) {
    //added Permissioncheck
    var admin;
    User.getUserByName(localStorage.getItem('username')).success(function(res) {
      Group.getGroups(id).success(function(res1) {
        for (var i = 0; i < res1.users.length; i++) {
          if (res[0]._id == res1.users[i].user_id._id) {
            admin = res1.users[i].permission;
          }

        }

        //Wenn Admin dann
        if (admin = 2) {
          Group.deleteGroup(id).success(function(res) {
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
      users.push({
        'user_id': $scope.submitusers[i]._id,
        'permission': 1
      });

    User.getUserByName(localStorage.getItem('username')).success(function(usera) {
      users.push({
        'user_id': usera[0]._id,
        'permission': 2
      });
      group.push({
        name: name,
        users: users
      });

      Group.addGroup(group[0]).success(function(res) {
        $state.go('app.groups')
          //tbd error handling
      });
    });
  };

  $scope.removeUser = function(index) {
    if ($scope.submitusers)
      $scope.submitusers.splice(index, 1);
  };

  $scope.addUser = function(user) {
    if (!$scope.submitusers) $scope.submitusers = [];
    $scope.submitusers.push(user);
  };
})

.controller('GroupDetailCtrl', function($scope, User, $stateParams, Group,$state, $sanitize) {
  $scope.users = [];
  $scope.group = [];
  $scope.error =[];
  $scope.grouphtml = [];
  $scope.groupadd = []
  var init = function() {
      $scope.groupadd.state = true;
    Group.getUsersByGroup($stateParams.id).success(function(res) {
      for (var i = 0; i < res.users.length; i++) {
        var permissionString;
        switch (res.users[i].permission) {
          case 1:
            permissionString = "Member";
            break;
          case 2:
            permissionString = "Admin";
            break;
        }
        $scope.users.push({
          username: res.users[i].user_id.username,
          permission: permissionString
        });
      }

      $scope.group.name = res.name;
    });
  }

  init();
  $scope.deleteMember = function(index){
      //Permissioncheck
      var admin;
      User.getUserByName(localStorage.getItem('username')).success(function(res) {
      Group.getGroups($stateParams.id).success(function(res1) {
          for (var i = 0; i < res1.users.length; i++) {
          if (res[0]._id == res1.users[i].user_id) {
            admin = res1.users[i].permission;
          }

        }
        //Wenn Admin dann
      if (admin == 2) {
      if(res1.users[index].user_id != res[0]._id ){ //man kann sich nicht selbst löschen !
      Group.getGroups($stateParams.id).success(function(groupressource){
      var groupnew;
      var usersnew=[];
      groupnew = groupressource;
      for(var i = 0; i < groupressource.users.length; i++){
          if(i==index){
          }
          else{
         usersnew.push({
          '_id' : groupressource.users[i]._id,
          'user_id': groupressource.users[i].user_id,
          'permission': groupressource.users[i].permission });
          }
      }
      groupnew.users = usersnew;
      Group.editGroup(groupnew).success(function(groupress2){
          $state.go($state.current, {}, {reload: true}); //reload
      });

      });
        }}
        //Else Fehlermeldung
        else{
        $scope.error.state = true;
        $scope.error.message = "Sie benötigen Administratorrechte um diese Aktion durchzuführen.";}
      });
    });
  }
  $scope.makeAdmin = function(index) {
    var admin;
    var groupa;
    var permission;
    //check permission
    Group.getUsersByGroup($stateParams.id).success(function(group){
      for(var i = 0; i < group.users.length; i++){
        if(localStorage.getItem('username') == group.users[i].user_id.username)
          permission = group.users[i].permission;
      }

      if (permission == 2){
        group.users[index].permission = 2;
        Group.editGroup(group).success(function(res){
          $state.go($state.current, {}, {reload: true});
        })
      }
      else{
        $scope.error.state = true;
        $scope.error.message = "Sie benötigen Administratorrechte um diese Aktion durchzuführen.";}

    });

  }

  $scope.deleteGroup=function(){
          //added Permissioncheck
        var admin;
        User.getUserByName(localStorage.getItem('username')).success(function(res) {
        Group.getGroups($stateParams.id).success(function(res1) {
          for (var i = 0; i < res1.users.length; i++) {
          if (res[0]._id == res1.users[i].user_id) {
            admin = res1.users[i].permission;
          }

        }
        //Wenn Admin dann
        if (admin == 2) {
          Group.deleteGroup($stateParams.id).success(function(res) {
            $state.go('app.groups');
          });
        }
        //Else Fehlermeldung
        else{
        $scope.error.state = true;
        $scope.error.message = "Sie benötigen Administratorrechte um diese Aktion durchzuführen.";}
      });
    });


  }

  $scope.changeGroupname = function(){
      $scope.grouphtml.state = true; // Inputelement und Commit Button zeigen
      $scope.groupadd.state = false; //button Gruppe hinzufügen ausblenden

  }
  $scope.changeGroupname_1 = function(){
        var admin;
        User.getUserByName(localStorage.getItem('username')).success(function(res) {
        Group.getGroups($stateParams.id).success(function(res1) {
          for (var i = 0; i < res1.users.length; i++) {
          if (res[0]._id == res1.users[i].user_id) {
            admin = res1.users[i].permission;
          }

        }
        //Wenn Admin dann
        if (admin == 2) {
          res1.name = $scope.grouphtml.input;
           Group.editGroup(res1).success(function(res){
          $state.go($state.current, {}, {reload: true});
          });
        }
        //Else Fehlermeldung
        else{
        $scope.error.state = true;
        $scope.error.message = "Sie benötigen Administratorrechte um diese Aktion durchzuführen.";
        $scope.grouphtml.state = false; // Inputelement und Commit Button verstecken
        $scope.groupadd.state = true; //button Gruppe hinzufügen einblenden
        }
      });
    });
  }

  $scope.showDelete = function() {
    if ($scope.enabledelete == true)
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

.controller('PurchasesCtrl', function($scope, Purchases, User) {
  var init = function() {
    User.getUserByName(localStorage.getItem('username')).success(function(user) {
      Purchases.getPurchasesByOwner(user[0].id).success(function(purchases) {
        $scope.purchases = purchases;
      });
    });
  }

  init();
})

.controller('PurchaseCtrl', function($scope, Purchases, Articles, ProductService, $cordovaBarcodeScanner, $ionicModal) {
  $ionicModal.fromTemplateUrl('templates/modals/product-add.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  var init = function() {
    console.log(ProductService.products);
    if (!ProductService.products)
      ProductService.products = [];
    $scope.products = ProductService.products;
    $scope.product = [];
  }

  init();

  $scope.scan = function() {
    $cordovaBarcodeScanner.scan().then(function(imageData) {
      console.log(imageData.text);
      $scope.product.ean = imageData.text;
      Articles.getArticleByEAN(imageData.text).success(function(article){
        console.log(article.length);
        if(article[0]._id != "undefined"){
          $scope.product.name = article[0].name;
          $scope.product._id = article[0]._id;
          ArticleCosts.getEntityByProduct(article[0]._id, MarketService.market).success(function(entity){
            if(entity[0]._id != "undefined")
            $scope.product.price = entity[0].costs.price;
          });
        }
        else $scope.product._id = "0";
      });
      showModal();
    }, function(error) {});
  }

  showModal = function() {
    $scope.modal.show();
  }

  $scope.closeModal = function(){
    $scope.modal.hide();
  }

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $scope.finishProduct = function() {
    ProductService.products.push($scope.product);
    $scope.product = {};
  }
})

.controller('MatchCtrl', function($scope, User, Group, Purchases, $state, ProductService, MarketService){
    var init = function() {
      $scope.data = [];
      User.getUserByName(localStorage.getItem('username')).success(function(usera) {
        creatoruser = usera;
        $scope.user = [];
        $scope.user = usera[0];
        Group.getGroupsForUser(creatoruser[0]._id).success(function(groups) {
          $scope.groups = groups;
        });
      });
    }
  init();

  $scope.finalize = function(){
    var date = Date.now();
    var purchase = {};
    purchase.cart = [];
    var products = ProductService.products;
    for (var i = 0; i < products.length; i++){
      var costs = { price: products[i].price, currency: { name: "Euro" }, date: date};
      var article = { ean: products[i].ean, name: products[i].name};
      var articlecosts = {store_id: MarketService.market, article: article, costs: costs};
      if(products[i].toggle){
        var offer = {start_date: products[i].start_date, end_date: products[i].end_date, price: products[i].offerprice};
        articlecosts.offer = offer;
        purchase.cart.push({amount: products[i].amount, article_costs: articlecosts , benefitial_id: products[i].benefitial});
      } else {
        purchase.cart.push({amount: products[i].amount, article_costs: articlecosts , benefitial_id: products[i].benefitial});
      }}
    //final step - lets fill the purchase object with the rest that is needed
    purchase.date = date;
    purchase.owner_id = $scope.data.selectedGroup;
    purchase.store_id = MarketService.market;
    console.log(purchase);
    Purchases.addPurchase(purchase).success(function(stuff){
      console.log(stuff);
    });

    //Clear stuff up.
    ProductService.products = [];
    $state.go('app.purchases_overview');
  }

})



.controller('MarketCtrl', function($scope, Purchases, Stores, $state, MarketService) {
  var init = function() {
    Stores.getStore().success(function(stores) {
      $scope.stores = stores;
    });
    $scope.data = [];
  }

  $scope.createMarket = function() {
    $state.go('app.market-add');
  }

  $scope.chooseMarket = function() {
    MarketService.market = $scope.data.selectedStore;
    console.log(MarketService.market);
    $state.go('app.purchases');
  }

  init();
})

.controller('MarketAddCtrl', function($state, $scope, Stores, $cordovaGeolocation) {
  var init = function() {
    $scope.gps = [];
    $scope.market = [];
    $scope.gpslocation = false;
  }

  init();

  $scope.createMarket = function() {
    var market = [];
    market.push({
      name: $scope.market.name,
      gps: {
        ln: 0,
        lat: 0
      },
      country: $scope.market.country,
      zip: $scope.market.zip,
      street: $scope.market.street,
      street_num: $scope.market.street_num
    });
    console.log(market);
    Stores.addStore(market[0]).success(function(res) {
      console.log(res);
    });
  }


  $scope.getLocation = function() {
    $cordovaGeolocation.getCurrentPosition(function(position) {
      console.log(position);
      alert(position);
      $scope.gps.lng = position.coords.longitude;
      $scope.gps.lat = position.coords.longitude;
      $scope.gpslocation = true;
    }, function(error) {
      alert("can't get location.. sorry");
    });
  }
});
