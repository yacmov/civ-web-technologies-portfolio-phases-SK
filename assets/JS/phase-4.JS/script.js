// Alias document
const dom = document;

// Set for responding API
let chosenURL = "";
let parameterValue = "";
let jasonValue = null;

// Store 2 chosen API URLs
const apiUrls = {
  jokesApi: "https://api.api-ninjas.com/v1/jokes?limit=",
  recipeApi: "https://api.api-ninjas.cddsom/v1/recipe?query=",
  // recipeApi: "https://api.api-ninjas.com/v1/recipe?query=",
};

// Get checkbox references
const checkboxes = {
  jokesApi: dom.querySelector("#jokes-api"),
  recipeApi: dom.querySelector("#recipe-api"),
};

// NOTE: Show value
console.log(checkboxes.jokesApi);
console.log(checkboxes.recipeApi);

// Function to make the API call
function callApi() {
  const options = {
    method: "GET",
    headers: { "x-api-key": "x7HtPDSOZzLHE1JZ0F7QgQ==xXak6QMHw5RPoIGa" },
  };

  fetch(chosenURL, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      jasonValue = data;
      displayResult();
    })
    .catch((err) => {
      let target = dom.querySelector("#api-response");
      target.innerText = "";
      target.innerText += `${err}`;
      console.error(`Error: ${err}`);
    });
}

function clickButton(event) {
  event.preventDefault();
  if (isChecked()) {
    callApi();
  }
}

// Check if a checkbox is checked
function isChecked() {
  const recipeApi = checkboxes.recipeApi.checked;
  const jokesApi = checkboxes.jokesApi.checked;
  const errMessage = "Check 1 API";
  // NOTE: Selected all
  if (recipeApi && jokesApi) {
    console.log(errMessage);
    alert(errMessage);
    return false;
    // NOTE: Selected recipeApi
  } else if (recipeApi) {
    console.log("RecipeApi checked");
    if (!checkTextBoxValue("recipeApi")) {
      return false;
    }
    if (parameterValue === "") {
    return false;
    }
    chosenURL = apiUrls.recipeApi + parameterValue;
    console.log(chosenURL);
    return true;
    // NOTE: Selected jokesApi
  } else if (jokesApi) {
    console.log("JokesApi checked");
    if (!checkTextBoxValue("jokesApi")) {
      return false;
    }
    if (parameterValue === "") {
    return false;
    }
    chosenURL = apiUrls.jokesApi + parameterValue;
    console.log(chosenURL);
    return true;
  }
  // NOTE: Select none
  else {
    console.log(errMessage);
    alert(errMessage);
    return false;
  }
}

function checkTextBoxValue(selectedApi) {
  let apiContentInput = dom.getElementById("api-content");
  textBoxValue = apiContentInput.value;
  parameterValue = textBoxValue;
  if (parameterValue.length === 0) {
    console.log(`No value in text box for ${selectedApi}`);
    alert(`No value in text box for ${selectedApi}`);
  }

  if (selectedApi === "jokesApi") {
    // TODO: Check is it number?
    if (parameterValue === "") {
      return false;
    }

    if (!parseFloat(textBoxValue)) {
      console.error("Text input not valid");
      alert("Chosen API allow number");
      return false;
    }
    if (parseFloat(textBoxValue) < 0 || parseFloat(textBoxValue) > 30) {
      // The API's limitation range is between 1 to 30
      console.error("Input between 1 to 30");
      alert("Input between 1 to 30");
      return false;
    }
  } else {
    if (parseFloat(textBoxValue)){
      console.error("Input not valid");
      alert("Chosen API allow not a number");
      return false;
    }
  }
  return true;
}

function displayResult() {
  if (jasonValue) {
    let target = dom.querySelector("#api-response");
    target.innerText = ""; // Clear previous content
    if (jasonValue.length === 0){
      console.log("No data found");
      target.innerText += "No data found";
      return; 
    }else if(parseFloat(parameterValue)) {
      for (let i = 0; i < jasonValue.length && i < parameterValue; i++) {
        target.innerText += i + 1 + ". " + jasonValue[i].joke + "\n\n";
      }
      return;
    } else if (!parseFloat(parameterValue)) {
      for (let i = 0; i < jasonValue.length; i++) {
        target.innerText += i + 1 + ". " + jasonValue[i].title + "\n\n";
      }
      return
    } else {
      console.log("Data not yet available");
      return;
    }
  }
}

dom.getElementById("submit").addEventListener("click", clickButton, false);

// Get references to the checkboxes
const jokesApiCheckbox = checkboxes.jokesApi;
const recipeApiCheckbox = checkboxes.recipeApi;

// Add event listeners to each checkbox
jokesApiCheckbox.addEventListener("click", () => {
  if (jokesApiCheckbox.checked) {
    recipeApiCheckbox.checked = false;
  }
});

recipeApiCheckbox.addEventListener("click", () => {
  if (recipeApiCheckbox.checked) {
    jokesApiCheckbox.checked = false;
  }
});