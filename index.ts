import express from 'express';
import checkVersion from './routes/checkVersion';
import checkImage from './routes/checkImage';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

app.use(bodyParser.json());
app.use(express.json());
app.use(checkVersion, checkImage);

app.get('*', (req, res) => {
  res.status(404).send('Такого эндпоинта не существует');
});

app.listen(port, () => console.log(`App is listening on port ${port}!`));
