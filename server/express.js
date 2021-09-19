const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);
app.use(express.static(path.join(__dirname, '..', 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});
