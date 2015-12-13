var braintree = require('braintree');

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: 'qx5yxkq8pbb2t5m3',
    publicKey: 'y83xmj9kxfsqx7nv',
    privateKey: '58250b59c813034531c6886e36f17a06'
});

var getClientToken = function(callback){
    gateway.clientToken.generate({}, callback);
};

var checkout = function(callback, nonce){
    gateway.transaction.sale({
        amount: '20.00',
        paymentMethodNonce: nonce
    }, callback);
};

module.exports = {
    getClientToken: getClientToken,
    checkout: checkout
};