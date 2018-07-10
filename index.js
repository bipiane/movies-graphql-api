'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3700;

mongoose.connect('mongodb://localhost:27017/movies_api_test',
    {useNewUrlParser: true},
    (err, res) => {
        if (err) {
            throw err;
        } else {
            console.log("MongoDB running...");

            app.listen(port, function () {
                console.log("Server working http://localhost:" + port);
            });
        }
    }
);