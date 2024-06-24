
const container = document.getElementById("menuContainer");
const bacteria = document.getElementById("addBacteria");
// counters
let count1 = 1;
let count2=1;
let count3=2; // reflects the two options that will stay on the screen
const container2 = document.getElementById("temperatures");
const temp = document.getElementById("temperature1");
const slider = document.getElementById("slider1");
const theInput = document.getElementById("forSlider");
const removeB = document.getElementById("removeBacteria");
const removeT = document.getElementById("temperature2");

const turnIn = document.getElementById("myForm");
const submitButton = document.getElementById("submitButton");


removeB.addEventListener("click", function() {
    var temp1 = document.getElementById("bacteria" + count1);
    if (container.contains(temp1)) {
        container.removeChild(container.lastElementChild);
        count1 = count1 - 1;
        count3 = count3 - 1;
    }
});

removeT.addEventListener("click", function() {
    var temp2 = document.getElementById("sliderid");
    if (container2.contains(temp2)) {
        container2.removeChild(container2.lastElementChild);
        count2 = count2 - 1;
        count3 = count3 - 1;
    }
});


slider.addEventListener("input", function(){
    theInput.value = slider.value;

    //add this next part inside the other functions
    // to have the rest of the sliders do the same
    if(slider.value== 37) {
        slider.style.backgroundColor = `rgb(255, 139, 139)`;
    }
    else if(slider.value==38) {
        slider.style.backgroundColor = `rgb(255, 106, 75)`;
    }
    else if(slider.value== 39) {
        slider.style.backgroundColor = `rgb(255, 69, 2)`;
    }
    else if(slider.value<6) {
        slider.style.backgroundColor = `rgb(0, 0, 255)`;
    }
    else if(slider.value<11) {
        slider.style.backgroundColor = `rgb(93, 0, 255)`;
    }
    else if(slider.value<16) {
        slider.style.backgroundColor = `rgb(123, 0, 255)`;
    }
    else if(slider.value<21) {
        slider.style.backgroundColor = `rgb(152, 0, 255)`;
    }
    else if(slider.value<26) {
        slider.style.backgroundColor = `rgb(191, 0, 255)`;
    }
    else if(slider.value<31) {
        slider.style.backgroundColor = `rgb(216, 0, 255)`;
    }
    else if(slider.value<36) {
        slider.style.backgroundColor = `rgb(255, 0, 255)`;
    }
    else if(slider.value<41) {
        slider.style.backgroundColor = `rgb(255, 0, 182)`;
    }
    else if(slider.value<46) {
        slider.style.backgroundColor = `rgb(255, 0, 114)`;
    }
    else if(slider.value<101) {
        slider.style.backgroundColor = `rgb(231, 38, 0)`;
    }
    else{
        slider.style.backgroundColor = `rgb(223, 223, 223)`;
    }
})

theInput.addEventListener("input", function(){
    if(theInput.value < 101){
        slider.value = theInput.value;
    }  
    if(theInput.value== 37) {
        slider.style.backgroundColor = `rgb(255, 139, 139)`;
    }
    else if(theInput.value==38) {
        slider.style.backgroundColor = `rgb(255, 106, 75)`;
    }
    else if(theInput.value== 39) {
        slider.style.backgroundColor = `rgb(255, 69, 2)`;
    }
    else if(theInput.value<6) {
        slider.style.backgroundColor = `rgb(0, 0, 255)`;
    }
    else if(theInput.value<11) {
        slider.style.backgroundColor = `rgb(93, 0, 255)`;
    }
    else if(theInput.value<16) {
        slider.style.backgroundColor = `rgb(123, 0, 255)`;
    }
    else if(theInput.value<21) {
        slider.style.backgroundColor = `rgb(152, 0, 255)`;
    }
    else if(theInput.value<26) {
        slider.style.backgroundColor = `rgb(191, 0, 255)`;
    }
    else if(theInput.value<31) {
        slider.style.backgroundColor = `rgb(216, 0, 255)`;
    }
    else if(theInput.value<36) {
        slider.style.backgroundColor = `rgb(255, 0, 255)`;
    }
    else if(theInput.value<41) {
        slider.style.backgroundColor = `rgb(255, 0, 182)`;
    }
    else if(theInput.value<46) {
        slider.style.backgroundColor = `rgb(255, 0, 114)`;
    }
    else if(theInput.value<101) {
        slider.style.backgroundColor = `rgb(231, 38, 0)`;
    }
    else{
        slider.style.backgroundColor = `rgb(223, 223, 223)`;
    }
})


