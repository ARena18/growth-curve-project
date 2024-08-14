// Authors : Rena Ahn, Gina Philipose
// JavaScript File : script.js
// Last Update : August 7th, 2024

// Purpose : Define the functionality of user input forms

const viewMenu = document.getElementById("view"); // view select menu
const container = document.getElementById("menuContainer"); // bacteria menus get added here
const bacteria = document.getElementById("addBacteria"); // add bacteria button
const removeBacteria = document.getElementById("removeBacteria"); // remove bacteria button
const container2 = document.getElementById("temperatures"); // temperature sliders/input boxes get added here
const addTemp = document.getElementById("addTemp"); // add temperature button
const removeTemp = document.getElementById("removeTemp"); // remove temperature button
const submitButton = document.getElementById("submitButton"); // run simulation button
const bubble1 = document.getElementById("bubble1"); // radio bubble: Aerobic
const bubble2 = document.getElementById("bubble2"); // radio bubble: Anaerobic

// html forms
const form1 = document.getElementById("form1"); // html form

// Nondynamic: temperature slider/inputbox and bacteria menu
const slider1 = document.getElementById("slider1"); // initial slider
const inputBox1 = document.getElementById("sliderInputBox1"); // initial slider input box
const menu1 = document.getElementById("bacteria1"); // initial bacteria menu

// counters
let bacteriaCount = 1; // bacteria menu counter
let tempCount = 1; // temperature slider/input box counter
//let count3 = 2; // ensures that there can only be up to 6 elements of either bacteria menus or temperature sliders/inputboxes

// load past user input after running the simulation
window.addEventListener("load", reloadData);
function reloadData(){
    menu1.value = localStorage.getItem("menu" + 1);
    slider1.value = localStorage.getItem("slider" + 1);
    inputBox1.value = localStorage.getItem("slider" + 1);
    viewMenu.value = localStorage.getItem("view");
    sliderColor(slider1, slider1);

    if(localStorage.getItem("bubble")==1){
        bubble1.checked=true;
    } else if(localStorage.getItem("bubble")==2){
        bubble2.checked=true;
    }

    // resetting bacteria elements
    for (let i=2; i<6; i++) {
        if(localStorage.getItem("menu"+ i)){
            bacteria.click();
        }
    }
    if(bacteriaCount <= 1) { disableRemoveBac(); }

    // resetting temperature elements
    for (let i=2; i<6; i++) {
        if(localStorage.getItem("slider"+ i)){
            addTemp.click();
        }
    }
    if(tempCount <= 1) { disableRemoveTemp(); }
}

// sets slider colors
function sliderColor(inputBox, sliderBar) {
    if(inputBox.value== 37) {
        sliderBar.style.backgroundColor = `rgb(255, 139, 139)`;
    } else if(inputBox.value==38) {
        sliderBar.style.backgroundColor = `rgb(255, 106, 75)`;
    } else if(inputBox.value== 39) {
        sliderBar.style.backgroundColor = `rgb(255, 69, 2)`;
    } else if(inputBox.value<6) {
        sliderBar.style.backgroundColor = `rgb(0, 0, 255)`;
    } else if(inputBox.value<11) {
        sliderBar.style.backgroundColor = `rgb(93, 0, 255)`;
    } else if(inputBox.value<16) {
        sliderBar.style.backgroundColor = `rgb(123, 0, 255)`;
    } else if(inputBox.value<21) {
        sliderBar.style.backgroundColor = `rgb(152, 0, 255)`;
    } else if(inputBox.value<26) {
        sliderBar.style.backgroundColor = `rgb(191, 0, 255)`;
    } else if(inputBox.value<31) {
        sliderBar.style.backgroundColor = `rgb(216, 0, 255)`;
    } else if(inputBox.value<36) {
        sliderBar.style.backgroundColor = `rgb(255, 0, 255)`;
    } else if(inputBox.value<41) {
        sliderBar.style.backgroundColor = `rgb(255, 0, 182)`;
    } else if(inputBox.value<46) {
        sliderBar.style.backgroundColor = `rgb(255, 0, 114)`;
    } else if(inputBox.value<101) {
        sliderBar.style.backgroundColor = `rgb(231, 38, 0)`;
    } else{
        sliderBar.style.backgroundColor = `rgb(223, 223, 223)`;
    }
}

