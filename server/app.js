var app = require('express')();
var bodyParser = require('body-parser');
var cors = require('cors');
var braintreeService = require('./services/braintree-service');
var databaseService = require('./services/database-service');
var responseHelper = require('./helpers/response-helper');

// Enables cross-origin resource sharing.
app.use(cors());

// Enables support for urlencoded POST requests.
app.use(bodyParser.urlencoded({ extended: false }));

// Makes json objects prettier.
app.set('json spaces', 4);

app.get('/braintree/token', function(req, res){
    braintreeService.getClientToken(function(error, response){
        if (error){
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        responseHelper.sendResponse(res, { 'Token': response.clientToken });
    });
});

app.post('/braintree/checkout', function(req, res){
    var nonce = req.body.nonce;
    var amount = req.body.amount;

    braintreeService.checkout(function(error, response){
        if (error){
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        responseHelper.sendResponse(res, response);
    }, nonce, amount);
});

app.get('/users/:username', function(req, res){
    var username = req.params.username;

    databaseService.getUser(function(error, user){
        if (error){
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        // Determines whether a user with the specified username exists.
        if (!user){
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

app.get('/users/:username/score', function(req, res){
    var username = req.params.username;

    databaseService.getTotalUserScore(function(error, score){
        if (error){
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        responseHelper.sendResponse(res, score);
    }, username);
});

app.get('/users/:username/score/:x/:y', function(req, res){
    var username = req.params.username;
    var x = req.params.x;
    var y = req.params.y;

    databaseService.getZoneUserScore(function(error, score){
        if (error){
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        responseHelper.sendResponse(res, score);
    }, username, x, y);
});

app.get('/users/:username/score/:x/:y/:score', function(req, res){
    var username = req.params.username;
    var x = req.params.x;
    var y = req.params.y;
    var score = req.params.score;

    databaseService.updateZoneUserScore(function(error){
        if (error){
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        responseHelper.sendResponse(res);
    }, username, x, y, score);
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

        responseHelper.sendResponse(res, user);
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

    databaseService.createUser(function(error){
        if (error){
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

app.get('/zones/:x/:y/challenges', function(req, res){
    var x = req.params.x;
    var y = req.params.y;

    databaseService.getZoneChallenges(function(error, challenges){
        if (error){
            responseHelper.sendResponse(res, null, 500)

            return;
        }
        
        responseHelper.sendResponse(res, challenges);
    }, x, y);
});

app.get('/zones/:x/:y/charities', function(req, res){
    var x = req.params.x;
    var y = req.params.y;

    databaseService.getZoneCharities(function(error, charities){
        if (error){
            responseHelper.sendResponse(res, null, 500)

            return;
        }
        
        responseHelper.sendResponse(res, charities);
    }, x, y);
});

app.get('/zones/:x/:y/score', function(req, res){
    var x = req.params.x;
    var y = req.params.y;

    databaseService.getZoneScore(function(error, score){
        if (error){
            responseHelper.sendResponse(res, null, 500)

            return;
        }
        
        responseHelper.sendResponse(res, score);
    }, x, y);
});

app.get('/charities/:id', function(req, res){
    var id = req.params.id;

    databaseService.getCharity(function(error, charity){
        if (error){
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        // Determines whether a charity with the specified id exists.
        if (!charity){
            responseHelper.sendResponse(res, null, 404);

            return;
        }

        responseHelper.sendResponse(res, charity);
    }, id);
});

app.get('/charities', function(req, res){
    databaseService.getCharities(function(error, charities){
        if (error){
            responseHelper.sendResponse(res, null, 500)

            return;
        }
        
        responseHelper.sendResponse(res, charities);
    });
});

app.get('/cities/:id', function(req, res){
    var id = req.params.id;

    databaseService.getCity(function(error, city){
        if (error){
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        // Determines whether a city with the specified id exists.
        if (!city){
            responseHelper.sendResponse(res, null, 404);

            return;
        }

        responseHelper.sendResponse(res, city);
    }, id);
});

app.get('/cities', function(req, res){
    databaseService.getCities(function(error, cities){
        if (error){
            responseHelper.sendResponse(res, null, 500)

            return;
        }
        
        responseHelper.sendResponse(res, cities);
    });
});

app.listen(process.env.PORT || 1234);