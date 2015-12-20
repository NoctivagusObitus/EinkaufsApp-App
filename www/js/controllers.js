angular.module('einkaufsapp.controllers', ['chart.js'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
  $scope.username = localStorage.getItem('username');

  $scope.logout = function() {
    localStorage.clear();
    $state.go('login');
  }
})

.controller('AuswertungenCtrl', function($scope, $ionicModal, $state) {
 $scope.Auswahl = {};
 $scope.error = {};

 $scope.Auswerten = function(){
  //Auswahl der Auswertung und Fehlerbehandlung

    if($scope.Auswahl == 'Kaufhäufigkeit'){
        $state.go('app.purchase-quantity');
    }
    else if($scope.Auswahl == 'Ausgabenverlauf'){
        $state.go('app.purchase-timeline');
    }
    else if($scope.Auswahl == 'Gruppenverlauf'){
        $state.go('app.grouppurchase-timeline');
    }
    else{
        $scope.error.state = true;
        $scope.error.message = 'Bitte Auswertung auswählen';
    }
 };
})


.controller('PurchaseQuantityCtrl', function($scope, $ionicModal, $state, User) {
    var todayDate = new Date(), weekDate = new Date();
    weekDate.setTime(todayDate.getTime()-(30*24*3600000));//Startdatum auf - 30 Tage von aktuellem Datum
    $scope.Zeitraum = {
        Startdatum: weekDate ,
        Enddatum : new Date ()
    };
    var jetzt  = new Date().getTime();
    var damals = jetzt - (30 * 24 * 3600);
    $scope.User = {};
    $scope.Articles = new Array();
    $scope.Gesamtausgaben = 0 ;
    $scope.AnzahlEinkaeufe = 0;
    $scope.username = localStorage.getItem('username');
    var testdaten = [
       [{
           Einkauf_Name: 'Einkauf1',
           Einkauf_ID:'123',
           Date: new Date(2015, 11, 09),
           Owner_id : '564e2efd0462fbc12ad2c050',
           Articles: [{
               Article: 'Butter',
               Amount : 10,
               Price: 0.79
           },
           {
               Article: 'Marmelade',
               Amount : 1,
               Price: 0.49
           },
           {
               Article: 'Zigaretten',
               Amount : 2,
               Price: 5.49
           },
           {
               Article: 'Kondome',
               Amount : 1,
               Price: 15.79
           }
           ]
        }],
       [{
           Einkauf_Name: 'Einkauf2',
           Einkauf_ID:'001',
           Date: new Date(2015, 11, 10),
           Owner_id : '564e2efd0462fbc12ad2c050',
           Articles: [{
               Article: 'Brot',
               Amount : 40,
               Price: 1.79
           },
           {
               Article: 'Marmelade',
               Amount : 4,
               Price: 0.49
           },
           {
               Article: 'Zigaretten',
               Amount : 1,
               Price: 5.49
           },
           {
               Article: 'Kondome',
               Amount : 20,
               Price: 15.79
           }
           ]
       }],
       [{
           Einkauf_Name: 'Einkauf3',
           Einkauf_ID:'002',
           Date: new Date(2015, 09, 10),
           Owner_id : '564e2efd0462fbc12ad2c050',
           Articles: [{
               Article: 'Brot',
               Amount : 40,
               Price: 1.79
           },
           {
               Article: 'Marmelade',
               Amount : 4,
               Price: 0.49
           },
           {
               Article: 'Zigaretten',
               Amount : 5,
               Price: 5.49
           },
           {
               Article: 'Kondome',
               Amount : 100,
               Price: 15.79
           }
           ]
       }],
       [{
           Einkauf_Name: 'Einkauf4',
           Einkauf_ID:'003',
           Date: new Date(2015, 10, 10),
           Owner_id : '566181a522eca772b6919a8d',
           Articles: [{
               Article: 'Brot',
               Amount : 40,
               Price: 1.79
           },
           {
               Article: 'Marmelade',
               Amount : 4,
               Price: 0.49
           },
           {
               Article: 'Zigaretten',
               Amount : 5,
               Price: 5.49
           },
           {
               Article: 'Kondome',
               Amount : 100,
               Price: 15.79
           }
           ]
       }]

   ];
   var username = localStorage.getItem('username');
   $scope.Auswerten = function (){
       $scope.Gesamtausgaben = 0; //Alles 0 setzen
       $scope.AnzahlEinkaeufe = 0 ;
       var Articles2 = [];
       $scope.Articles = new Array();
       User.getUserByName(localStorage.getItem('username')).success(function(res) {
       for(var i = 0; i < testdaten.length;i++ ){
        var gefunden = false ;
        if(res[0]._id == testdaten[i][0].Owner_id){
        if(testdaten[i][0].Date.getTime() >= $scope.Zeitraum.Startdatum.getTime() && testdaten[i][0].Date.getTime()  <= $scope.Zeitraum.Enddatum.getTime()){
         $scope.AnzahlEinkaeufe ++ ;
         for(var j = 0; j<testdaten[i][0].Articles.length ; j++){

             $scope.Gesamtausgaben =(testdaten[i][0].Articles[j].Amount * testdaten[i][0].Articles[j].Price) + $scope.Gesamtausgaben;
             if(Articles2.length <1 ) //erster Artikel wird immer gepusht
                 {
                     Articles2.push({
                     Article: testdaten[i][0].Articles[j].Article,
                     Amount: testdaten[i][0].Articles[j].Amount,
                     Price : testdaten[i][0].Articles[j].Price,
                     Price_Total : 0
                     });
                 }else {
                     for(var k = 0; k< Articles2.length; k ++){           //Überprüfen ob Artikel bereits in Array
                         if(Articles2[k].Article == testdaten[i][0].Articles[j].Article){   //Wenn vorhanden dann addieren
                             Articles2[k].Price = ((Articles2[k].Price * Articles2[k].Amount)+(testdaten[i][0].Articles[j].Amount * testdaten[i]   [0].Articles[j].Price)) /  (Articles2[k].Amount + testdaten[i][0].Articles[j].Amount); //Preisdurchschnitt errechnen
                             Articles2[k].Price = Math.round(100 * Articles2[k].Price)/100 //runden
                             Articles2[k].Amount = Articles2[k].Amount + testdaten[i][0].Articles[j].Amount; //Anzahl zusammen addieren

                             gefunden = true ;
                             break; //Element gefunden break
                         }
                     }; // for k

                     if(gefunden == false){
                           Articles2.push({
                           Article: testdaten[i][0].Articles[j].Article,
                           Amount: testdaten[i][0].Articles[j].Amount,
                           Price : testdaten[i][0].Articles[j].Price,
                           Price_Total : 0
                           });
                     };
                 };



         };//Gesamtausgaben berechnen und Artikel in Articles pushen

       }; //if in Zeitraum
       }; //if owner einkauf = userid
       }; //testdaten.length Zählschleife
       for(var l = 0; l< Articles2.length; l++){    //Gesamtpreis berechnen
           Articles2[l].Price_Total = Articles2[l].Price * Articles2[l].Amount;
       }
       $scope.Gesamtausgaben = Math.round(100* $scope.Gesamtausgaben)/100; //runden
       $scope.Articles = Articles2;
       });//User get Ende
   };

})

