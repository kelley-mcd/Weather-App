let resultsText = document.querySelector('#results-text');



















const fetchButton = document.querySelector('#fetch-button');


function getApi() {
  let requestURL= "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=" + WeathAPIkey;

  fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
     data.forEach(function(e) {
        searchCity.append(document.querySelector("<h5>").text(e.login), document.querySelector("<p>").text(e.url));
      })
    });
}
fetchButton.addEventListener("submit", getApi());

