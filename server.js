const express = require('express');
let app = express();

app.use(express.static('static'));

app.get("/", function(request, response) {
  response.redirect('/index.html');
});

// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