// ables add bacteria button
function ableAddBac() {
    document.getElementById("addBacteria").disabled = false;
    document.getElementById("addBacteriaGuide").style.visibility = "hidden";
    document.querySelector("#addBacteriaGuide .toolText").innerHTML = "";
}

// disable add bacteria button
// Pre : textFlag is a number variable
function disableAddBac(textFlag) {
    document.getElementById("addBacteria").disabled = true;
    document.getElementById("addBacteriaGuide").style.visibility = "visible";
    if(textFlag == 0) {
        document.querySelector("#addBacteriaGuide .toolText").innerHTML
        = "There can be at most five species inputs at once.";
    } else if (textFlag == 1) {
        document.querySelector("#addBacteriaGuide .toolText").innerHTML
        = "There cannot be multiple species and multiple temperatures chosen "
        + "at the same time. Remove all but one temperature slider to continue.";
    }
}

// able remove bacteria button
function ableRemoveBac() {
    document.getElementById("removeBacteria").disabled = false;
    document.getElementById("removeBacteriaGuide").style.visibility = "hidden";
    document.querySelector("#removeBacteriaGuide .toolText").innerHTML = "";
}

// disable remove bacteria button
function disableRemoveBac() {
    document.getElementById("removeBacteria").disabled = true;
    document.getElementById("removeBacteriaGuide").style.visibility = "visible";
    document.querySelector("#removeBacteriaGuide .toolText").innerHTML
        = "There must be at least one species input.";
}

// able add temperature button
function ableAddTemp() {
    document.getElementById("addTemp").disabled = false;
    document.getElementById("addTempGuide").style.visibility = "hidden";
    document.querySelector("#addTempGuide .toolText").innerHTML = "";
}

// disable add temperature button
function disableAddTemp(textFlag) {
    document.getElementById("addTemp").disabled = true;
    document.getElementById("addTempGuide").style.visibility = "visible";
    if(textFlag == 0) {
        document.querySelector("#addTempGuide .toolText").innerHTML
        = "There can be at most five temperature sliders at once.";
    } else if(textFlag == 1) {
        document.querySelector("#addTempGuide .toolText").innerHTML
        = "There cannot be multiple species and multiple temperatures chosen "
        + "at the same time. Remove all but one species input to continue.";
    }
}

// able remove temperature button
function ableRemoveTemp() {
    document.getElementById("removeTemp").disabled = false;
    document.getElementById("removeTempGuide").style.visibility = "hidden";
    document.querySelector("#removeTempGuide .toolText").innerHTML = "";
}

// disable remove temperature button
function disableRemoveTemp() {
    document.getElementById("removeTemp").disabled = true;
    document.getElementById("removeTempGuide").style.visibility = "visible";
    document.querySelector("#removeTempGuide .toolText").innerHTML
        = "There must be at least one temperature slider.";
}

// submit
form1.addEventListener("submit", function(event){
    event.preventDefault();
    // var collectData = new FormData(event.target);
});

// saving user input
// view menu
viewMenu.addEventListener("change", function() {
    localStorage.setItem("view", viewMenu.value);
});
// initial bacteria menu
menu1.addEventListener("change", function(){
    localStorage.setItem("menu" + 1, menu1.value);
});
// initial slider/input box
slider1.addEventListener("input", function(){
    localStorage.setItem("slider" + 1, slider1.value);
});

// removes bacteria menus + deletes saved input data
removeBacteria.addEventListener("click", function() {
    var temp1 = document.getElementById("bacteria" + bacteriaCount);
    if (container.contains(temp1)) {
        container.removeChild(container.lastElementChild);
        localStorage.removeItem("menu" + bacteriaCount);
        bacteriaCount = bacteriaCount - 1;
    }

    ableAddBac(); // abling add bacteria button
    if(bacteriaCount <= 1) {
        ableAddTemp(); // abling add temperature button when appropriate
        disableRemoveBac(); // disabling remove bacteria button when appropriate
    }
});

// removes temperature sliders/input boxes + deletes saved input data
removeTemp.addEventListener("click", function() {
    var temp2 = document.getElementById("sliderid");
    if (container2.contains(temp2)) {
        container2.removeChild(container2.lastElementChild);
        localStorage.removeItem("slider" + tempCount);
        tempCount = tempCount - 1;
    }

    ableAddTemp(); // abling add temperature button
    if(tempCount <= 1) {
        ableAddBac(); // abling add bacteria button when appropriate
        disableRemoveTemp(); // disabling remove temperature button when appropriate
    }
});

