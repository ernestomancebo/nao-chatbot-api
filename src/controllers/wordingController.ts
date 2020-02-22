import { IJourney } from "../data/IJourney";
import { getReadableHour } from '../util';

const NO_DEPARTURE = 'There is no journeys.';

export const nextDepartures = (journeys: IJourney[], wordingConfig = baseWordingConfig()): string => {
  let msg: string;
  if (!journeys || journeys.length === 0) {
    return NO_DEPARTURE;
  }

  if (journeys.length === 1) {
    msg = `${wordingConfig.departureSingular}${wordingConfig.destinationAtBegginning ? ` to ${journeys[0].destinationName}` : ''} is `;
  } else {
    msg = `${wordingConfig.departurePlural}${wordingConfig.destinationAtBegginning ? ` to ${journeys[0].destinationName}` : ''} are `;
  }

  msg = journeys.reduce((acc, curr, index) => {
    // if is not the first element
    if (index !== 0) {
      // but not the last
      if (index === (journeys.length - 1)) {
        acc += ' and ';
      } else {
        acc += ', ';
      }
    }

    acc += `${wordingConfig.destinationAtEnumeration ? `to ${curr.destinationName} ` : ''}at ${getReadableHour(curr.departureTime)}`;

    return acc;
  }, msg);

  return msg;
}

export const nextDepartureTo = (journeys: IJourney[]): string => {
  if (!journeys || journeys.length === 0) {
    return NO_DEPARTURE;
  }

  // this is a single journey scenario
  const journey = journeys[0];
  const msg = `Next departure to ${journey.destinationName} is at ${getReadableHour(journey.departureTime)}`;

  return msg;
}


export const baseWordingConfig = () => {
  const config: WordingConfig = {
    departureSingular: 'Next departure',
    departurePlural: 'Next departures',
    destinationAtBegginning: false,
    destinationAtEnumeration: true
  };

  return config;
}

export interface WordingConfig {
  departureSingular: string;
  departurePlural: string;
  destinationAtBegginning: boolean;
  destinationAtEnumeration: boolean;
}
