const express = require('express');
const bodyParser = require('body-parser');
const mockData = require('./data/mock_pretty.json');
const PORT = 3001;
const PAGESIZE = 9;

const paginator = (page, size, object) => {
  const start = (page - 1) * size;
  const end = page * size;
  return object.slice(start, end);
}

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  if (req.query.page) {
    const page = req.query.page;
    res.send(paginator(page, PAGESIZE, mockData));
  }
})

app.get('/get/:userId', (req, res) => {
  if (req.params.userId) {
    const found = mockData.find((e) => e.id.$oid === req.params.userId);
    res.send(found);
  }
})

app.listen(PORT, () => {
  console.log(`waiting at localhost:${PORT}`);
})
