var module = angular.module('einkaufsapp.services', []);

module.service('MarketService', function () {
    this.market;
});

module.service('ProductService', function () {
    this.products;
});

module.service('AssignmentService', function () {
    this.assigment;
});

module.service('PurchaseService', function () {
  this.purchases;
});

module.service('TestDatenService', function() {
  this.testdaten = [
     [{
         Einkauf_Name: 'Einkauf1',
         Einkauf_ID:'000',
         Date: new Date(2015, 11, 17),
         Owner_id : '564e2efd0462fbc12ad2c050',
         Articles: [{
             Article: 'Butter',
             Amount : 2,
             Price: 0.29
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
             Article: 'Toastbrot',
             Amount : 1,
             Price: 0.49
         },
         {
             Article: 'Salami',
             Amount : 1,
             Price: 1.49
         },
         {
             Article: 'Pizza',
             Amount : 3,
             Price: 2.49
         },
         {
             Article: 'Mehl',
             Amount : 5,
             Price: 0.39
         },
         {
             Article: 'Pfefferminztee',
             Amount : 1,
             Price: 2.49
         },
         {
             Article: 'Toilettenpapier',
             Amount : 1,
             Price: 4.49
         },
         {
             Article: 'Taschentücher',
             Amount : 2,
             Price: 3.49
         }
         ]
      }],
     [{
         Einkauf_Name: 'Einkauf2',
         Einkauf_ID:'001',
         Date: new Date(2015, 11, 19),
         Owner_id : '564e2efd0462fbc12ad2c050',
         Articles: [{
             Article: 'Brot',
             Amount : 2,
             Price: 1.79
         },
         {
             Article: 'Brötchen',
             Amount : 16,
             Price: 0.15
         },
         {
             Article: 'Zigaretten',
             Amount : 1,
             Price: 5.49
         },
         {
             Article: 'Badreiniger',
             Amount : 2,
             Price: 2.79
         },
         {
             Article: 'Toastbrot',
             Amount : 1,
             Price: 0.49
         },
         {
             Article: 'Käse',
             Amount : 1,
             Price: 1.79
         },
         {
             Article: 'Gouda',
             Amount : 1,
             Price: 4.49
         },
         {
             Article: 'Joghurt',
             Amount : 12,
             Price: 0.49
         },
         {
             Article: 'Quark',
             Amount : 1,
             Price: 1.49
         }
         ]
     }],
     [{
         Einkauf_Name: 'Einkauf3',
         Einkauf_ID:'002',
         Date: new Date(2015, 11, 21),
         Owner_id : '564e2efd0462fbc12ad2c050',
         Articles: [{
             Article: 'Kaffee',
             Amount : 1,
             Price: 4.79
         },
         {
             Article: 'Kaugummis',
             Amount : 4,
             Price: 1.49
         },
         {
             Article: 'Berliner Pilsener',
             Amount : 20,
             Price: 0.89
         },
         {
             Article: 'Gösser Naturradler',
             Amount : 10,
             Price: 0.79
         },
         {
             Article: 'Coca Cola',
             Amount : 12,
             Price: 1.49
         },
         {
             Article: 'Milch',
             Amount : 5,
             Price: 0.69
         },
         {
             Article: 'Nutella',
             Amount : 1,
             Price: 4.49
         }
         ]
     }],
     [{
         Einkauf_Name: 'Einkauf4',
         Einkauf_ID:'003',
         Date: new Date(2015, 11, 22),
         Owner_id : '564e2efd0462fbc12ad2c050',
         Articles: [{
             Article: 'Brot',
             Amount : 2,
             Price: 1.79
         },
         {
             Article: 'Äpfel',
             Amount : 12,
             Price: 0.19
         },
         {
             Article: 'Banana',
             Amount : 9,
             Price: 0.29
         },
         {
             Article: 'Iconia Tab One',
             Amount : 1,
             Price: 149.99
         },
         {
             Article: 'Schokoweihnachtsmann',
             Amount : 20,
             Price: 1.19
         },
         {
             Article: 'Geschenkpapier',
             Amount : 1,
             Price: 2.29
         },
         {
             Article: 'Hackfleisch - gemischt',
             Amount : 1,
             Price: 3.49
         },
         {
             Article: 'Head and Shoulders Shampoo',
             Amount : 3,
             Price: 3.19
         }
         ]
     }],
     [{
         Einkauf_Name: 'Einkauf5',
         Einkauf_ID:'005',
         Date: new Date(2015, 11, 24),
         Owner_id : '564e2efd0462fbc12ad2c050',
         Articles: [{
             Article: 'Italienische Gewürze',
             Amount : 1,
             Price: 3.89
         },
         {
             Article: 'Parmesan',
             Amount : 4,
             Price: 1.23
         },
         {
             Article: 'Filter',
             Amount : 3,
             Price: 1.30
         },
         {
             Article: 'Pueblo Tabak',
             Amount : 3,
             Price: 4.50
         },
         {
             Article: 'OCB Papier',
             Amount : 3,
             Price: 1.20
         }
         ]
     }],
     [{
         Einkauf_Name: 'Einkauf6',
         Einkauf_ID:'006',
         Date: new Date(2015, 11, 26),
         Owner_id : '564e2efd0462fbc12ad2c050',
         Articles: [{
             Article: 'Maskara',
             Amount : 1,
             Price: 2.79
         },
         {
             Article: 'Jil Sanders Sport for Women',
             Amount : 1,
             Price: 34.99
         },
         {
             Article: 'Wasser still',
             Amount : 10,
             Price: 0.20
         },
         {
             Article: 'Toastbrot',
             Amount : 1,
             Price: 0.49
         },
         {
             Article: 'DVD Königreich der Himmel',
             Amount : 1,
             Price: 9.99
         },
         {
             Article: 'Quark',
             Amount : 3,
             Price: 0.49
         },
         {
             Article: 'Cornflakes',
             Amount : 1,
             Price: 3.49
         },
         {
             Article: 'Wodka - Smirnoff',
             Amount : 1,
             Price: 24.49
         },
         {
             Article: 'Havanna Club 5 Anos',
             Amount : 1,
             Price: 45.99
         }
         ]
     }],
     [{
         Einkauf_Name: 'Einkauf7',
         Einkauf_ID:'007',
         Date: new Date(2015, 11, 30),
         Owner_id : '564e2efd0462fbc12ad2c050',
         Articles: [{
             Article: 'Brot',
             Amount : 2,
             Price: 1.79
         },
         {
             Article: 'Marmelade',
             Amount : 1,
             Price: 0.49
         },
         {
             Article: 'Raketen',
             Amount : 4,
             Price: 9.49
         },
         {
             Article: 'Harzer Knaller',
             Amount : 2,
             Price: 4.49
         },
         {
             Article: 'Tischfeuerwerk',
             Amount : 5,
             Price: 1.49
         },
         {
             Article: 'Knallerbsen',
             Amount : 3,
             Price: 1.49
         },
         {
             Article: 'Lippenstift',
             Amount : 1,
             Price: 1.39
         }
         ]
     }]

 ];
});
