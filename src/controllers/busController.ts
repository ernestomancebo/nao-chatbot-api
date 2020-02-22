import { IJourney } from '../data/IJourney';
import { buildMomentFrom24h, momentNow } from '../util';
import * as journeyData from "../data/journeyData";

export const getAllBusses = () => journeyData.getAll();
export const getByDestination = (destination: string) => journeyData.getByDestination(destination);

export const getByDepartureTime = (destination: string, departureTime: string) => {
  const journeys = getByDestination(destination);
  const journey = journeys.find(j => j.departureTime === departureTime);

  if (!journey) {
    return null;
  }


  return { journey, fromNow: 'fromNow' };
}

export const getNextDepartures = (): IJourney[] => {
  return buildNextDepartures(getAllBusses());
}

export const getNextDeparturesByDest = (destinationName: string): IJourney[] => {
  return buildNextDepartures(getAllBusses().filter(journey => journey.destinationName === destinationName));
}

export const getUpcommingDeparturesByDest = (destinationName: string): IJourney[] => {
  return buildUpcomingDepartures(getAllBusses().filter(journey => journey.destinationName === destinationName));
}
/**
 * Builds a set of the next bus departures
 * @param journeys Journey list
 */
const buildNextDepartures = (journeys: IJourney[]): IJourney[] => {
  let journeysEntries: { [destination: string]: IJourney } = {};
  const now = momentNow();

  journeysEntries = journeys.reduce((acc, curr) => {
    const nextDeparture = buildMomentFrom24h(curr.departureTime);

    if (!acc[curr.destinationName]) {
      if (nextDeparture.isAfter(now)) { acc[curr.destinationName] = curr }
    } else {
      const expectedNext = buildMomentFrom24h(acc[curr.destinationName].departureTime);

      if (nextDeparture.isBefore(expectedNext)) { acc[curr.destinationName] = curr; }
    }

    return acc;
  }, journeysEntries);

  let outJourneys: IJourney[] = [];
  Object.keys(journeysEntries).forEach(entry => outJourneys = [...outJourneys, journeysEntries[entry]]);

  return outJourneys;
}

const buildUpcomingDepartures = (journeys: IJourney[]): IJourney[] => {
  let journeysEntries: { [destination: string]: IJourney[] } = {};
  const now = momentNow();

  journeysEntries = journeys.reduce((acc, curr) => {
    const nextDeparture = buildMomentFrom24h(curr.departureTime);

    if (!acc[curr.destinationName]) {
      acc[curr.destinationName] = [];
    }

    if (nextDeparture.isAfter(now)) {
      acc[curr.destinationName] = [...acc[curr.destinationName], curr]
    }

    return acc;
  }, journeysEntries);


  let outJourneys: IJourney[] = [];
  Object.keys(journeysEntries).forEach(entry => outJourneys = [...outJourneys, ...journeysEntries[entry]]);

  return outJourneys;
}
