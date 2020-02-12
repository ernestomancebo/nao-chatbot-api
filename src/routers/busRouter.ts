import * as express from 'express';
import * as busController from '../controllers/busController';

const busRouter = express.Router();

busRouter.get('/', (req, res) => {
  res.send(busController.getAllBusses());
});

busRouter.get('/destination/:destination', (req, res) => {
  const destination = req.params.destination;
  if (!destination) {
    res.status(405).send("Param 'destination' missing");
  }

  res.send(busController.getByDestination(destination));
});

export default busRouter;