.controller('Purchase-TimelineCtrl', function($scope, $ionicModal, $state, User) {
    var todayDate = new Date(), weekDate = new Date();
    var Tagespreis;

    weekDate.setTime(todayDate.getTime()-(30*24*3600000));//Startdatum auf - 30 Tage von aktuellem Datum
    $scope.Zeitraum = {
        Startdatum: weekDate ,
        Enddatum : new Date ()
    };
    var testdaten = [
       [{
           Einkauf_Name: 'Einkauf1',
           Einkauf_ID:'123',
           Date: new Date(2015, 11, 09),
           Owner_id : '564e2efd0462fbc12ad2c050',
           Articles: [{
               Article: 'Butter',
               Amount : 10,
               Price: 0.79
           },
           {
               Article: 'Marmelade',
               Amount : 1,
               Price: 0.49
           },
           {
               Article: 'Zigaretten',
               Amount : 2,
               Price: 5.49
           },
           {
               Article: 'Kondome',
               Amount : 1,
               Price: 15.79
           }
           ]
        }],
        [{
           Einkauf_Name: 'Einkauf1',
           Einkauf_ID:'123',
           Date: new Date(2015, 09, 09),
           Owner_id : '566181a522eca772b6919a8d',
           Articles: [{
               Article: 'Butter',
               Amount : 10,
               Price: 0.79
           },
           {
               Article: 'Marmelade',
               Amount : 1,
               Price: 0.49
           },
           {
               Article: 'Zigaretten',
               Amount : 2,
               Price: 5.49
           },
           {
               Article: 'Kondome',
               Amount : 1,
               Price: 15.79
           }
           ]
        }],
       [{
           Einkauf_Name: 'Einkauf2',
           Einkauf_ID:'001',
           Date: new Date(2015, 11, 10),
           Owner_id : '564e2efd0462fbc12ad2c050',
           Articles: [{
               Article: 'Brot',
               Amount : 40,
               Price: 1.79
           },
           {
               Article: 'Marmelade',
               Amount : 4,
               Price: 0.49
           },
           {
               Article: 'Zigaretten',
               Amount : 1,
               Price: 5.49
           },
           {
               Article: 'Kondome',
               Amount : 20,
               Price: 15.79
           }
           ]
       }],
       [{
           Einkauf_Name: 'Einkauf3',
           Einkauf_ID:'002',
           Date: new Date(2015, 09, 10),
           Owner_id : '564e2efd0462fbc12ad2c050',
           Articles: [{
               Article: 'Brot',
               Amount : 40,
               Price: 1.79
           },
           {
               Article: 'Marmelade',
               Amount : 4,
               Price: 0.49
           },
           {
               Article: 'Zigaretten',
               Amount : 5,
               Price: 5.49
           },
           {
               Article: 'Kondome',
               Amount : 100,
               Price: 15.79
           }
           ]
       }],
       [{
           Einkauf_Name: 'Einkauf4',
           Einkauf_ID:'003',
           Date: new Date(2015, 10, 10),
           Owner_id : '566181a522eca772b6919a8d',
           Articles: [{
               Article: 'Brot',
               Amount : 40,
               Price: 1.79
           },
           {
               Article: 'Marmelade',
               Amount : 4,
               Price: 0.49
           },
           {
               Article: 'Zigaretten',
               Amount : 5,
               Price: 5.49
           },
           {
               Article: 'Kondome',
               Amount : 100,
               Price: 15.79
           }
           ]
       }]

   ]; //Testdaten der Einkäufe hier später Abfrage einfügen und auf Testdaten legen anpassen nicht vergessen
    $scope.Auswerten = function(){
       var label = [];
       var Daten = [];
       testdaten = sort_select(testdaten);
       User.getUserByName(localStorage.getItem('username')).success(function(res) {
           for(var i = 0; i < testdaten.length;i++ ){
               if(res[0]._id == testdaten[i][0].Owner_id && testdaten[i][0].Date.getTime() >= $scope.Zeitraum.Startdatum.getTime() && testdaten[i][0].Date.getTime()                     <= $scope.Zeitraum.Enddatum.getTime()){                //Bedingung im Zeitraum und Owner des Einkauf = User

                   label.push(testdaten[i][0].Date.getDate() +"." + (testdaten[i][0].Date.getMonth()+1) + "." + testdaten[i][0].Date.getFullYear());
                   Tagespreis = 0; //Nullsetzen
                   for(var j = 0; j< testdaten[i][0].Articles.length; j++){
                       Tagespreis = Math.round(100 *(Tagespreis + (testdaten[i][0].Articles[j].Price * testdaten[i][0].Articles[j].Amount)))/100;
                   }
                   Daten.push(Tagespreis);
               };//if User = Owner Ende

           };//For Testdaten Ende
       $scope.chartData = {         //Scope Diagramm belegen
       labels: label,
       data: [Daten]    };
       });//User Get-Ende


    }; //Auswerten Ende



    function sort_select (testdaten){
        var temp;
        for(var i = 0; i < testdaten.length;i++ ){
            for(var j= i+1; j < testdaten.length;j++){
                if(testdaten[j][0].Date.getTime()< testdaten[i][0].Date.getTime()){  // Tausch
                    temp = testdaten[i];
                    testdaten[i] = testdaten[j];
                    testdaten[j] = temp;
                };
            };//innere Schleife Select Sort

        };//For Testdaten.length ende
        return testdaten;
    }

})

