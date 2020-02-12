import { IJourney } from '../data/IJourney';
import * as journeyData from "../data/journeyData";
import moment = require('moment');

moment.locale('es')

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
  const now = moment();
  return null;
}
