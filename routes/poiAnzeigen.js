var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://mongo:27017'; // connection URL
const client = new MongoClient(url); // mongodb client
const dbName = 'mydb'; // database name
const collectionName = 'pois'; // collection nam

/* GET users listing. */
router.get('/', function (req, res, next) {
    //res.render('poiAnzeigen', { title: 'POI Anzeigen' });
    // connect to the mongodb database and retrieve all docs
    client.connect(function (err) {
        assert.equal(null, err);

        console.log('Connected successfully to server');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        collection.find({}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log('Found the following records...');
            console.log(docs);
            res.render('poiAnzeigen', { title: 'POI Anzeigen', data: docs });
        });
    });
});

module.exports = router;
