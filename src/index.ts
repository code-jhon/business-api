import express from 'express';
import bodyParser from 'body-parser';
import { BusinessController } from './controllers/BusinessController';
import { BusinessService } from './services/BusinessService';

const app = express();
const businessService = new BusinessService();
const businessController = new BusinessController(businessService);

app.use(bodyParser.json());

app.post('/business', (req, res) => businessController.create(req, res));
app.put('/business/transition', (req, res) => businessController.transition(req, res));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
