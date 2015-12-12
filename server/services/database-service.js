var mysql = require('mysql');
 
// Connects to the database.
var client = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

var createUser = function(username, email, password) {
    var query = 'insert into Users (username, email, password) VALUES(?, ?, ?)';
    var parameters = [username, email, password];

    client.query(query, parameters, function(error, result) {
        // To be continued.
    });
};

var login = function(username, password){
    var query = 'select from Users where username = ? and password = ?';
    var parameters = [username, password];

    client.query(query, parameters, function(error, result) {
        // WTF Am I doing O.o
    });
};

var getUser = function(username){
    var query = 'select from Users where username = ?';
    var parameters = [username];

    client.query(query, parameters, function(error, result){
        // What Andrei says...
    }); 
};

var getUsers = function(){
    var query = 'select from Users';

    client.query(query, function(error, result){
        // I can see you!
    });
};

var getZone = function(id){
    var query = 'select from Zones where id = ?';
    var parameters = [id];

    client.query(query, parameters, function(error, result){
        // This is not a joke!
    })
}

var getZones = function(){
    var query = 'select from Zones';

    client.query(query, function(error, result){
        // I can see you O.o!
    });
};
