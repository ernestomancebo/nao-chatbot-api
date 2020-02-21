import * as express from 'express';
import * as busController from '../controllers/busController';
import moment = require('moment');

const busRouter = express.Router();

busRouter.get('/', (req, res) => {
  res.send(busController.getAllBusses());
});


busRouter.get('/next', (req, res) => {
  const nextJourneys = busController.getNextDepartures();
  res.send(nextJourneys);
});

busRouter.get('/next/:destination', (req, res) => {
  const destination = req.params.destination;
  const nextJourneys = busController.getNextDeparturesByDest(destination);

  res.send(nextJourneys);
});

busRouter.get('/to/:destination', (req, res) => {
  const destination = req.params.destination;
  if (!destination) {
    res.status(405).send("Param 'destination' missing");
  }

  res.send(busController.getByDestination(destination));
});

busRouter.get('/to/:destination/at/:departureTime', (req, res) => {
  const destination = req.params.destination;
  const departureTime = req.params.departureTime;

  if (!departureTime) {
    res.redirect(`/destination/${destination}`);
  }
  res.send(busController.getByDepartureTime(destination, departureTime));
});

export default busRouter;
