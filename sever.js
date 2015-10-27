var http = require('http');
var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, '/www')));

// A route for /say-hello 
app.get('/say-hello', function(req, res, next) {
	res.send('hello');
});

var testfunc = function(req, res) {
	res.send('this is a test');
}

app.get('/test', testfunc);

http.createServer(app).listen(8888, function() {
	console.log('Express App started');
});



var mysql = require('mysql') ;
var connection = mysql.createConnection({
	host : '',
  	user : '',
  	password: '',
	database: 'test'
});

connection.connect() ;

var list = function(req,res) {
	//res.json(obj) ;
	connection.query('select * from usera', function(err,result,fields) {
		if(!err) {
			res.json(result) ;
			//console.log('The solution is:', result);
		}
		else
			console.log('Error while performing Query.') ;
	});

}

function createUser(user) {
	connection.query('select * from usera', function(err,result,fields) {
		if(!err) {
			//users.push(user) ;
			query='insert into userlist(id,fName,lName,gender,age) values ("'+user.id+'", " '+user.fName+'","'+user.lName+'","'+user.gender+'","'+user.age+'")';
			//console.log(query);
			connection.query(query, function(err,result,fields) {
				if(!err) {
					console.log('create success');
				}
				else
					console.log(err) ;
			})
			//console.log('The solution is:', result);
		}
		else
			console.log('Error while performing Query.') ;
	});

}

function getIndex(id) {
	for(var i = 0 ; i < users.length ; i++) {
		if(users[i].id == id) return i ;
	}
	if(i == users.length) return -1 ;

}

//function findUser(id) {
//	var index = getIndex(id) ;
//	if(index == -1) {
//		var user = '-1' ;
//		return user ;
//	}
//	else {
//		var user = JSON.stringify(users[index]) ;
//		return user ;
//	}
//}

//function deleteUser(id){
//	users.splice(getIndex(id), 1) ;
//}

function editUser(user) {
	users[getIndex(user.id)] = user ;
}


/*var users = [
	{id: 1, fName: 'Hege', lName: "Pege", gender: "F", age: "9"},
	{id: 2, fName: 'Kim', lName: "Pim", gender: "F", age: "19"},
	{id: 3, fName: 'Sal', lName: "Smith", gender: "F", age: "3"},
	{id: 4, fName: 'Jack', lName: "Jones", gender: "M", age: "49"},
	{id: 5, fName: 'John', lName: "Doe", gender: "M", age: "39"},

	{id: 6, fName: 'Hege', lName: "Pege", gender: "F", age: "13"},
	{id: 7, fName: 'Kim', lName: "Pim", gender: "F", age: "12"},
	{id: 8, fName: 'Sal', lName: "Smith", gender: "F", age: "33"},
	{id: 9, fName: 'Jack', lName: "Jones", gender: "M", age: "54"},
	{id: 10, fName: 'John', lName: "Doe", gender: "M", age: "62"},

	{id: 11, fName: 'Hege', lName: "Pege", gender: "F", age: "35"},
	{id: 12, fName: 'Kim', lName: "Pim", gender: "F", age: "16"},
	{id: 13, fName: 'Sal', lName: "Smith", gender: "F", age: "38"},
	{id: 14, fName: 'Jack', lName: "Jones", gender: "M", age: "43"},
	{id: 15, fName: 'John', lName: "Doe", gender: "M", age: "32"},

	{id: 16, fName: 'Hege', lName: "Pege", gender: "F", age: "79"},
	{id: 17, fName: 'Kim', lName: "Pim", gender: "F", age: "18"},
	{id: 18, fName: 'Sal', lName: "Smith", gender: "F", age: "8"},
	{id: 19, fName: 'Jack', lName: "Jones", gender: "M", age: "48"},
	{id: 20, fName: 'John', lName: "Doe", gender: "M", age: "38"}
] ;

var length = users.length ;

var list = function(req,res) {
	res.json(users) ;
}

function createUser(user) {
	user.id = length + 1 ;
	users.push(user) ;
	length++ ;

}

function getIndex(id) {
	 for(var i = 0 ; i < users.length ; i++) {
		 if(users[i].id == id) return i ;
	 }
	if(i == users.length) return -1 ;
}

function findUser(id) {
	var index = getIndex(id) ;
	if(index == -1) {
		var user = '-1' ;
		return user ;
	}
	else {
		var user = JSON.stringify(users[index]) ;
		return user ;
	}
}

function deleteUser(id){
	users.splice(getIndex(id), 1) ;
}

function editUser(user) {
	users[getIndex(user.id)] = user ;
}*/

app.get('/userList',list);

app.delete('/deleteUser/:id',function(req,res){
	console.log(req.params.id) ;
	query='delete from usera where id = '+req.params.id;
	console.log(query);
	connection.query(query, function(err,result,fields) {
		if(!err) {
			console.log('delete success');
			connection.query('select * from usera', function(err,result,fields) {
				if(!err) {
					res.json(result) ;
					//console.log('The solution is:', result);
				}
				else
					console.log('Error while performing Query.') ;
			});
		}
		else
			console.log(err) ;
	}) ;
}) ;

app.post('/createUser/:new',function(req,res){
	var user = JSON.parse(req.params.new) ;
	connection.query('select * from usera', function(err,result) {
		if(!err) {
			var users = result ;
			var lastID = 0 ;
			for(var i = 0 ; i < users.length ; i++) {
				if(users[i].id > lastID) lastID = users[i].id ;
			}
			query='insert into usera(id,fName,lName,gender,age) values ("'+(lastID+1)+'", " '+user.fName+'","'+user.lName+'","'+user.gender+'","'+user.age+'")';
			//console.log(query);
			connection.query(query, function(err,result,fields) {
				if(!err) {
					console.log('create success');
				}
				else
					console.log(err) ;
			})
			res.send("Your user id is "+ (lastID + 1) +" Your information has been added to the User List") ;
			//console.log('The solution is:', result);
		}
		else
			console.log('Error while performing Query.') ;
	})
})

app.get('/findUser/:id',function(req,res){
	//console.log(req.params.id);
	//console.log(findUser(getIndex(req.params.id))) ;
	//res.send(findUser(req.params.id)) ;
	connection.query('select * from usera where id =' + req.params.id, function(err,result,fields) {
		if(!err) {
			res.json(result) ;
			//console.log('The result is ', result);
		}
		else
			console.log('Error while searching.') ;
	});
})

app.put('/editUser/:user',function(req,res){
	var editU = JSON.parse(req.params.user) ;
	console.log(editU) ;
	//editUser(editU) ;
	//res.json(users) ;
	query='UPDATE usera SET fName ="' +editU.fName+'", lName="'+editU.lName+'" , age = "'+editU.age+'" WHERE id ="'+editU.id+'"; ';
	console.log(query);
	connection.query(query, function(err,result,fields) {
		if(!err) {
			connection.query('select * from usera', function(err,result,fields) {
				if(!err) {
					res.json(result) ;
					//console.log('The solution is:', result);
				}
				else
					console.log('Err') ;
			});
		}
		else
			console.log('Error while performing Query.') ;
	});

});
