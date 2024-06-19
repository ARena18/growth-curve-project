// Authors : Rena Ahn, Gina Philipose, Zachary Mullen
// JavaScript File : species.js
// Last Update : June 18th, 2024

/* Purpose : Define config JSON object,
             Define JSON Objects of bacteria species,
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
    initialNumCells: 1,
    timeInterval: (60 * 2),
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
    maxDivTime: (8 * 24 * 60),
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
   - divSlowRate is a percentage and a decimal
   - environment is a string, supporting the future possibility of species
     being able to grow in both oxygen and low/no oxygen environments, but is
     currently be implemented as strictly oxygen or anaerobic
   - The list of bacteria being used for the simulation is independent of the
     JSON objects written here; these objects are purely data that should be
     accessed and compared to the current simulation variables;
     therefore the objects are constants
*/

// Reflect user input onto config JSON object
// Pre : appropriate HTML elements are available
//       i.e. species selects, range sliders,
// Post : config.speciesList has the species to be displayed for the simulation;
//        config.tempList has the temperatures to be applied in the simulation;
//        environment reflects the chosen condition ("o"-oxygen, "a"-anaerobic)
function reflectUI() {
}
/* Additional Notes
   - This function combines the frontend and the backend
*/

// Generate objects which represent the state of each species in the simulation
// and push/append them to workingList, preparing workingList for use
// Afterwards, the newly prepared workingList is used to define data0, a JSON
// object/variable which represents the data of each species before growth
// Pre : workingList is declared a global variable and is initialized as an
//       empty list
// Post : the length of workingList is equal to the length of config.speciesList
//        (the list of species chosen by the user), its content are JSON objects
//        representing information and the state of the chosen species;
//        data0 is added to config.graphData
function prepareWorkingList() {
  for(let i = 0; i < config.speciesList.length; i++) {   // prepare workingList
    workingList.push({
        name: config.speciesList[i],
        temp: config.tempList[i % config.tempList.length],
        viable: species[config.speciesList[i]].environment == config.environment,
    })
  }

  let data0 = {};   // data JSON object holding information before growth
  for(let i = 0; i < workingList.length; i++) {
    data0[workingList[i].name] = config.initialNumCells;
    console.log(data0);
  }
  config.graphData.push(data0);
}
/* Additional Notes
   - Any other initial setup necessary to implement the addition of the JSON
     objects (which are the content of workingList) can be placed inside the
     function
*/

// Grows bacteria and stores relevant data as a JSON object in config.graphData
// Accesses global variables config and species JSON object
// Pre : none
// Post : numIntervals is incremented by '1';
//        a data JSON object is pushed/appended ot config.graphData
function growBacteria() {
  let data = {};
  numIntervals++;

  for(let i = 0; i < config.speciesList.length; i++) {
    let speciesKey = config.speciesList[i];   // name of species, used as key

    if(workingList[i].temp > species[speciesKey].maxTemp ||
       workingList[i].temp < species[speciesKey].minTemp) {
      data[speciesKey] = workingList[i].numCells;
    } else {
      let divTime = species[speciesKey].maxDivTime * (1 + (
        species[speciesKey].divSlowRate * (
          Math.abs(species[speciesKey].maxDivTemp - workingList[i].temp)
        )
      ));
      let d = (config.timeInterval * numIntervals) / divTime;
        // number of doublings in time interval
      let newNumCells = Math.floor(config.initialNumCells * (2 ** d));
      
      data[speciesKey] = newNumCells;
    }
  }

  config.graphData.push(data);
}
/* Additional Notes
   - there are no necessary pre-conditions, but it is preferred config and
     workingList are properly initialized;
     otherwise, empty data JSONs and empty graphs/tables will be displayed
   - data holds the number of cells at the current time interval,
     these data objects are pushed (end of list) to config.graphData,
     constructing a list which can be used to produce a line graph
     !! Assumption: line graph is constructed with D3; another library may need
                    a different variable/structure for the data !!
*/

// Reset simulation variables to their initial state
// Pre : none
// Post : numIntervals is assigned '0';
//        workingList is assigned an empty list;
//        config.speciesList SHOULD BE assigned an empty list;
//        config.tempList is assigned an empty list;
//        config.graphData is assigned an empty list
function resetSimulation() {
  numIntervals = 0;
  workingList = [];
  config.speciesList = [];
  config.tempList = [];
  config.graphData = [];
}

// Run the simulation, taking in user input and preparing data for output
// Utilizes the function(s)... prepareWorkingList, growBacteria
// Pre : n/a
// Post : config.graphData (the list of data used to plot the line graphs) is
//        properly populated with data JSON objects
function runSimulation() {
  resetSimulation();

  reflectUI();
  prepareWorkingList();

  // simulate and gather data <-- should be a function

  // code which displays data
}

var numIntervals = 0;
  // amount of time according to config.timeInterval that has passed
var workingList = [];   // list with species name and related information
