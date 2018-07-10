const mongoose = require('mongoose');

// ES6 Promises
mongoose.Promise = global.Promise;

// Connect to db before tests run
before(function (done) {
    // Connect to mongodb
    mongoose.connect('mongodb://localhost:27017/movies_api_test', {
        useNewUrlParser: true
    });

    mongoose.connection.once('open', function () {
        console.log('Connection has been made, now drop collections...');

        // Drop all collections before tests
        mongoose.connection.db.listCollections().toArray(function (err, names) {
            if (err) {
                console.log('Error fetching collections', err);
            }
            else {
                let promises = [];
                names.forEach(function (e) {
                    console.log('- Drop collection', e.name);
                    promises.push(mongoose.connection.db.dropCollection(e.name));
                });

                // Wait for all drops
                Promise.all(promises).then(function () {
                    console.log('Release the Kraken 🦑');
                    done();
                });
            }
        });
    }).on('error', function (error) {
        console.log('Connection error:', error);
    });
});
