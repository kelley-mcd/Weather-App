let resultsText = document.querySelector('#results-text');
let resultsContent = document.querySelector('#results-content');
let searchForm = document.querySelector('#search-form');

function getParams() {

    let searchParamsArr = document.location.search.split('&');

    let query = searchParamsArr[0].split('=').pop();
    let format = searchParamsArr[1].split('=').pop();

    searchApi(query, format);
}

function printResults(resultObj) {
    console.log(resultObj);

    let resultCard = document.createElement('div');
    resultCard.classList.add('card', "bg-light", 'text-dark', 'mb-3', 'p-3');

    let resultBody = document.createElement('h3');
    titleTitle.textContent = resultObj.title;

    let bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML +=
        '<strong>Date:</strong>' + resultObj.date + '<br/>';

    if (resultObj.subject) {
        bodyContentEl.innerHTML +=
            '<strong>Subjects:</strong>' + resultObj.subject.join(', ') + '<br/>';
    } else {
        bodyContentEl.innerHTML +=
            '<strong>Subjects:</strong> No Subject for this entry.';
    }

    if (resultObj.description) {
        bodyContentEl.innerHTML +=
            '<strong>Description:</strong>' + resultObj.description[0];
    } else {
        bodyContentEl.innerHTML +=
            '<strong>Description:</strong> No description for this entry';
    }

    let linkButtonEl = document.createElement('a');
    linkButtonEl.textContent = 'read more';
    linkButtonEl.setAttribute('hred', resultObj.url);
    linkButtonEl.classList.add('btn', 'btn-dark');

    resultBody.append(titleTitle, bodyContentEl, linkButtonEl);

    resultsContent.append(resultCard);
}


function searchApi(query, format) {
    let queryURL = "https://openweathermap.org/?fo=json";

    if (format) {
        queryURL = "https://openweathermap.org/" + format + "/?fo=json";
    }


    queryURL = queryURL + "&q=" + query;

    fetch(queryURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (locRes) {
            resultsText.resultsContent = locRes.search.query;

            console.log(locRes);

            if (!locRes.results.length) {
                console.log("no results found");
                resultsContent.innerHTML = "<h3>No results found, search again</h3>";
            } else {
                resultsContent.textContent = "";
                for (let i = 0; i < locRes.results.length; i++) {
                    printResults(locRes.results[i]);
                }
            }
        })


    function handleSearchFormSubmit(event) {
        event.preventDefault();

        let searchInput = document.querySelector("#search-input").value;
        let formatInput = document.querySelector("#format-input").value;

        if (!searchInput) {
            console.error("you need a search input value");
            return;
        }

        searchApi(searchInput, formatInput);
    }

    searchForm.addEventListener("submit", handleSearchFormSubmit);

    getParams();

}