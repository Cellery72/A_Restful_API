module.exports = (function () {
    'use strict';
    var router = require('express').Router();

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
        .delete(function (req, res) {
            Beer.remove({
                _id: req.params.beer_id
            }, function (err, beer) {
                if (err)
                    res.send(err);
                res.json({ message: 'Successfully deleted' });
            });
        });






    
    return router;
})();