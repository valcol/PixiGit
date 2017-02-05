'use strict';

let express = require('express');
let path = require('path');
let app = express();

let port = process.env.PORT || 8080;
app.use('/public/', express.static(path.join(__dirname, '/public')))

app.get('*', function(req, res) {
    res.sendfile(path.join(__dirname, '/view/index.html'));
});

app.listen(port);
