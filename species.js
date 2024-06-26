// Authors : Rena Ahn, Gina Philipose, Zachary Mullen
// JavaScript File : species.js
// Last Update : June 24th, 2024

/* Purpose : Define configuration JSON object (config),
             Define JSON object of bacteria species (species),
             Define growth function for bacteria (growBacteria),
             Define the main function which runs the simulation (runSimulation)
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
    speciesList: [],
    tempList: [],
    environment: "n",
    view: "",
    initialNumCells: 1,
    timeInterval: (60 * 4),
    endTime: (60 * 200),
    graphData: {},
}
// additional key-value pairs can be added

/* Description of Each Species Key...
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
    environment: "o",
  },
  mycobacteriumTuberculosis: {
    maxTemp: 55,
    minTemp: 4,
    maxDivTemp: 37,
    maxDivTime: (8 * 24 * 60),
    divSlowRate: 0.03,
    environment: "o",
  },
  clostridiumTetanus: {
    maxTemp: 55,
    minTemp: 5,
    maxDivTemp: 37,
    maxDivTime: 60,
    divSlowRate: 0.03,
    environment: "a",
  },
  listeriaMonocytogenes: {
    maxTemp: 55,
    minTemp: 0,
    maxDivTemp: 4,
    maxDivTime: 60,
    divSlowRate: 0.03,
    environment: "o",
  },
  thermusAquaticus: {
    maxTemp: 99,
    minTemp: 5,
    maxDivTemp: 72,
    maxDivTime: 40,
    divSlowRate: 0.03,
    environment: "o",
  }
}
/* Additional Notes for Team
   - divSlowRate is a percentage and a decimal
   - environment is a string, supporting the future possibility of species
     being able to grow in both oxygen and low/no oxygen environments, but is
     currently be implemented as strictly oxygen or anaerobic
   - The list of bacteria being used for the simulation is independent of the
     JSON objects written here; these objects are purely data that should be
     accessed and compared to the current simulation variables;
     therefore the objects are constants
*/

// Generate objects which represent the state of each species in the simulation
// and push/append them to workingList, preparing workingList for use
// Afterwards, the newly prepared workingList is used to define data0, a JSON
// object/variable which represents the data of each species before growth
// Pre : workingList is declared a global variable;
//       temp is a number (integer variable) representing the given temperature
// Post : the length of workingList is equal to the length of config.speciesList
//        (the list of species chosen by the user), its content are JSON objects
//        representing information and the state of the chosen species;
//        numIntervals is incremented by '1';
//        data0 is added to config.graphData
function prepareWorkingList(temp) {
  workingList = [];   // reset workingList
  for(let i = 0; i < config.speciesList.length; i++) {   // prepare workingList
    workingList.push({
        name: config.speciesList[i],
        // temp: config.tempList[i % config.tempList.length],
        viable: species[config.speciesList[i]].environment == "b" ||
                config.environment == "n" ||
                config.environment == species[config.speciesList[i]].environment,
        timeOverflow: 0,
        divCount: 0,
        numCells: config.initialNumCells,
        testNutrient: 0.40,   // can be set to variable respective inside species
    })
  }
  console.log(workingList);     /********** PRINT - LEAVE OUT **********/

  let data0 = {};   // data JSON object holding information before growth
  data0.interval = numIntervals;
  for(let i = 0; i < workingList.length; i++) {
    data0[workingList[i].name] = workingList[i].numCells;
  }
  config.graphData[`@${temp}`].push(data0);
  numIntervals++;
}
/* Additional Notes
   - Any other initial setup necessary to implement the addition of the JSON
     objects (which are the content of workingList) can be placed inside the
     function
   - data0 is constructed and added to config.graphData inside
     prepareWorkingList to ensure it is constructed when workingList is newly
     initialized
*/

// Grows bacteria and stores relevant data as a JSON object in config.graphData
// Accesses global variables config and species JSON object
// Pre : temp is a number (integer) variable representing the given temperature
// Post : numIntervals is incremented by '1';
//        a data JSON object is pushed/appended to config.graphData
function growBacteria(temp) {
  let data = {};
  data.interval = numIntervals;

  for(let i = 0; i < config.speciesList.length; i++) {
    let speciesKey = config.speciesList[i];   // name of species, used as key
    let divTime = species[speciesKey].maxDivTime * (1 + (
      species[speciesKey].divSlowRate * (
        Math.abs(species[speciesKey].maxDivTemp - temp)
      )
    ));
    let d = Math.floor(
      (config.timeInterval + workingList[i].timeOverflow) / divTime
    );   // number of doublings in time interval
    let newNumCells = workingList[i].numCells;
      // number of cells after growth (and/or death)

    if(temp > species[speciesKey].maxTemp ||
       temp < species[speciesKey].minTemp ||
       !workingList[i].viable ||
       workingList[i].testNutrient <= 0) {
      
      for(let j = 0; j < d; j++) {
        workingList[i].divCount++;

        if(workingList[i].divCount % 7 == 0) {
          workingList[i].divCount = 0;
          newNumCells = Math.floor(newNumCells * (1 - 0.65));
        }
      }
    } else { 
        for(let j = 0; j < d; j++) {
        workingList[i].testNutrient = workingList[i].testNutrient - 0.01;
        if(workingList[i].testNutrient > 0) {
          newNumCells = Math.floor(newNumCells * 2);

          if(workingList[i].testNutrient <= 0.2) {
            workingList[i].divCount++;

            if(workingList[i].divCount % 7 == 0) {
              workingList[i].divCount = 0;
              newNumCells = Math.floor(newNumCells * (1 - 0.90));
            }
          }

          if(workingList[i].testNutrient <= 0.3) {
            newNumCells = Math.floor(newNumCells * (1 - 0.10));
          }
        }
      }
      //console.log(speciesKey, ": ", divTime, d, newNumCells);     /********** PRINT - LEAVE OUT **********/

      workingList[i].timeOverflow = Math.round(
        (config.timeInterval + workingList[i].timeOverflow) % divTime
      );
    }

    workingList[i].numCells = newNumCells;
    data[speciesKey] = newNumCells;
    if(newNumCells > highestY) {
      highestY = newNumCells;
    }
  }

  config.graphData[`@${temp}`].push(data);
  numIntervals++;
}
/* Additional Notes
   - there are no necessary pre-conditions, but it is preferred config and
     workingList are properly initialized;
     otherwise, empty data JSONs and empty graphs/tables will be displayed
   - data holds the number of cells at the current time interval,
     these data objects are pushed (end of list) to config.graphData,
     constructing a list which can be used to produce a line graph
*/

/*** Simulation Variables ***/
var numIntervals = 0;
var workingList = [];