bacteria.addEventListener("click", function() {
    if (count1 < 5 && count3 < 6) {
        count1++;
        count3++;
        const newInput = document.createElement("select");
        const option1 = document.createElement("option")
        const option2 = document.createElement("option")
        const option3 = document.createElement("option")
        const option4 = document.createElement("option")
        const option5 = document.createElement("option")
        option1.textContent = "E. Coli";
        option2.textContent = "Mycobacterium Tuberculosis";
        option3.textContent = "Clostridium Tetanus";
        option4.textContent = "Listeria Monocytogenes";
        option5.textContent = "Thermus Acquaticus";
        newInput.appendChild(option1);
        newInput.appendChild(option2);
        newInput.appendChild(option3);
        newInput.appendChild(option4);
        newInput.appendChild(option5);
        newInput.id = 'bacteria' + count1;
        
         //bacteria2, bacteria3...
        //container.append("\nSelect Bacteria:");
        //container.appendChild(newInput);
        container.appendChild(newInput)
        // container.insertBefore(newInput, this);
        //container.innerHTML += ' ';
        //container.appendChild( document.createTextNode( '\u00A0' ) );
    }

});

temp.addEventListener("click", function() {

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
        newInput.type = "text"
        newSlider.id = "slider" + count2;

        const sliderInput = document.createElement("div");
        
        sliderInput.id = "sliderid";
        sliderInput.classList.add("row");
        //newSlider.oninput=this.nextElementSibling.value = this.value        
       // container2.append("Select a Temperature: ");
       sliderInput.appendChild(newSlider);
       sliderInput.appendChild(newInput);
       container2.appendChild(sliderInput) 
       //container2.insertBefore(newSlider, this);
        //container2.insertBefore(newInput, this);
        newSlider.addEventListener("input", function(){
            newInput.value=newSlider.value;
        });
        newInput.addEventListener("input", function(){
            if(newInput.value < 101){
                newSlider.value=newInput.value;
            }
            if(newInput.value== 37) {
                newSlider.style.backgroundColor = `rgb(255, 139, 139)`;
            }
            else if(newInput.value==38) {
                newSlider.style.backgroundColor = `rgb(255, 106, 75)`;
            }
            else if(newInput.value== 39) {
                newSlider.style.backgroundColor = `rgb(255, 69, 2)`;
            }
            else if(newInput.value<6) {
                newSlider.style.backgroundColor = `rgb(0, 0, 255)`;
            }
            else if(newInput.value<11) {
                newSlider.style.backgroundColor = `rgb(93, 0, 255)`;
            }
            else if(newInput.value<16) {
                newSlider.style.backgroundColor = `rgb(123, 0, 255)`;
            }
            else if(newInput.value<21) {
                newSlider.style.backgroundColor = `rgb(152, 0, 255)`;
            }
            else if(newInput.value<26) {
                newSlider.style.backgroundColor = `rgb(191, 0, 255)`;
            }
            else if(newInput.value<31) {
                newSlider.style.backgroundColor = `rgb(216, 0, 255)`;
            }
            else if(newInput.value<36) {
                newSlider.style.backgroundColor = `rgb(255, 0, 255)`;
            }
            else if(newInput.value<41) {
                newSlider.style.backgroundColor = `rgb(255, 0, 182)`;
            }
            else if(newInput.value<46) {
                newSlider.style.backgroundColor = `rgb(255, 0, 114)`;
            }
            else if(newInput.value<101) {
                newSlider.style.backgroundColor = `rgb(231, 38, 0)`;
            }
            else{
                newSlider.style.backgroundColor = `rgb(223, 223, 223)`;
            }
        });
        newSlider.addEventListener("input", function(){
            theInput.value = slider.value;
        
            //add this next part inside the other functions
            // to have the rest of the sliders do the same
            if(newSlider.value== 37) {
                newSlider.style.backgroundColor = `rgb(255, 139, 139)`;
            }
            else if(newSlider.value==38) {
                newSlider.style.backgroundColor = `rgb(255, 106, 75)`;
            }
            else if(newSlider.value== 39) {
                newSlider.style.backgroundColor = `rgb(255, 69, 2)`;
            }
            else if(newSlider.value<6) {
                newSlider.style.backgroundColor = `rgb(0, 0, 255)`;
            }
            else if(newSlider.value<11) {
                newSlider.style.backgroundColor = `rgb(93, 0, 255)`;
            }
            else if(newSlider.value<16) {
                newSlider.style.backgroundColor = `rgb(123, 0, 255)`;
            }
            else if(newSlider.value<21) {
                newSlider.style.backgroundColor = `rgb(152, 0, 255)`;
            }
            else if(newSlider.value<26) {
                newSlider.style.backgroundColor = `rgb(191, 0, 255)`;
            }
            else if(newSlider.value<31) {
                newSlider.style.backgroundColor = `rgb(216, 0, 255)`;
            }
            else if(newSlider.value<36) {
                newSlider.style.backgroundColor = `rgb(255, 0, 255)`;
            }
            else if(newSlider.value<41) {
                newSlider.style.backgroundColor = `rgb(255, 0, 182)`;
            }
            else if(newSlider.value<46) {
                newSlider.style.backgroundColor = `rgb(255, 0, 114)`;
            }
            else if(newSlider.value<101) {
                newSlider.style.backgroundColor = `rgb(231, 38, 0)`;
            }
            else{
                newSlider.style.backgroundColor = `rgb(223, 223, 223)`;
            }
        
        })
    }
});


