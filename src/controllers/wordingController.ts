import { IJourney } from "../data/IJourney";
import { getReadableHour, momentNow, buildMomentFrom24h } from '../util';

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


export const departureStatus = (journey: IJourney): string => {
  if (!journey) { return NO_DEPARTURE; }

  const journeyMoment = buildMomentFrom24h(journey.departureTime);
  const now = momentNow();

  let timeDiff = journeyMoment.diff(now, "minutes");
  let diffMeasurement = "minutes";
  let msg = "";

  if (now.isSameOrAfter(journeyMoment)) {
    // Recalculate in an human readable time
    timeDiff = now.diff(journeyMoment, "minutes");

    if (timeDiff > 60) {
      timeDiff = journeyMoment.diff(now, "hours")
      diffMeasurement = timeDiff === 1 ? "hour" : "hours";
    }

    msg = `I am so sorry, your bus departed ${timeDiff} ${diffMeasurement} ago`;
  } else if (now.isSameOrBefore(journeyMoment) && timeDiff <= 10) {
    if (timeDiff <= 1) { diffMeasurement = "minute" }
    msg = `Walk to the terminal, your bus departs in ${timeDiff} ${diffMeasurement}`;
  } else {
    if (timeDiff > 60) {
      timeDiff = journeyMoment.diff(now, "hour");
      diffMeasurement = timeDiff === 1 ? "hour" : "hours";
    }

    msg = `You are on time, your bus departs in ${timeDiff} ${diffMeasurement}`;
  }

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
