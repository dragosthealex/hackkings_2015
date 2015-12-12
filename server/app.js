var app = require('express')();

app.get('/api/login/:username/:password', function(req, res)){

    var username = req.params.username;
    var password = req.params.password;
};

app.get('api/register/:username/:email/:password/:confirm'){

    var username = req.params.username;
    var email = req.params.email;
    var password = req.params.password;
    var confirm = req.params.confirm;
};

app.get('api/user/:id'){

    var id = req.params.id;
};

app.get('api/user/all'){

};

app.get('api/zone/all'){

};

app.get('api/zone/:id'){

};

app.listen(process.env.PORT || 1234);