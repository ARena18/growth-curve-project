// Authors : Rena Ahn, Gina Philipose, Zachary Mullen
// JavaScript File : species.js
// Purpose : Define JSON Objects of bacteria species

// Last Update : June 16th, 2024
/* Description of Each Object...
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
                    "oxygen" - can only grow in environments with oxygen
                    "anaerobic" - can only grow in environments without oxygen
                    "both" - can grow in environments with or without oxygen

*/

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

const eColi = {

}

const mTB = {

}

const cTetani = {

}

const lMonocytogenes = {

}

const taq = {
    
}