.controller('GroupPurchase-TimelineCtrl', function($scope, $ionicModal, $stateParams, $state, User, Group) {
    var todayDate = new Date(), weekDate = new Date();
    weekDate.setTime(todayDate.getTime()-(30*24*3600000));//Startdatum auf - 30 Tage von aktuellem Datum
    $scope.Zeitraum = {
        Startdatum: weekDate ,
        Enddatum : new Date ()
    };
    var chartDatenMaster= {
        Daten : [],
        label : []
    };
    var testdaten = [
       [{
           Einkauf_Name: 'Einkauf1',
           Einkauf_ID:'123',
           Date: new Date(2015, 6, 09),
           Owner_id : '5660c46822eca772b6919a87',
           Articles: [{
               Article: 'Butter',
               Amount : 10,
               Price: 0.79
           },
           {
               Article: 'Marmelade',
               Amount : 1,
               Price: 0.49
           },
           {
               Article: 'Zigaretten',
               Amount : 2,
               Price: 5.49
           },
           {
               Article: 'Kondome',
               Amount : 1,
               Price: 15.79
           }
           ]
        }],
        [{
           Einkauf_Name: 'Einkauf1',
           Einkauf_ID:'123',
           Date: new Date(2015, 05, 09),
           Owner_id : '5660c46822eca772b6919a87',
           Articles: [{
               Article: 'Butter',
               Amount : 10,
               Price: 0.79
           },
           {
               Article: 'Marmelade',
               Amount : 1,
               Price: 0.49
           },
           {
               Article: 'Zigaretten',
               Amount : 2,
               Price: 5.49
           },
           {
               Article: 'Kondome',
               Amount : 1,
               Price: 15.79
           }
           ]
        }],
       [{
           Einkauf_Name: 'Einkauf2',
           Einkauf_ID:'001',
           Date: new Date(2015, 11, 10),
           Owner_id : '5661841022eca772b6919a92',
           Articles: [{
               Article: 'Brot',
               Amount : 40,
               Price: 1.79
           },
           {
               Article: 'Marmelade',
               Amount : 4,
               Price: 0.49
           },
           {
               Article: 'Zigaretten',
               Amount : 1,
               Price: 5.49
           },
           {
               Article: 'Kondome',
               Amount : 20,
               Price: 15.79
           }
           ]
       }],
       [{
           Einkauf_Name: 'Einkauf3',
           Einkauf_ID:'002',
           Date: new Date(2015, 09, 10),
           Owner_id : '5661841022eca772b6919a92',
           Articles: [{
               Article: 'Brot',
               Amount : 40,
               Price: 1.79
           },
           {
               Article: 'Marmelade',
               Amount : 4,
               Price: 0.49
           },
           {
               Article: 'Zigaretten',
               Amount : 5,
               Price: 5.49
           },
           {
               Article: 'Kondome',
               Amount : 100,
               Price: 15.79
           }
           ]
       }],
       [{
           Einkauf_Name: 'Einkauf4',
           Einkauf_ID:'003',
           Date: new Date(2015, 08, 10),
           Owner_id : '5660c46822eca772b6919a87',
           Articles: [{
               Article: 'Brot',
               Amount : 40,
               Price: 1.79
           },
           {
               Article: 'Marmelade',
               Amount : 4,
               Price: 0.49
           },
           {
               Article: 'Zigaretten',
               Amount : 5,
               Price: 5.49
           },
           {
               Article: 'Kondome',
               Amount : 100,
               Price: 15.79
           }
           ]
       }]

   ]; //Testdaten der Einkäufe hier später Abfrage einfügen und auf Testdaten legen anpassen nicht vergessen
    $scope.Auswerten = function(){
       chartDatenMaster= {  //Master zurücksetzen
        Daten : [],
        label : [],
        Series: []
       };
       User.getUserByName(localStorage.getItem('username')).success(function(res) {
       Group.getGroupsForUser(res[0]._id).success(function(groups) {

           for(var i = 0; i< groups.length; i++){

               for(var j = 0; j< testdaten.length; j++){
                   if(groups[i]._id == testdaten[j][0].Owner_id && testdaten[j][0].Date.getTime() >= $scope.Zeitraum.Startdatum.getTime() && testdaten[j][0].Date.getTime()<= $scope.Zeitraum.Enddatum.getTime()){
                       var label_vorhanden = false;
                       var temp = testdaten[j][0].Date;
                       for(var k=0;k< chartDatenMaster.label.length;k++){ //Label belegen
                           if(temp ==chartDatenMaster.label[k]){
                               label_vorhanden = true;
                           };
                       };//for K Ende
                       if(label_vorhanden ==false){
                           chartDatenMaster.label[chartDatenMaster.label.length] = testdaten[j][0].Date;
                       };
                   };//If in timescope und Group is Owner of Einkauf
               };//Ende For Testdaten length
           };//For Groups length ende
       chartDatenMaster= sort_select(chartDatenMaster);    //Labels sortieren

       //Datenpunkte ermitteln
       for(var i = 0; i< groups.length; i++){
               for(var j = 0; j< testdaten.length; j++){
                   if(groups[i]._id == testdaten[j][0].Owner_id && testdaten[j][0].Date.getTime() >= $scope.Zeitraum.Startdatum.getTime() && testdaten[j][0].Date.getTime()<= $scope.Zeitraum.Enddatum.getTime()){
                   var series_vorhanden = false;
                   var daten_leer_temp = [];
                   var datenpunkt_temp = 0;
                   //Series ermitteln und sicherstellen das nur einmal geschrieben wird
                   for(var k=0;k< chartDatenMaster.Series.length;k++){ //Label belegen
                   if(groups[i].name == chartDatenMaster.Series[k]){

                       series_vorhanden = true;

                   };
                       };//for K Ende
                   if(series_vorhanden ==false){
                           //Neues Datenelement erzeugen und mit 0 belegen
                           for(var x = 0; x < chartDatenMaster.label.length; x++){
                               daten_leer_temp[x] = 0;
                           };
                           chartDatenMaster.Daten.push(daten_leer_temp);
                           //Datenelement erzeugen Ende
                           chartDatenMaster.Series[chartDatenMaster.Series.length] = groups[i].name;

                   }; //Series belegen Ende

                   //Datenpunkte belegen

                   //datenpunkt_erzeugen
                   for(var y = 0; y < testdaten[j][0].Articles.length; y++){
                       datenpunkt_temp = datenpunkt_temp +( testdaten[j][0].Articles[y].Amount * testdaten[j][0].Articles[y].Price ) ;
                   };//Temp_Datenpunkt ende
                   datenpunkt_temp = ( Math.round( datenpunkt_temp * 100 ) ) / 100; //Runden
                   //Datenpunkt zuweisen an die richtige Stelle im Array
                   for ( var z = 0 ; z < chartDatenMaster.label.length ; z++) {

                       if(chartDatenMaster.label[z] == testdaten[j][0].Date ){ //Wenn Position gefunden

                           chartDatenMaster.Daten[chartDatenMaster.Series.length - 1][z] = datenpunkt_temp;
                       };

                   };//Datenpunkt zuweisen Ende
                   }; //if in scope und owner Ende
               };//Testdaten.length Ende
       };//Groups.length Ende
       for(var l = 0;l < chartDatenMaster.label.length; l++){//Labels umschreiben

       chartDatenMaster.label[l]= chartDatenMaster.label[l].getDate() +"." + (chartDatenMaster.label[l].getMonth()+1) + "." +                       chartDatenMaster.label[l].getFullYear();

       };//Labels umschreiben


       });//GetGroups Ende
       });//User Get-Ende


    //Diagramm befüllen
    $scope.chartData = {
        labels: chartDatenMaster.label,
        data: chartDatenMaster.Daten,
        series: chartDatenMaster.Series
    };//Chartbelegung ende
    }; //Auswerten Ende








    function sort_select (testdaten){
        var temp;
        for(var i = 0; i < testdaten.label.length;i++ ){
            for(var j= i+1; j < testdaten.label.length;j++){
                if(testdaten.label[j].getTime()< testdaten.label[i].getTime()){  // Tausch
                    temp = testdaten.label[i];
                    testdaten.label[i] = testdaten.label[j];
                    testdaten.label[j] = temp;
                };
            };//innere Schleife Select Sort

        };//For Testdaten.length ende
        return testdaten;
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

.controller('PurchasesCtrl', function($scope, Purchases, User, PurchaseService) {
  var init = function() {
    PurchaseService.purchases = PurchaseService.purchases || localStorage.getItem('purchases') || [];
    $scope.purchases = PurchaseService.purchases;
    console.log(PurchaseService.purchases);
    /*
    User.getUserByName(localStorage.getItem('username')).success(function(user) {
      Purchases.getPurchasesByOwner(user[0].id).success(function(purchases) {
        $scope.purchases = purchases;
      });
    });
    */
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

.controller('MatchCtrl', function($scope, User, Group, Purchases, $state, ProductService, MarketService, PurchaseService    ){
    var init = function() {
      $scope.data = [];
      User.getUserByName(localStorage.getItem('username')).success(function(usera) {
        creatoruser = usera;
        $scope.user = {};
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
    purchase.title = MarketService.market.purchasetitle;
    purchase.store_id = MarketService.market.selectedStore;
    console.log(purchase);
    /*
    Purchases.addPurchase(purchase).success(function(stuff){
      console.log(stuff);
    });*/

    //Doing localstorage Saving for now
    PurchaseService.purchases = localStorage.getItem('purchases');
    PurchaseService.purchases = PurchaseService.purchases || [];
    PurchaseService.purchases.push(purchase);
    localStorage.setItem('purchases', PurchaseService.purchases);
    console.log(PurchaseService.purchases)
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
    //MarketService.market = $scope.data.selectedStore;
    MarketService.market = $scope.data;
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
