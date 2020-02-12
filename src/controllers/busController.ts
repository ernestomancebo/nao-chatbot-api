import * as journeyData from "../data/journeyData";

export const getAllBusses = () => journeyData.getAll();
export const getByDestination = (destination: string) => journeyData.getByDestination(destination);
export const getByDepartureTime = (departureTime: string) => journeyData.getByDepartureTime(departureTime);
