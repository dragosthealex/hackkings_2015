var braintree = require('braintree');

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

var getClientToken = function(callback){
    gateway.clientToken.generate({}, callback);
};

var checkout = function(callback, nonce, amount){
    gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonce
    }, callback);
};

module.exports = {
    getClientToken: getClientToken,
    checkout: checkout
};