// Authors : Rena Ahn, Gina Philipose, Zachary Mullen
// JavaScript File : species.js
// Last Update : June 17th, 2024

/* Purpose : Define config JSON object,
             Define JSON Objects of bacteria species,
             Define growth function for bacteria
*/

/* Description of Configuration Object...
   - speciesList: list of strings,
                  name of species to be displayed
   - tempList: list of numbers,
               temperatures of the environment the species grow in
   - initialNumCells: number (integer),
                      the initial number (before growth) of cells
   - timeInterval: number (integer),
                   time interval in minutes the growth of each species is
                   calculated (for display on line graph)
   - graphData: data on the number of each species' (listed in speciesList)
                cells at each calculated time interval
                (lower index, earlier time --> higher index, later time)
*/
var config = {
    speciesList: ["eColi", "mycobacteriumTuberculosis", "clostridiumTetanus", "listeriaMonocytogenes", "thermusAquaticus"],
    tempList: [30,],
    initialNumCells: 1,
    timeInterval: (60),
    graphData: [],
}
// additional key-value pairs can be added

/* Description of Each Species Object...
   - maxTemp: number (integer),
              highest temperature in degrees Celsius in which bacteria grows
   - minTemp: number (integer),
              lowest temperature in degrees Celsius in which bacteria grows
   - maxDivTemp: number (integer),
                 temperature in degrees Celsius in which the species
                 divides at its greatest speed
   - maxDivTime: number (integer),
                 time in minutes division occurs when the species divides at
                 its greatest speed (currTemp is equal to maxDivTemp)
   - divSlowRate: number (float/double),
                  rate in percentage division slows for each degree Celsius off
                  from maxDivTemp
   - environment: string,
                  the oxygen environment in which the species can grow...
                    "o" - oxygen; can only grow in environments with oxygen
                    "a" - anaerobic; can only grow in environments without oxygen
                    "b" - both; can grow in environments with or without oxygen

*/
const species = {
  eColi: {
    maxTemp: 55,
    minTemp: 5,
    maxDivTemp: 37,
    maxDivTime: 20,
    divSlowRate: 0.03,
    environment: "o"
  },
  mycobacteriumTuberculosis: {
    maxTemp: 55,
    minTemp: 4,
    maxDivTemp: 37,
    maxDivTime: 8,
    divSlowRate: 0.03,
    environment: "o"
  },
  clostridiumTetanus: {
    maxTemp: 55,
    minTemp: 5,
    maxDivTemp: 37,
    maxDivTime: 60,
    divSlowRate: 0.03,
    environment: "a"
  },
  listeriaMonocytogenes: {
    maxTemp: 55,
    minTemp: 0,
    maxDivTemp: 4,
    maxDivTime: 60,
    divSlowRate: 0.03,
    environment: "o"
  },
  thermusAquaticus: {
    maxTemp: 99,
    minTemp: 5,
    maxDivTemp: 72,
    maxDivTime: 40,
    divSlowRate: 0.03,
    environment: "o"
  }
}
/* Additional Notes for Team
   - divSlowRate is a percentage and a decimal; it is the rate in which
     division slows therefore the current division rate for a species would be
     (1 - (divSlowRate * (Math.absolute(maxDivTemp - currTemp))))
     or something similar
   - environment is a string, supporting the future possibility of species
     being able to grow in both oxygen and low/no oxygen environments, but is
     currently be implemented as strictly oxygen or anaerobic
   - The list of bacteria being used for the simulation is independent of the
     JSON objects written here; these objects are purely data that should be
     accessed and compared to the current simulation variables
     Therefore the objects are constants
   - I suggest the current list of species being displayed for the simulation
     be a list of JSON objects with name, currTemp, divRate, ... which can be
     compared to these constant JSON objects
*/

var workingList = [];   // list with species name and related information
for(let i = 0; i < config.speciesList.length; i++) {
    workingList.push({
        name: config.speciesList[i],
        numCells: config.initialNumCells,
    })
}
/* Additional Notes
   - the objects pushed/appended onto workingList should also have a temp
     key/value pair, but it is not implemented currently because it is unclear
     which temperatures apply to which species when multiple temperatures are
     provided by the user
     => WILL SEND AN EMAIL SOON
*/

// Increments numCells for each object/species in workingList
// Accesses global variables config and appropriate species JSON objects
// Pre : n/a
// Post : numCells of workingList are incremented as appropriate
function growBacteria() {
  let data = {}
  for(let i = 0; i < config.speciesList.length; i++) {
    let tempIndex = 0;   // index to choose temperature from tempList
    let speciesKey = config.speciesList[i];   // name of species, used as key
    let divTime = species[speciesKey].maxDivTime * (1 - (
      species[speciesKey].divSlowRate * (
        Math.abs(species[speciesKey].maxDivTemp - config.tempList[tempIndex])
      )
    ));
    let d = config.timeInterval / divTime;   // number of doublings in time interval
    let newNumCells = Math.floor(workingList[i].numCells * (2 **d));

    workingList[i].numCells = newNumCells;
    data[speciesKey] = newNumCells;
  }

  config.graphData.push(data);
}
/* Additional Notes
   - data holds the number of cells at the current time interval,
     these data objects are pushed (end of list) to config.graphData,
     constructing a list which can be used to produce a line graph
     !! Assumption: line graph is constructed with D3; another library may need
                    a different variable/structure for the data !!
*/
