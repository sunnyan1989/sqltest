app.service('Users', function($http) {
  var id;
  var fName;
  var lName;
  var gender;
  var age;
  /*var users = [
    {id: 1, fName: 'Hege', lName: "Pege", gender: "Male", age: "27"},
    {id: 2, fName: 'Kim', lName: "Pim", gender: "Female", age: "35"},
    {id: 3, fName: 'Sal', lName: "Smith", gender: "Female", age: "29"},
    {id: 4, fName: 'Jack', lName: "Jones", gender: "Male", age: "50"},
    {id: 5, fName: 'John', lName: "Doe", gender: "Male", age: "56"},
    {id: 6, fName: 'Peter', lName: "Pan", gender: "Male", age: "12"},
    {id: 7, fName: 'Sal', lName: "Smith", gender: "Female", age: "29"},
    {id: 8, fName: 'Jack', lName: "Jones", gender: "Male", age: "50"},
    {id: 9, fName: 'John', lName: "Doe", gender: "Male", age: "56"},
    {id: 10, fName: 'Peter', lName: "Pan", gender: "Male", age: "12"},
    {id: 11, fName: 'Sal', lName: "Smith", gender: "Female", age: "29"},
    {id: 12, fName: 'Jack', lName: "Jones", gender: "Male", age: "50"},
    {id: 13, fName: 'John', lName: "Doe", gender: "Male", age: "56"},
    {id: 14, fName: 'Peter', lName: "Pan", gender: "Male", age: "12"},
    {id: 15, fName: 'Sal', lName: "Smith", gender: "Female", age: "29"},
    {id: 16, fName: 'Jack', lName: "Jones", gender: "Male", age: "50"},
    {id: 17, fName: 'John', lName: "Doe", gender: "Male", age: "56"},
    {id: 18, fName: 'Peter', lName: "Pan", gender: "Male", age: "12"},
    {id: 19, fName: 'Sal', lName: "Smith", gender: "Female", age: "29"},
    {id: 20, fName: 'Jack', lName: "Jones", gender: "Male", age: "50"},
    {id: 21, fName: 'John', lName: "Doe", gender: "Male", age: "56"},
    {id: 22, fName: 'Peter', lName: "Pan", gender: "Male", age: "12"}
  ];*/

  this.list= function ($scope) {
    $http.get('/temp/data').success(function(data) {
    $scope.users = data;
  })
  };


  this.create= function (fName,lName,gender,age) {
    var user = {id:users.length+1,fName:fName, lName:lName,gender:gender,age:age};
    users.push(user);
    fName = '';
    lName = '';
    gender = '';
    age = '';
    console.log(user);
  };

  this.delete = function (id) {
   users.splice(id-1, 1);
    for(var i =  id-1;i<users.length;i++){
      users[i].id--;
    }
  };

  this.edit= function($scope) {
    $http.post('/temp/data').success(function(id, fName, lName, gender, age) {
    $scope.users[id-1].fName = fName;
    $scope.users[id-1].lName = lName;
    $scope.users[id-1].gender = gender;
    $scope.users[id-1].age=age;
    console.log($scope.users[id-1]);
    })
  };
  this.get = function(id){
  return users[id-1];
}

});