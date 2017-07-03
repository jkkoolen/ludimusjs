var fs = require('fs');
var mappings = {
    '/api/paymentssavings/unsignedorders?nextOrderId=myNextOrderId':'stubs/order/next-data-orders.json',
    '/api/paymentssavings/unsignedorders':'stubs/order/data-orders.json',
    '/api/paymentssavings/unsignedorders/details/pVHKyoZ-XetRS1QKOwzuS4PlsXnN8Il50oJZTK4NA88':'stubs/order/data-order-details.json',
    '/api/paymentssavings/unsignedorders/delete/pVHKyoZ-XetRS1QKOwzuS4PlsXnN8Il50oJZTK4NA88':'stubs/order/data-orders.json',
    '/api/paymentssavings/countries': 'stubs/datastore/data-countries.json',
    '/api/paymentssavings/accounts?exclude=invisible': 'stubs/datastore/data-accounts.json',
    '/dist/makepayment-versions/0.0.1/module-nl-nl.js':'stubs/makepayment/module-nl-nl.js',
    '/api/paymentssavings/unsignedorders/signrequest' : 'stubs/sign/successsign.json'};
module.exports = {
    attach: attach
};

/**
 * Attach HTTP endpoints to the stub server.
 *
 * @param app {object} App object from the Express framework.
 *
 * How to register endpoints to the app object: http://expressjs.com/en/4x/api.html#app
 */

var currentSecnario;

function attach(app) {
        app.get('/api/paymentssavings/unsignedorders', fileToResponse);
    app.get('/api/paymentssavings/unsignedorders?nextOrderId=myNextOrderId', fileToResponse);

    // details
    app.get('/api/paymentssavings/unsignedorders/details/pVHKyoZ-XetRS1QKOwzuS4PlsXnN8Il50oJZTK4NA88', fileToResponse);
    app.delete('/api/paymentssavings/unsignedorders/delete/pVHKyoZ-XetRS1QKOwzuS4PlsXnN8Il50oJZTK4NA88', fileToResponse);
    //datastore
    app.get('/api/paymentssavings/countries', fileToResponse);
    app.get('/api/paymentssavings/accounts', fileToResponse);

    app.post('/api/paymentssavings/unsignedorders/signrequest', fileToResponse);

    //makepayment
    app.get('/dist/makepayment-versions/0.0.1/module-nl-nl.js',function(req, res) {
        console.log('kom ik hier');
        var data = fs.readFileSync(mappings[req.url], 'utf8');
        res.send(data);
    });
}

function fileToResponse(req, res) {
    console.log('try to find ', req.url, ' in mappings');
    var fileName = mappings[req.url];
    var json = {};
    if(fileName) {
        json = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    } else {
        console.log('filename ', fileName, ' could not be found!, check path in stub dir');
    }
    res.status(200)
        .json(json);
}
