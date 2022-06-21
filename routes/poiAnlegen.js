var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017'; // connection URL
const client = new MongoClient(url); // mongodb client
const dbName = 'mydb'; // database name
const collectionName = 'pois'; // collection nam

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('poiAnlegen', { title: 'POI Anlegen' });
});

router.post('/finish', function (req, res, next) {
    console.log('A new poi has been added');

    console.log(req.body);
    /*
    let poi = {};
    poi.name = req.body.pname;
    poi.coordinates = [req.body.x, req.body.y];
*/

    let poi = {
        type: 'Feature',
        properties: {
            shape: 'Marker',
            name: req.body.pname,
            category: 'default'
        },
        geometry: {
            type: 'Point',
            coordinates: [req.body.y, req.body.x]
        }
    };

    console.log('Parse:');
    console.log(poi);

    // connect to the mongodb database and afterwards, insert one the new element
    client.connect(function (err) {
        //assert.equal(null, err);

        console.log('Connected successfully to server');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Insert the document in the database
        collection.insertOne(poi, function (err, result) {
            //assert.equal(err, null);
            //assert.equal(1, result.result.ok);
            //console.log(result)
            console.log(`Inserted ${result.insertedCount} document into the collection`);
            res.render('add_notification', { title: 'Vorgang abgeschlossen', data: poi });
        });
    });
});

module.exports = router;
