const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join('/Users/rohan/sorting-visualizer/public')));

// app.listen(3000, function () {
//   console.log('listening on port 3000');
// });