// changes corresponding input box to match slider + changes slider color
slider1.addEventListener("input", function(){
    inputBox1.value = slider1.value;
    sliderColor(slider1, slider1);
});

// changes corresponding slider to match input box + changes slider color
inputBox1.addEventListener("input", function(){
    if(inputBox1.value < 101){
        slider1.value = inputBox1.value;
    }  
    sliderColor(inputBox1, slider1);
});

// adds a new bacteria menu + saves/loads past user input
bacteria.addEventListener("click", function() {
    if (bacteriaCount < 5 && tempCount <= 1) {
        bacteriaCount++;

        const newInput = document.createElement("select");
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        const option3 = document.createElement("option");
        const option4 = document.createElement("option");
        const option5 = document.createElement("option");
        const option6 = document.createElement("option");

        option1.textContent = "";
        option1.value = "NULL";
        option2.textContent = "Escherichia coli";
        option2.value = "eColi";
        option3.textContent = "Mycobacterium tuberculosis";
        option3.value = "mycobacteriumTuberculosis";
        option4.textContent = "Clostridium tetanus";
        option4.value = "clostridiumTetanus";
        option5.textContent = "Listeria monocytogenes";
        option5.value = "listeriaMonocytogenes";
        option6.textContent = "Thermus aquaticus";
        option6.value = "thermusAquaticus";

        newInput.appendChild(option1);
        newInput.appendChild(option2);
        newInput.appendChild(option3);
        newInput.appendChild(option4);
        newInput.appendChild(option5);
        newInput.appendChild(option6);
        newInput.id = 'bacteria' + bacteriaCount;
        container.appendChild(newInput);

        // saves user input
        newInput.addEventListener("change", function() {
            localStorage.setItem("menu" + bacteriaCount, newInput.value);
        });
        //loads past user input
        if(localStorage.getItem("menu" + bacteriaCount)){
            newInput.value = localStorage.getItem("menu" + bacteriaCount);
        }

        ableRemoveBac(); // abling remove bacteria button
        if(bacteriaCount >= 5) { disableAddBac(0); } // disabling add bacteria button when appropriate
        disableAddTemp(1); // disabling add temperature button
    }
});

// adds a new temperautre slide and input box + saves/loads past user input
addTemp.addEventListener("click", function() {
    if (bacteriaCount <= 1 && tempCount < 5) {
        tempCount++;

        const newSlider = document.createElement("input");
        const newInput = document.createElement("input");

        newSlider.type="range";
        newSlider.min=0;
        newSlider.max=100;
        newSlider.value=50;
        newSlider.step=1;
        newInput.value=newSlider.value;
        newInput.type = "text";
        newSlider.id = "slider" + tempCount;

        const sliderInput = document.createElement("div");
        sliderInput.id = "sliderid";
        sliderInput.classList.add("row");

        sliderColor(newInput, newSlider);
        localStorage.setItem("slider" + tempCount, newSlider.value);
 
        // changes corresponding input box to match slider
        newSlider.addEventListener("input", function(){
            newInput.value=newSlider.value;
            sliderColor(newSlider, newSlider); // changes slider color
            localStorage.setItem("slider" + tempCount, newInput.value);
        });

        // changes corresponding slider to match input box
        newInput.addEventListener("input", function(){
            if(newInput.value < 101){
                newSlider.value=newInput.value;
            }
            sliderColor(newInput, newSlider); // changes slider color
            localStorage.setItem("slider" + tempCount, newSlider.value); // saves user input
        });

        // loads past user input
        if(localStorage.getItem("slider"+ tempCount)) {
            newInput.value = localStorage.getItem("slider" + tempCount);
            newSlider.value = localStorage.getItem("slider" + tempCount);
            sliderColor(newInput, newSlider);
        }
        
        sliderInput.appendChild(newSlider);
        sliderInput.appendChild(newInput);
        container2.appendChild(sliderInput);

        ableRemoveTemp(); // abling remove temperature button
        if(tempCount >= 5) { disableAddTemp(0); } // disabling add temperature button when appropriate
        disableAddBac(1); // disabling add bacteria button
    }
});

// stores radio input
// stores if Aerobic
bubble1.addEventListener("change", function() {
    if(bubble1.checked) {
        localStorage.setItem("bubble", 1);
    }
});
// stores if Anaerobic
bubble2.addEventListener("change", function() {
    if(bubble2.checked) {
        localStorage.setItem("bubble", 2);
    }
});
