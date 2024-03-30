import express from 'express';
import bodyParser from 'body-parser';
import identifyRouter from './routes/identify.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/identify', identifyRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
