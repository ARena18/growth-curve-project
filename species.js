// Authors : Rena Ahn, Gina Philipose
// JavaScript File : species.js
// Last Update : August 30th, 2024

/* Purpose : Define configuration JSON object (config),
             Define JSON object of bacteria species (species),
             Define growth function for bacteria (growBacteria),
             Define reflect function which updates the configuration JSON object
               according to frontend user input (reflectUI),
             Define display function which displays the chosen mode of view (display),
             Define the functions which build/draw tables/graphs (buildTable, drawGraph),
             Define the main function which runs the simulation (runSimulation),
*/

/* Simulation Constants */
/* Description of Configuration Object...
   - speciesList: list of strings,
                  name of species to be displayed
   - tempList: list of numbers,
               temperatures of the environment the species grow in
   - environment: string (char),
                  the state of the environment related to oxygen
                  ("o" - oxygen, "a" - anerobic, "n" - n/a [to debug])
   - view: string,
           the display type (linear, log2, log10, table, cross-section)
   - initialNumCells: number (integer),
                      the initial number (before growth) of cells
   - timeInterval: number (integer),
                   time interval in minutes the growth of each species is
                   calculated (implemented in hours)
   - endTime: number (integer),
              total time in minutes the growth of each species is displayed
              (implemented in hours)
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
    timeInterval: (60 * 1),
    endTime: (60 * 1),
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
   - hourInterval: number (integer),
                   the time interval in hours growth data for the species should
                   be calculated/stored at
   - totalHours: number (integer),
                 the total time in hours growth dat for the species is
                 calculated/stored (and thus displayed)

*/
const species = {
  eColi: {
    maxTemp: 55,
    minTemp: 5,
    maxDivTemp: 37,
    maxDivTime: 20,
    divSlowRate: 0.03,
    environment: "o",
    hourInterval: 2,
    totalHours: 50
  },
  mycobacteriumTuberculosis: {
    maxTemp: 55,
    minTemp: 4,
    maxDivTemp: 37,
    maxDivTime: (8 * 24 * 60),
    divSlowRate: 0.03,
    environment: "o",
    hourInterval: 1000,
    totalHours: 30000
  },
  clostridiumTetanus: {
    maxTemp: 55,
    minTemp: 5,
    maxDivTemp: 37,
    maxDivTime: 60,
    divSlowRate: 0.03,
    environment: "a",
    hourInterval: 5,
    totalHours: 150
  },
  listeriaMonocytogenes: {
    maxTemp: 55,
    minTemp: 0,
    maxDivTemp: 4,
    maxDivTime: 60,
    divSlowRate: 0.03,
    environment: "o",
    hourInterval: 10,
    totalHours: 200
  },
  thermusAquaticus: {
    maxTemp: 99,
    minTemp: 5,
    maxDivTemp: 72,
    maxDivTime: 40,
    divSlowRate: 0.03,
    environment: "o",
    hourInterval: 5,
    totalHours: 150
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

// initial amount of nutrient given to each species, controls total growth
const startNutrient = 0.20;

// stores the number of divisions necessary before entering each phase
// index 0: stationary phase, index 1: death phase, index 2: phase of prolonged decline
const phaseMarkers = [10, 40, 50];

/*** Simulation Variables ***/
var numIntervals = 0;   // time according to config.timeInterval that has passed
var workingList = [];   // list with species name and related information

/*** Graph Variables and Functions***/
const totalDuration = 3000;  // duration (ms) of graph's automatic progression

const speciesGroup = [   // species information : helps format data for graph
  {
    name: "eColi",
    label: "Escherichia coli",
    color: "red"
  },
  {
    name: "mycobacteriumTuberculosis",
    label: "Mycobacterium tuberculosis",
    color: "orange"
  },
  {
    name: "clostridiumTetanus",
    label: "Clostridium tetanus",
    color: "green"
  },
  {
    name: "listeriaMonocytogenes",
    label: "Listeria monocytogenes",
    color: "blue"
  },
  {
    name: "thermusAquaticus",
    label: "Thermus aquaticus",
    color: "purple"
  }
];

/* Number Calculation Functions */
const linearNum = (num) => num;
const log2Num = (num) => {
  if(num <= 1) {
    return 1;
  }
  return Math.log2(num);
}
const log10Num = (num) => {
  if(num <= 1) {
    return 1;
  }
  return Math.log10(num);
}

// Reflect user input onto config JSON object
// Pre : appropriate HTML elements are available
// Post : config.speciesList has the species to be displayed for the simulation;
//        config.tempList has the temperatures to be applied in the simulation;
//        config.environment reflects the chosen condition;
//        config.timeInterval is assigned the appropriate interval,
//        config.endTime is assigned the appropriate number of hours
function reflectUI() {
  let num = 1;
  let bacteriaInput = document.getElementById(`bacteria${num}`);
  while(bacteriaInput) {   // updating config.speciesList
    if(config.speciesList.indexOf(bacteriaInput.value) < 0) {
      config.speciesList.push(bacteriaInput.value);
    }

    num++;
    bacteriaInput = document.getElementById(`bacteria${num}`);
  }

  num = 1;
  let tempInput = document.getElementById(`slider${num}`);
  while(tempInput) {   // updating config.tempList
    let temp = parseInt(tempInput.value);
    if(isNaN(temp)) { break; }
    if(config.tempList.indexOf(temp) >= 0) { break; }

    config.tempList.push(parseInt(temp));
    config.graphData[`@${temp}`] = [];
    num++;
    tempInput = document.getElementById(`slider${num}`);
  }

  let environmentInput = document.querySelector('input[name="oxy"]:checked');
  config.environment = environmentInput.value[0];   // updating config.environment

  if(config.speciesList.length > 1) {   // updating config.timeInterval and config.endTime
    config.timeInterval = 60 * 3;
    config.endTime = 60 * 100;
  } else {
    config.timeInterval = 60 * species[config.speciesList[0]].hourInterval;
    config.endTime = 60 * species[config.speciesList[0]].totalHours;
  }
}
/* Additional Notes
   - config.view is not reflected because its old value is needed later in the
     simulation; it will be updated then (in the 'display' function)
   - config.initialNumCells and config.graphData are not reflected because they
     are supposed to be affected by user input
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
//        data0 is added to config.graphData;
//        numIntervals is incremented by '1'
function prepareWorkingList(temp) {
  workingList = [];   // reset workingList
  for(let i = 0; i < config.speciesList.length; i++) {   // prepare workingList
    workingList.push({
        name: config.speciesList[i],
        viable: species[config.speciesList[i]].environment == "b" ||
                config.environment == "n" ||
                config.environment == species[config.speciesList[i]].environment,
        timeOverflow: 0,
        divCount: 0,
        numCells: config.initialNumCells,
        nutrientAmount: startNutrient,
        growthCount: 0,
    })
  }

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

    if(temp <= species[speciesKey].maxTemp &&
       temp >= species[speciesKey].minTemp &&
       workingList[i].viable) { 
      for(let j = 0; j < d; j++) {
        if(workingList[i].nutrientAmount > 0) {
          workingList[i].nutrientAmount = workingList[i].nutrientAmount - 0.01;
          newNumCells = newNumCells * 2;
        } else {
          workingList[i].divCount = workingList[i].divCount + 1;
  
          if(workingList[i].divCount % 7 == 0) {
            if(workingList[i].divCount > phaseMarkers[2]) {
              newNumCells = Math.floor(newNumCells * (1 - 0.65));
            } else if(workingList[i].divCount > phaseMarkers[1]) {
              newNumCells = Math.floor(newNumCells * (1 - 0.90));
            } else if(workingList[i].divCount > phaseMarkers[0]) {
              newNumCells = Math.floor(newNumCells * (1 - 0.10));
            }
          }
        }
      }
    }

    workingList[i].timeOverflow = Math.floor(
      (config.timeInterval + workingList[i].timeOverflow) % divTime
    );

    workingList[i].numCells = newNumCells;
    data[speciesKey] = newNumCells;
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

// Gathers data on the growth of select species at temp (parameter)
// Utilizes the function(s)...prepareWorkingList, growBacteria
// Pre : temp is a number (integer) variable representing the given temperature
// Post : data JSON objects are pushed/appended to config.graphData[`@${temp}`]
function gatherData(temp) {
  prepareWorkingList(temp);

  while((config.timeInterval * numIntervals) <= config.endTime) {
    growBacteria(temp);
  }
}

// Determines method of display and calls the related function
// Utilizes the function(s)... buildTable, drawGraph
// Pre : none
// Post : config.view is assigned to the newly chosen view;
//        HTML elements which display growth data are added
function display() {
  // clear container based on previous view
  if(config.view == "table") {   // clear table elements
    let container = document.getElementById("displayContainer");
    while(container.hasChildNodes()) {
      container.removeChild(container.firstChild);
    }
  } else {
    document.getElementById("graphContainer").style.display = "none";
  }

  // update view
  let viewInput = document.getElementById("view");
  config.view = viewInput.value;

  if(config.view == "table") {
    let tBody = buildTable();
    // populating data rows
    for(let i = 0; i < config.graphData[`@${config.tempList[0]}`].length; i++) {
      let newRow = tBody.insertRow(); // data row (tr element with td elements)
      newRow.insertCell().textContent = `${i * (config.timeInterval / 60)}`;
      if(config.speciesList.length > 1) {
        let mainTemp = config.tempList[0]
        config.speciesList.forEach( (species) => {
          newRow.insertCell().textContent =
            `${Math.round(config.graphData[`@${mainTemp}`][i][species])}`;
        })
      } else {
        let mainSpecies = config.speciesList[0]
        config.tempList.forEach( (temp) => {
          newRow.insertCell().textContent =
            `${Math.round(config.graphData[`@${temp}`][i][mainSpecies])}`;
        })
      }
    }
  } else if(config.view == "cross-section") {
    // cross section function
  } else {
    // drawing appropriate graph
    document.getElementById("graphContainer").style.display = "block";
    drawGraph();
  }

  let container = document.getElementById("displaySection");
  container.scrollIntoView();
}

// Prepares/Organizes data necessary for tables
// Returns a JSON with the appropriate title, list of column names, and data
// list to be iterated depending on the number of species or temperatures chosen
// Pre : config.view is equal to "table"
// Post : none
function prepareTableData() {
  if(config.speciesList.length > 1) {
    let columnNames = ["Time (Hours)"];
    speciesGroup.forEach( (species) => {
      if(config.speciesList.indexOf(species.name) >= 0) {
        columnNames.push(species.label);
      }
    })
    return {
      title: "Growth Data at " + config.tempList[0] + "°C",
      headerColumns: columnNames
    }
  }

  let columnNames = ["Time (Hours)"];
  config.tempList.forEach( (temp) => {
    columnNames.push(temp + "° Celsius");
  })
  let speciesLabel = speciesGroup.filter(
    (species) => species.name == config.speciesList[0]
  )[0].label;
  return {
    title: "Growth Data for " + speciesLabel,
    headerColumns: columnNames
  }
}

// Builds the basic structure necessary for a table
// Returns the tBody element built
// Utilizes Function(s)...prepareTableData
// Pre : config.view is equal to "table"
// Post : none
function buildTable() {
  let { title, headerColumns } = prepareTableData();
  let article = document.createElement("article"); // title and table container
  let p = document.createElement("p");        // element for title
  let label = document.createTextNode(title); // p element's content/text
  p.appendChild(label);
  article.appendChild(p);

  let table = document.createElement("table"); // table element
  let tHead = table.createTHead();             // table head element
  let headRow = tHead.insertRow();             // header row (tr element)

  headerColumns.forEach( (column) => {     // populating header row
    let th = document.createElement("th"); // data column (th element)
    let text = document.createTextNode(column);
    th.appendChild(text);
    headRow.appendChild(th);
  })
  tHead.appendChild(headRow);
  table.appendChild(tHead);

  let tBody = table.createTBody(); // table body element

  let container = document.getElementById("displayContainer");   // html container
  article.appendChild(table);
  container.appendChild(article);

  return tBody;
}

// Formats and organizes data necessary for the graph (using chart.js)
// Returns a JSON with the appropriate title, animation JSON, and data JSON
// depending on the number of species or temperatures chosen
// Pre : config.view is equal to "linear", "log2", or "log10"
// Post : none
function formatGraphData() {
  let labelList = config.graphData[`@${config.tempList[0]}`].map(
    row => (row.interval * config.timeInterval) / 60
  );   // list of labels (x axis) used in graph

  let calculation = linearNum;   // function to calculate data values
  let yScale = {   // configuration for yScale of graph
    display: true,
    type: "linear",
    title: {
      display: true,
      text: "Number of Cells"
    }
  };
  // making appropriate changes when the graph is logarithmic
  if(config.view == "log2") {
    calculation = log2Num;
    yScale.type = "logarithmic";
  }
  else if(config.view == "log10") {
    calculation = log10Num;
    yScale.type = "logarithmic";
  }

  // data <= one species, multiple temperatures
  if(config.tempList.length > 1) {
    let tempDatasets = [];
    let c = 0;
    for(const tempKey in config.graphData) {
      tempDatasets.push({
        label: tempKey.toString().slice(1) + "° Celsius",
        data: config.graphData[tempKey].map(
          row => calculation(row[config.speciesList[0]])
        ),
        borderColor: speciesGroup[c].color,
        backgroundColor: speciesGroup[c].color,
      });
      c++;
    }

    return {
      graphTitle: speciesGroup.filter( (species) =>
        species.name == config.speciesList[0]
      )[0].label + " Growth",
      newYScale: yScale,
      newData: {
        labels: labelList,
        datasets: tempDatasets
      }
    }
  }
  
  // data <= multiple species, one temperature
  let displaySpecies = speciesGroup.filter(
    (species) => config.speciesList.indexOf(species.name) >= 0
  );
  let speciesDatasets = displaySpecies.map(function(group) {
    return {
      label: group.label,
      data: config.graphData[`@${config.tempList[0]}`].map(
        row => calculation(row[group.name])
      ),
      borderColor: group.color,
      backgroundColor: group.color,
    }
  })
  
  return {
    graphTitle: "Bacteria Growth at " + config.tempList[0] + "°C",
    newYScale: yScale,
    newData: {
      labels: labelList,
      datasets: speciesDatasets
    }
  }
}

// Creates/Updates the line graph
// Utilizes Function(s)...formatGraphData
// Pre : config.view is equal to "linear", "log2", or "log10"
// Post : none
function drawGraph() {
  let {graphTitle, newYScale, newData} = formatGraphData();

  let lineChart = Chart.getChart('graph');
  if(lineChart) {   // Updating graph
    lineChart.data = newData;
    lineChart.options.scales.y = newYScale;
    lineChart.options.plugins.title.text = graphTitle;
    lineChart.update();
    return;
  }

  const delayBetweenPoints = totalDuration / newData.labels.length;
  const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : 
    ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
  const animation = {
    x: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    }
  };   // animation JSON for automatic progression of graph

  new Chart(   // Creating graph
    document.getElementById('graph'),
    {
      type: 'line',
      data: newData,
      options: {
        animation,
        tension: 0.3,
        plugins: {
          title: {
            display: true,
            text: graphTitle,
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Time (Hours)"
            }
          },
          y: newYScale
        }
      }
    }
  );
}

// Reset configuration lists/variables to their initial state
// Pre : none
// Post : config.speciesList is assigned an empty list;
//        config.tempList is assigned an empty list;
//        config.graphData is assigned an empty list;
function resetConfiguration() {
  config.speciesList = [];
  config.tempList = [];
  config.graphData = [];
}

// Run the simulation, taking in user input and preparing data for output
// Utilizes Function(s)...resetConfiguration, reflectUI, gatherData, display
// Pre : none
// Post : config.graphData (the list of data used to plot the line graphs) is
//        properly populated with data JSON objects
function runSimulation() {
  resetConfiguration();
  reflectUI();
  
  config.tempList.forEach( (temp) => {
    numIntervals = 0;
    gatherData(temp);
  })

  display();
}
