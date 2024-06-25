/*
  Authors : Rena Ahn, Gina Philipose, Zachary Mullen
  JavaScript File : script.js
  Purpose : Define the main page of the Growth Curve Simulation
  Last Update : June 25th, 2024
*/

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
const form2 = document.getElementById("form2"); // html form
const form3 = document.getElementById("form3"); // html form
const form4 = document.getElementById("form4"); // html form

// Nondynamic: temperature slider/inputbox and bacteria menu
const slider1 = document.getElementById("slider1"); // initial slider
const inputBox1 = document.getElementById("sliderInputBox1"); // initial slider input box
const menu1 = document.getElementById("bacteria1"); // initial bacteria menu

// counters
let count1 = 1; // bacteria menu counter
let count2 = 1; // temperature slider/input box counter
let count3 = 2; // ensures that there can only be up to 6 elements of either bacteria menus or temperature sliders/inputboxes

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
    for (let i=2; i<6; i++) {
        if(localStorage.getItem("menu"+ i)){
            bacteria.click();
        }
    }
    for (let i=2; i<6; i++) {
        if(localStorage.getItem("slider"+ i)){
            addTemp.click();
        }
    }
}

// submit
submitButton.addEventListener("click", function(){
    form1.requestSubmit();
    form2.requestSubmit();
    form3.requestSubmit();
    form4.requestSubmit();
});

// slider colors
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
    var temp1 = document.getElementById("bacteria" + count1);
    if (container.contains(temp1)) {
        container.removeChild(container.lastElementChild);
        localStorage.removeItem("menu" + count1);
        count1 = count1 - 1;
        count3 = count3 - 1;
    }
});

// removes temperature sliders/input boxes + deletes saved input data
removeTemp.addEventListener("click", function() {
    var temp2 = document.getElementById("sliderid");
    if (container2.contains(temp2)) {
        container2.removeChild(container2.lastElementChild);
        localStorage.removeItem("slider" + count2);
        count2 = count2 - 1;
        count3 = count3 - 1;
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
    if (count1 < 5 && count3 < 6) {
        count1++;
        count3++;

        const newInput = document.createElement("select");
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        const option3 = document.createElement("option");
        const option4 = document.createElement("option");
        const option5 = document.createElement("option");
        const option6 = document.createElement("option");

        option1.textContent = "";
        option1.id = "NULL";
        option2.textContent = "E. Coli";
        option2.id = "eColi";
        option3.textContent = "Mycobacterium Tuberculosis";
        option3.id = "mycobacteriumTuberculosis";
        option4.textContent = "Clostridium Tetanus";
        option4.id = "clostridiumTetanus";
        option5.textContent = "Listeria Monocytogenes";
        option5.id = "listeriaMonocytogenes";
        option6.textContent = "Thermus Acquaticus";
        option6.id = "thermusAcquaticus";

        newInput.appendChild(option1);
        newInput.appendChild(option2);
        newInput.appendChild(option3);
        newInput.appendChild(option4);
        newInput.appendChild(option5);
        newInput.appendChild(option6);
        newInput.id = 'bacteria' + count1;
        container.appendChild(newInput);

        // saves user input
        newInput.addEventListener("change", function() {
            localStorage.setItem("menu" + count1, newInput.value);
        });
        //loads past user input
        if(localStorage.getItem("menu" + count1)){
            newInput.value = localStorage.getItem("menu" + count1);
        }
    }
});

// adds a new temperautre slide and input box + saves/loads past user input
addTemp.addEventListener("click", function() {
    if (count2 < 5 && count3 < 6) {
        count2++;
        count3++;

        const newSlider = document.createElement("input");
        const newInput = document.createElement("input");

        newSlider.type="range";
        newSlider.min=0;
        newSlider.max=100;
        newSlider.value=50;
        newSlider.step=1;
        newInput.value=newSlider.value;
        newInput.type = "text";
        newSlider.id = "slider" + count2;

        const sliderInput = document.createElement("div");
        sliderInput.id = "sliderid";
        sliderInput.classList.add("row");
 
        // changes corresponding input box to match slider
        newSlider.addEventListener("input", function(){
            newInput.value=newSlider.value;
            sliderColor(newSlider, newSlider); // changes slider color
            localStorage.setItem("slider" + count2, newInput.value);
        });

        // changes corresponding slider to match input box
        newInput.addEventListener("input", function(){
            if(newInput.value < 101){
                newSlider.value=newInput.value;
            }
            sliderColor(newInput, newSlider); // changes slider color
            localStorage.setItem("slider" + count2, newSlider.value); // saves user input
        });

        // loads past user input
        if(localStorage.getItem("slider"+ count2)) {
            newInput.value = localStorage.getItem("slider" + count2);
            newSlider.value = localStorage.getItem("slider" + count2);
            sliderColor(newInput, newSlider);
        }
        
        sliderInput.appendChild(newSlider);
        sliderInput.appendChild(newInput);
        container2.appendChild(sliderInput);
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
