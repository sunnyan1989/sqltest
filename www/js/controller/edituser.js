/**
 * Created by Sunny on 2015/8/20.
 */
app.controller('changeUser', function($scope, $routeParams,$http) {
    $scope.notFound = false ;
    $scope.edit = false ;
    $scope.fName = '';
    $scope.lName = '';
    $scope.gender = '';
    $scope.age = '' ;
    $scope.password = '';
    $scope.id = '' ;
    $scope.editedId = '' ;
    $scope.createsuccess = false ;

    $scope.users = [] ;
    $scope.index = -1 ;
    
    /*$scope.passw1='';
    $scope.passw2='';
    $scope.error=false;
    $scope.incomplete=false;*/

    $http.get('http://localhost:8888/userList').success(function(response){
            $scope.users = response ;
            $scope.$watch('id',function() {
                $scope.idtest();
            });
            $scope.idtest = function() {
                if($scope.id ==='') {
                    $scope.fName = '';
                    $scope.lName = '';
                    $scope.age = '';
                    $scope.gender = '';
                    return ;
                }
                $http.get('http://localhost:8888/findUser/'+parseInt($scope.id)).success(function(response){
                    //console.log(response[0]) ;
                    $scope.selectUser=response[0] ;
                    console.log("the value is: "+ $scope.selectUser) ;
                    if(response === '-1') {
                        $scope.notFound = true ;
                        $scope.fName = '';
                        $scope.lName = '';
                        $scope.age = '';
                        $scope.gender = '';
                        return ;
                    }
                    else {
                        $scope.notFound = false;
                        $scope.fName = $scope.selectUser.fName;
                        $scope.lName = $scope.selectUser.lName;
                        $scope.age = $scope.selectUser.age;
                    }
                    
                })

                $scope.save = function() {
                    var newUser = {
                        id: parseInt($scope.id),
                        fName: $scope.fName,
                        lName: $scope.lName,
                        gender: $scope.gender,
                        age: $scope.age
                    }
                    var userString = JSON.stringify(newUser);
                    console.log(userString) ;

                    $http.put('http://localhost:8888/editUser/'+userString).success(function(response){
                        console.log(response) ;
                    })
                    $scope.editedId = $scope.id ;
                    $scope.createsuccess = true ;
                    $scope.edit = false ;
                };
            }
         });
    }); 
            /*$scope.$watch('passw1',function() {$scope.test();});
            $scope.$watch('fName', function() {$scope.test();});
            $scope.$watch('lName', function() {$scope.test();});
            $scope.$watch('gender', function() {$scope.test();});
            $scope.$watch('age', function() {$scope.test();});

            $scope.test = function() {
                if($scope.passw1 === "123") $scope.edit = true ;
                else $scope.edit = false ;
                $scope.incomplete = false;
                if (!$scope.fName.length ||
                        !$scope.lName.length || !$scope.gender.length ||
                        !$scope.passw1.length) {
                    $scope.incomplete = true;
                }
            };

    $scope.fName = $scope.users[id-1].fName;
    $scope.lName = $scope.users[id-1].lName;
    $scope.gender = $scope.users[id-1].gender;
    $scope.age = $scope.users[id-1].age;

    $scope.editUser = function(){
        Users.edit($scope);
    };

    $scope.$watch('passw1',function() {$scope.test();});
    $scope.$watch('passw2',function() {$scope.test();});
    $scope.$watch('fName', function() {$scope.test();});
    $scope.$watch('lName', function() {$scope.test();});
    $scope.$watch('gender', function() {$scope.test();});
    $scope.$watch('age', function() {$scope.test();});

    $scope.incomplete = true;
    $scope.test = function() {
        if ($scope.passw1 !== $scope.passw2) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }
        $scope.incomplete = false;
        if ( (!$scope.fName.length ||
            !$scope.lName.length ||
            !$scope.passw1.length || !$scope.passw2.length)) {
            $scope.incomplete = true;
        }
    };


    $scope.saveChange = function() {
        $scope.users[id-1].fName = $scope.fName;
        $scope.users[id-1].lName = $scope.lName;
        $scope.users[id-1].gender = $scope.gender;
        $scope.users[id-1].age = $scope.age;
        $scope.edit = false;
        $scope.delete = false;
        $scope.incomplete = true;
        $scope.fName = '';
        $scope.lName = '';
        $scope.gender = '';
        $scope.age = '';
        $scope.passw1 = '';
        $scope.passw2 = '';
        alert("You have changed the user!");
    };
});*/
/*app.controller('changeUser', function ($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/temp/data/users'+$routeParams.id).
    success(function(data) {
      $scope.form = data.user;
    });

  $scope.editUser = function () {
    $http.put('/temp/data/' + $routeParams.id, $scope.form).
      success(function(data) {
        $location.url('/readPost/' + $routeParams.id);
      });
  };
});*/