import moment = require('moment');

moment.locale('en');

export const buildMomentFrom24h = (hour: string) => {
  return moment(hour, "HH:mm");
}

export const getReadableHour = (hour: string) => {
  return buildMomentFrom24h(hour).format('h:mm a');
}
export const momentNow = () => moment();
