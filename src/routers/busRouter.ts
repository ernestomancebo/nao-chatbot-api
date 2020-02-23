import * as express from 'express';
import * as busController from '../controllers/busController';
import * as wordingController from '../controllers/wordingController';

const busRouter = express.Router();

busRouter.get('/', (req, res) => {
  const journeys = busController.getAllBusses();
  const text = wordingController.nextDepartures(journeys);

  res.send({ data: journeys, text })
});


busRouter.get('/next', (req, res) => {
  const nextJourneys = busController.getNextDepartures();
  const text = wordingController.nextDepartures(nextJourneys);

  res.send({ data: nextJourneys, text });
});

busRouter.get('/next/:destination', (req, res) => {
  const destination = req.params.destination;
  const nextJourneys = busController.getNextDeparturesByDest(destination);
  const text = wordingController.nextDepartureTo(nextJourneys)

  res.send({ data: nextJourneys, text });
});

busRouter.get('/next/:destination/today', (req, res) => {
  const destination = req.params.destination;
  const nextJourneys = busController.getUpcommingDeparturesByDest(destination);

  const wordingConfig: wordingController.WordingConfig = {
    ...wordingController.baseWordingConfig(),
    destinationAtEnumeration: false,
    destinationAtBegginning: true,
    departureSingular: 'Today\'s departure',
    departurePlural: 'Today\'s departures'
  };

  const text = wordingController.nextDepartures(nextJourneys, wordingConfig)

  res.send({ data: nextJourneys, text });
});

busRouter.get('/to/:destination', (req, res) => {
  const destination = req.params.destination;
  if (!destination) {
    res.status(405).send("Param 'destination' missing");
  }

  const wordingConfig: wordingController.WordingConfig = {
    ...wordingController.baseWordingConfig(),
    destinationAtBegginning: true,
    destinationAtEnumeration: false
  };

  const departures = busController.getByDestination(destination);
  const text = wordingController.nextDepartures(departures, wordingConfig);

  res.send({ data: departures, text });
});

busRouter.get('/status/:destination/:departureTime', (req, res) => {
  const destination = req.params.destination;
  const departureTime = req.params.departureTime;

  if (!departureTime) {
    res.redirect(`/destination/${destination}`);
  }

  const departure = busController.getByDepartureTime(destination, departureTime);
  const text = wordingController.departureStatus(departure);

  res.send({ data: departure, text });
});

export default busRouter;
