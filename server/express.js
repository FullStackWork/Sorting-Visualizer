const express = require('express');
const app = express();
const path = require('path');

app.get('/', function (req, res, next) {
  res.send(express.static(path.join('/Users/rohan/sorting-visualizer/public')));
});
app.use(express.static(path.join('/Users/rohan/sorting-visualizer/public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});
