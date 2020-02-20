import * as express from 'express';
import * as busController from '../controllers/busController';
import moment = require('moment');

const busRouter = express.Router();

busRouter.get('/', (req, res) => {
  res.send(busController.getAllBusses());
});


busRouter.get('/next', (req, res) => {
  const destinations = busController.getNextDepartures();

  let next = destinations[0];
  let nextTime = buildMomentTime(next.departureTime);

  for (const d of destinations) {
    const dTime = buildMomentTime(d.departureTime);
    if (dTime.isBefore(nextTime)) {
      nextTime = dTime;
      next = d;
    }
  }

  res.send(next);
});

busRouter.get('/destination/:destination/next', (req, res) => {
  const destination = req.params.destination;
  const destinations = busController.getByDestination(destination);

  let next = destinations[0];
  let nextTime = buildMomentTime(next.departureTime);

  for (const d of destinations) {
    const dTime = buildMomentTime(d.departureTime);
    if (dTime.isBefore(nextTime)) {
      nextTime = dTime;
      next = d;
    }
  }

  res.send(next);
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
  res.send(busController.getByDepartureTime(destination, departureTime));
});

const buildMomentTime = (hour: string) => {
  return moment(hour, "HH:mm");
}

export default busRouter;
