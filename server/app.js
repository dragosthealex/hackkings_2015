var app = require('express')();
var databaseService = require('./services/database-service');
var justGivingService = require('./services/just-giving-service');
var responseHelper = require('./helpers/response-helper');

// Makes json objects prettier.
app.set('json spaces', 4);

app.get('/users/:username', function(req, res){
    var username = req.params.username;

    databaseService.getUser(function(error, user) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        // Determines whether a user with the specified username exists.
        if (!user) {
            responseHelper.sendResponse(res, null, 404);

            return;
        }

        responseHelper.sendResponse(res, user);
    }, email);
});

app.get('/users', function(req, res){
    databaseService.getUsers(function(error, users){
        if (error){
            responseHelper.sendResponse(res, null)
        }
    });
});

app.get('/login/:username/:password', function(req, res){
    var username = req.params.username;
    var password = req.params.password;

    databaseService.login(function(error, user){
        if (error){
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        // Determines whether a user with the specified username and password exists.
        if (!user){
            responseHelper.sendResponse(res, null, 401);

            return;
        }

        responseHelper.sendResponse(res, { 'Token': '' });
    }, username, password);
});

app.get('/register/:username/:email/:password/:confirm', function(req, res){
    var username = req.params.username;
    var email = req.params.email;
    var password = req.params.password;
    var confirm = req.params.confirm;
});

app.get('/zones', function(req, res){

});

app.get('/zones/:id', function(req, res){

});

app.listen(process.env.PORT || 1234);