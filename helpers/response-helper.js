var sendResponse = function(res, data, statusCode) {
    if (!statusCode) {
        statusCode = 200;
    } else {
        res.status(statusCode);
    }

    if (statusCode == 200) {
        res.json({
            'Status': 'Success',
            'Data': data
        });
    } else {
        res.json({
            'Status': 'Error',
            'Message': 'An error has occurred.'
        });
    }
};

module.exports = {
    sendResponse: sendResponse
};