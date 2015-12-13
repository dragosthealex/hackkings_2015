var app = require('express')();
var cors = require('cors');
var databaseService = require('./services/database-service');
var responseHelper = require('./helpers/response-helper');

// Enables cross-origin resource sharing.
app.use(cors());

// Makes json objects prettier.
app.set('json spaces', 4);

app.get('/users/:username', function(req, res){
    var username = req.params.username;

    databaseService.getUser(function(error, user){
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
    }, username);
});

app.get('/users', function(req, res){
    databaseService.getUsers(function(error, users){
        if (error){
            responseHelper.sendResponse(res, null, 500)

            return;
        }
        
        responseHelper.sendResponse(res, users);
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

app.get('/register/:username/:email/:password/:confirm/:cityId', function(req, res){
    var username = req.params.username;
    var email = req.params.email;
    var password = req.params.password;
    var confirm = req.params.confirm;
    var cityId = req.params.cityId;

    if (confirm != password){
        responseHelper.sendResponse(res, null, 401);

        return;
    }

    databaseService.createUser(function(error) {
        if (error) {
            // A user with this username or email already exists.
            responseHelper.sendResponse(res, null, 409);

            return;
        }

        responseHelper.sendResponse(res, {
            "Username": username,
            "Email": email,
            "CityId": cityId,
            "Token": ""
        });
    }, username, email, password, cityId);
});

app.get('/zones', function(req, res){
    databaseService.getZones(function(error, zones){
        if (error){
            responseHelper.sendResponse(res, null, 500)

            return;
        }
        
        responseHelper.sendResponse(res, zones);
    });
});

app.get('/zones/:id', function(req, res){
    var id = req.params.id;

    databaseService.getUser(function(error, zone){
        if (error){
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        // Determines whether a zone with the specified id exists.
        if (!zone){
            responseHelper.sendResponse(res, null, 404);

            return;
        }

        responseHelper.sendResponse(res, zone);
    }, id);
});

app.listen(process.env.PORT || 1234);