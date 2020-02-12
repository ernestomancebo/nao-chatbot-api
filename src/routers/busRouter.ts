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

busRouter.get('/destination/:destination/:departureTime', (req, res) => {
  const destination = req.params.destination;
  const departureTime = req.params.departureTime;

  if (!departureTime) {
    res.redirect(`/destination/${destination}`);
  }
  busController.getByDepartureTime(destination, departureTime);
});

export default busRouter;
