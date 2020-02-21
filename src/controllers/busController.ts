import { IJourney } from '../data/IJourney';
import * as journeyData from "../data/journeyData";
import moment = require('moment');

moment.locale('en')

export const getAllBusses = () => journeyData.getAll();
export const getByDestination = (destination: string) => journeyData.getByDestination(destination);

export const getByDepartureTime = (destination: string, departureTime: string) => {
  const journeys = getByDestination(destination);
  const journey = journeys.find(j => j.departureTime === departureTime);

  if (!journey) {
    return null;
  }

  const departureMoment = moment().format('YYYYMMDD').concat(` ${journey.departureTime}`);
  const fromNow = moment(departureMoment, "YYYYMMDD HH:mm").fromNow();

  return { journey, fromNow };
}

export const getNextDepartures = (): IJourney[] => {
  return buildNextDepartures(getAllBusses());
}

export const getNextDeparturesByDest = (destinationName: string): IJourney[] => {
  return buildNextDepartures(getAllBusses().filter(journey => journey.destinationName === destinationName));
}

/**
 * Builds a set of the next bus departures
 * @param journeys Journey list
 */
const buildNextDepartures = (journeys: IJourney[]): IJourney[] => {
  let journeysEntries: { [destination: string]: IJourney } = {};
  const momentNow = moment();

  journeysEntries = journeys.reduce((acc, curr) => {
    const nextDeparture = buildMomentTime(curr.departureTime);

    if (!acc[curr.destinationName]) {
      if (nextDeparture.isAfter(momentNow)) { acc[curr.destinationName] = curr }
    } else {
      const expectedNext = buildMomentTime(acc[curr.destinationName].departureTime);

      if (nextDeparture.isBefore(expectedNext)) { acc[curr.destinationName] = curr; }
    }

    return acc;
  }, journeysEntries);

  let outJourneys: IJourney[] = [];
  Object.keys(journeysEntries).forEach(entry => outJourneys = [...outJourneys, journeysEntries[entry]]);

  return outJourneys;
}

const buildMomentTime = (hour: string) => {
  return moment(hour, "HH:mm");
}
