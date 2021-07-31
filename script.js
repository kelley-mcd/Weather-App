const WeathAPIkey = "38d375f0ae73a2b7f0a1570df2ff4387";

const searchCity = document.querySelector('#search-form');


function searchFormSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector('#search-input').value;
  let formatInput = document.querySelector('#format-input').value;

  if (!searchInput) {
    console.error('You need a search input value!');
    return;
  }

  let querryString = './search-results.htmlq=' + searchInput + "$format=" + formatInput;

  location.assign(querryString);
}

searchCity.addEventListener('submit', searchFormSubmit);
