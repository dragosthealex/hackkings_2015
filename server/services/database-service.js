var mysql = require('mysql');

// Connects to the database.
var client = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

var getUsers = function(callback){
    var query = 'select * from Users';

    client.query(query, function(error, result){
        if (!error){
            var users = [];

            for (key in result){
                users.push(result[key]);
            }
        }

        callback(error, users);
    });
};

var getUser = function(callback, username){
    var query = 'select * from Users where username = ?';
    var parameters = [username];

    client.query(query, parameters, function(error, result){
        if (!error){
            var user = result[0];
        }

        callback(error, user);
    }); 
};

var getTotalUserScore = function(callback, username){
    var query = 'select sum(Score) as Score from Users users join ZoneScores zoneScores'
        + ' on users.Username = zoneScores.Username'
        + ' where users.Username = ?';
    var parameters = [username];

    client.query(query, parameters, function(error, result){
        if (!error){
            var score = result[0];
        }

        callback(error, score);
    });
};

var getZoneUserScore = function(callback, username, x, y){
    var query = 'select sum(Score) as Score from ZoneScores where username = ? and ZoneX = ? and ZoneY = ?';
    var parameters = [username, x, y];

    client.query(query, parameters, function(error, result){
        if (!error){
            var score = result[0];
        }

        callback(error, score);
    });
};

var updateZoneUserScore = function(callback, username, x, y, score){
    var query = 'insert into ZoneScores select ?, ?, ?, 0 from Dual'
        + ' where not exists (select Username from ZoneScores where username = ?);';
    var parameters = [username, x, y, username];

    client.query(query, parameters, function(error, result){
        query = 'update ZoneScores set Score = ? where Username = ? and ZoneX = ? and ZoneY = ?';
        parameters = [score, username, x, y];

        client.query(query, parameters, function(error, result){
            callback(error);
        });
    });
};

var createUser = function(callback, username, email, password, cityId){
    var query = 'insert into Users (username, email, password, cityId) VALUES(?, ?, ?, ?)';
    var parameters = [username, email, password, cityId];

    client.query(query, parameters, function(error, result){
        callback(error);
    });
};

var login = function(callback, username, password){
    var query = 'select * from Users where username = ? and password = ?';
    var parameters = [username, password];

    client.query(query, parameters, function(error, result){
        if (!error){
            var user = result[0];
        }

        callback(error, user);
    });
};

var getZones = function(callback){
    var query = 'select * from Zones';

    client.query(query, function(error, result){
        if (!error){
            var zones = [];

            for (key in result){
                zones.push(result[key]);
            }
        }

        callback(error, zones);
    });
};

var getCharities = function(callback){
    var query = 'select * from Charities';

    client.query(query, function(error, result){
        if (!error){
            var charities = [];

            for (key in result){
                charities.push(result[key]);
            }
        }

        callback(error, charities);
    });
};

var getCharity = function(callback, id){
    var query = 'select * from Charities where Id = ?';
    var parameters = [id];

    client.query(query, parameters, function(error, result){
        if (!error){
            var charity = result[0];
        }

        callback(error, charity);
    }); 
};

var getCities = function(callback){
    var query = 'select * from Cities';

    client.query(query, function(error, result){
        if (!error){
            var cities = [];

            for (key in result){
                cities.push(result[key]);
            }
        }

        callback(error, cities);
    });
};

var getCity = function(callback, id){
    var query = 'select * from Cities where Id = ?';
    var parameters = [id];

    client.query(query, parameters, function(error, result){
        if (!error){
            var city = result[0];
        }

        callback(error, city);
    }); 
};

var getZoneChallenges = function(callback, x, y){
    var query = 'select Id, Name, Description, Url from Challenges challenges join ZoneChallenges zoneChallenges'
        + ' on challenges.Id = zoneChallenges.ChallengeId'
        + ' where ZoneX = ? and ZoneY = ?';
    var parameters = [x, y];

    client.query(query, parameters, function(error, result){
        if (!error){
            var challenges = [];

            for (key in result){
                challenges.push(result[key]);
            }
        }

        callback(error, challenges);
    });
};

var getZoneCharities = function(callback, x, y){
    var query = 'select Id, Name, Description, Url, LogoUrl, JustGivingUrl'
        + ' from Charities charities join ZoneCharities zoneCharities'
        + ' on charities.Id = zoneCharities.CharityId'
        + ' where ZoneX = ? and ZoneY = ?';
    var parameters = [x, y];

    client.query(query, parameters, function(error, result){
        if (!error){
            var charities = [];

            for (key in result){
                charities.push(result[key]);
            }
        }

        callback(error, charities);
    });
};

var getZoneScore = function(callback, x, y){
    var query = 'select sum(Score) as Score from ZoneScores where ZoneX = ? and ZoneY = ?';
    var parameters = [x, y];

    client.query(query, parameters, function(error, result){
        if (!error){
            var score = result[0];
        }

        callback(error, score);
    });
};

module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    getTotalUserScore: getTotalUserScore,
    getZoneUserScore: getZoneUserScore,
    updateZoneUserScore: updateZoneUserScore,
    createUser: createUser,
    login: login,
    getZones: getZones,
    getZoneChallenges: getZoneChallenges,
    getZoneCharities: getZoneCharities,
    getZoneScore: getZoneScore,
    getCharities: getCharities,
    getCharity: getCharity,
    getCities: getCities,
    getCity: getCity
};