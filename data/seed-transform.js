const fs = require('fs');
const path = require('path');

let fileNames = [];
fs.readdirSync(__dirname).forEach((f) => {
  if (f.endsWith('-seed.json')) {
    fileNames.push(f);
  }
});

let journeys = [];
fileNames.forEach(f => {
  fs.readFile(path.join(__dirname, f), (err, data) => {
    const seedFile = JSON.parse(data);
    const plainJourneys = Array.from(seedFile['journeys']).map((journey) => {
      return {
        arrivalTime: journey.arrivalTime,
        departureTime: journey.departureTime,
        destinationName: journey.destinationName,
        originName: journey.originName
      };
    });

    journeys = [...journeys, ...plainJourneys]
    // const fileName = f.substring(0, f.indexOf('-')).concat('-data.json');
    const fileName = 'db.json';
    fs.writeFile(fileName, JSON.stringify(journeys), 'utf8', (err) => {
      if (err) {
        console.err(`Error occourred writing @ ${fileName}`);
        return;
      }
      console.info(`data written @ ${fileName}`);
    });
  });

  // fs.writeFile('db.json', JSON.stringify(journeys), 'utf-8', (err) => {
  //   if (err) {
  //     console.err(`Error occourred writing @ db.json`);
  //     return;
  //   }
  //   console.info(`data written @ db.json`);
  // });
});
