// function that accepts an image url string and adds an
// image element to the page in the #dogContainer
function replaceImage(imageUrl) {
    // create an img element
    const dogImg = document.createElement("img");
    // set the src attribute from the passed imageUrl parameter
    dogImg.setAttribute("src", imageUrl);
    // set the width
    dogImg.setAttribute("width", 300);
    // find the dogContainer
    const dogContainer = document.querySelector("#dogContainer");
    // clear it out
    dogContainer.innerHTML = "";
    // append the new dogImage
    dogContainer.append(dogImg);
}

// find the dog button
const dogButton = document.getElementById("dogButton");

// add a click listener
dogButton.addEventListener("click", () => {
// save the current button text
const oldText = dogButton.innerText;
// update the button text
dogButton.innerHTML = "Generating Doggo..."
// fetch a random dog image
fetch("https://dog.ceo/api/breeds/image/random")
    .then((res) => res.json()) // convert the json data to an object
    .then((data) => { // use the data
    replaceImage(data.message) // replace the current image with the new data
    dogButton.innerHTML = oldText; // reset the button text back to what it was
    })
    .catch((error) => {
    alert('Failed to generate doggo. Please check treats and try again.')
    console.log(error);
    });
});

// find the select element on the page
const select = document.getElementById('dogSelect')

// fetch the list of breeds
fetch('https://dog.ceo/api/breeds/list')
.then(res => res.json()) // parse the response from JSON
.then(data => {
    // for each item in the response (data.message)
    for (let i = 0; i < data.message.length; i++) {
    // get 1 name
    const name = data.message[i];
    // create a new option
    const option = document.createElement('option')
    // set the text of the option element to the current name of the breed
    option.innerText = name;
    // add the option to the select input
    select.append(option);
    }
})

// add a 'change' listener
select.addEventListener('change', () => {
// use the value from the select input to make a new request
// to the API URL that returns a random image for the specific breed
fetch(`https://dog.ceo/api/breed/${select.value}/images/random`)
.then(res => res.json()) // convert the response from JSON
.then(data => {
    // add a new image to the page from the data.message
    replaceImage(data.message)
})
})
