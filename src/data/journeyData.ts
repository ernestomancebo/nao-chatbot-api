import * as path from 'path';
import { IJourney } from './IJourney';
// tslint:disable-next-line: no-var-requires
const db = require("diskdb");
db.connect(path.join(__dirname, 'db'), ['journeys']);

export const getAll = (): IJourney[] => {
  return db.journeys.find();
};

export const getByDestination = (destinationName: string) => {
  return getAll().filter(j => j.destinationName.toLowerCase() === destinationName.toLowerCase())
}

export const getByDepartureTime = (departureTime: string) => {
  return getBy({ departureTime });
}

const getBy = (obj: any) => {
  return db.journeys.find(obj);
}
