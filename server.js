// Setup
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8081;
var Beer = require('./app/models/beer');

// DB Connection info
mongoose.connect('mongodb://localhost/restful_api');

// configure usage
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API Routes
var router = express.Router();

// middleware function
router.use(function (req, res, next) {
    console.log('On to the next one');
    next();
});

// test route
router.get('/', function (req, res) {
    res.json({ message: 'welcome to our api' });
});

// rest of routes
router.route('/beers')

    // Create a Beer (/api/beers)
    .post(function (req, res) {

        var beer = new Beer();  // new instance of Beer
        beer.name = req.body.name;  // set beer name from params

        // Save beer/check for errors
        beer.save(function (err) {

            if (err)
                res.send(err);

            res.json({ message: 'Beer named: ' + beer.name + ' created!' });
        });
    })

    // Get all the Beers (/api/beers)
    .get(function (req, res) {
        Beer.find(function (err, beers) {

            if (err)
                res.send(err);

            res.json(beers);
        });

    });

router.route('/beers/:beer_id')

    // get the beer with that ID 
    .get(function (req, res) {
        Beer.findById(req.params.beer_id, function (err, beer) {
            if (err)
                res.send(err);
            res.json(beer);
        });
    })
    // Update the beer with that ID
    .put(function (req, res) {
        Beer.findById(req.params.beer_id, function (err, beer) {

            if (err)
                res.send(err);

            // update the beers name
            beer.name = req.body.name;

            // Attempt to save Beer
            beer.save(function (err) {
                if (err)
                    res.send(err);

                // Verify beer was updated
                res.json({ message: 'Beer updated!' });
            });
        });
    })
    // Dlete the beer with that ID
    .delete(function(req,res){
        Beer.remove({
            _id: req.params.beer_id
        }, function(err,beer){
            if(err)
                res.send(err);
            res.json({message:'Successfully deleted' });
        });
    });

// Register Routes
app.use('/api', router);


// Start Server
app.listen(port);
console.log('CHECK 127.0.0.1:' + port);