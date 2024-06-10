// Alias document
const dom = document;

// Set for responding API
let chosenURL = "";
let parameterValue = "";
let jsonValue = null;

// Store 2 chosen API URLs
const apiUrls = {
  jokesApi: "https://api.api-ninjas.com/v1/jokes?limit=",
  recipeApi: "https://api.api-ninjas.com/v1/recipe?query=",
  // for invalid api test
  // recipeApi: "https://api.api-ninjas.cddsom/v1/recipe?query=",
};

// Get checkbox references
const checkboxes = {
  jokesApi: dom.querySelector("#jokes-api"),
  recipeApi: dom.querySelector("#recipe-api"),
};

// Function to make the API call
function callApi() {
  const options = {
    method: "GET",
    // current API key
    headers: { "x-api-key": "x7HtPDSOZzLHE1JZ0F7QgQ==xXak6QMHw5RPoIGa" },

    // for invalid api test
    // headers: { "x-api-key": "aax7HtPDSOZzLHE1JZ0F7QgQ==xXak6QMHw5RPoIGa" },
  };

  fetch(chosenURL, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        let target = dom.querySelector("#api-response");
        target.innerText = "";
        target.innerText += `${err}`;
        target.innerText += `\nReason: Invalid API KEY`;
        // console.error(`Error: ${err}`);
        return;
      }
    })
    .then((data) => {
      jsonValue = data;
      displayResult();
    })
    .catch((err) => {
      alert(err);
      let target = dom.querySelector("#api-response");
      // target.innerText = "";
      target.innerText += `\n${err}`;
      target.innerText += `\nReason: Invalid API`;
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
    alert(errMessage);
    return false;
    // NOTE: Selected recipeApi
  } else if (recipeApi) {
    if (!checkTextBoxValue("recipeApi")) {
      return false;
    }
    if (parameterValue === "") {
      return false;
    }
    chosenURL = apiUrls.recipeApi + parameterValue;
    return true;
    // NOTE: Selected jokesApi
  } else if (jokesApi) {
    if (!checkTextBoxValue("jokesApi")) {
      return false;
    }
    if (parameterValue === "") {
      return false;
    }
    chosenURL = apiUrls.jokesApi + parameterValue;
    return true;
  }
  // NOTE: Select none
  else {
    alert(errMessage);
    return false;
  }
}

function checkTextBoxValue(selectedApi) {
  let apiContentInput = dom.getElementById("api-content");
  textBoxValue = apiContentInput.value;
  parameterValue = textBoxValue;
  if (parameterValue.length === 0) {
    alert(`No value in text box for ${selectedApi}`);
  }

  if (selectedApi === "jokesApi") {
    // TODO: Check is it number?
    if (parameterValue === "") {
      return false;
    }

    if (!parseFloat(textBoxValue)) {
      alert("Chosen API allow number");
      return false;
    }
    if (parseFloat(textBoxValue) < 0 || parseFloat(textBoxValue) > 30) {
      // The API's limitation range is between 1 to 30
      alert("Input between 1 to 30");
      return false;
    }
  } else {
    if (parseFloat(textBoxValue)) {
      alert("Chosen API allow not a number");
      return false;
    }
  }
  return true;
}

function displayResult() {
  if (jsonValue) {
    let target = dom.querySelector("#api-response");
    target.innerText = ""; // Clear previous content
    if (jsonValue.length === 0) {
      target.innerText += "No data found";
      return;
    } else if (parseFloat(parameterValue)) {
      for (let i = 0; i < jsonValue.length && i < parameterValue; i++) {
        target.innerText += i + 1 + ". " + jsonValue[i].joke + "\n\n";
      }
      return;
    } else if (!parseFloat(parameterValue)) {
      for (let i = 0; i < jsonValue.length; i++) {
        target.innerText += i + 1 + ". " + jsonValue[i].title + "\n\n";
      }
      return;
    } else {
      console.error("Data not yet available");
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
