'use strict';

let express = require('express');
let path = require('path');
let app = express();
let gitactivitystats = require('git-activity-stats');

let port = process.env.PORT || 8080;
app.use('/public/', express.static(path.join(__dirname, '/public')));

app.get('/getgit/:username/', function (req, res) {
  gitactivitystats.getContributions(req.params.username, function(error, aw){
      let quartileBoundaries = gitactivitystats.getQuartileBoundaries(aw.contributions);
      res.json({
         contributions: aw.contributions,
         quartileBoundaries
      });
  });
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/view/index.html'));
});

app.listen(port);
