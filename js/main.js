// const { Linter } = require('eslint');
var $results = document.querySelector('.result-list');

function createResult(animeObj) {

  var $li = document.createElement('li');
  $li.className = 'anime-card align-items-center';
  $li.setAttribute('id', animeObj.mal_id);

  var $divRow = document.createElement('div');
  $divRow.className = 'row width-100';

  var $img = document.createElement('img');
  $img.setAttribute('src', animeObj.image_url);
  $img.className = 'img';

  var $textCard = document.createElement('div');
  $textCard.className = 'text-card';

  var $titleHeader = document.createElement('h5');
  $titleHeader.className = 'margin-0';
  $titleHeader.textContent = 'Title;';

  var $title = document.createElement('p');
  $title.className = 'margin-0';
  $title.textContent = animeObj.title;

  var $synopsisHeader = document.createElement('h5');
  $synopsisHeader.className = 'margin-top-half';
  $synopsisHeader.textContent = 'Synopsis:';

  var $synopsis = document.createElement('p');
  $synopsis.className = 'margin-0';
  $synopsis.textContent = animeObj.synopsis;

  var $divBtnrow = document.createElement('div');
  $divBtnrow.className = 'row justify-end margin-top-half';

  var $addBtn = document.createElement('button');
  $addBtn.className = 'btn add-btn';
  $addBtn.textContent = 'ADD';

  // var $resultForm = document.createElement('form');

  $li.appendChild($divRow);
  $divRow.appendChild($img);
  $divRow.appendChild($textCard);
  $textCard.appendChild($titleHeader);
  $textCard.appendChild($title);
  $textCard.appendChild($synopsisHeader);
  $textCard.appendChild($synopsis);
  $li.appendChild($divBtnrow);

  // $li.appendChild($resultForm);
  // $resultForm.appendChild($divBtnrow);

  $divBtnrow.appendChild($addBtn);

  return $li;

}

var $searchBar = document.querySelector('.searchBar');
var $searchBtn = document.querySelector('.search-btn');
var $searchBarResults = document.querySelector('.searchBar.results');
var $searchBtnResults = document.querySelector('.search-btn.results');

$searchBtn.addEventListener('click', onSearch);
$searchBtnResults.addEventListener('click', resultsOnSearch);

function onSearch(event) {
  data.searchList = [];
  var searchBar;
  if (data.view === 'search-page') {
    searchBar = $searchBar;
  } else {
    searchBar = $searchBarResults;
  }
  var searchVal = searchBar.value;
  var jikanReq = new XMLHttpRequest();
  jikanReq.open('GET', 'https://api.jikan.moe/v3/search/anime?q=' + searchVal);
  jikanReq.responseType = 'json';
  jikanReq.addEventListener('load', function () {
    var searchList = jikanReq.response.results;
    for (var result = 0; result < 5; result++) {
      var searchResult = createResult(searchList[result]);
      $results.appendChild(searchResult);
      data.searchList.push(searchList[result]);
    }
  });
  jikanReq.send();
  switchViews('search-results');
  $searchBarResults.value = searchVal;
}

function resultsOnSearch(event) {
  clearResults();
  onSearch();
}

var $views = document.querySelectorAll('.view');

function switchViews(view) {
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === view) {
      $views[i].className = 'view';
      data.view = view;
    } else {
      $views[i].className = 'view hidden';
    }
  }
}

function clearResults() {
  var currDomResults = document.querySelectorAll('.result-list li');
  for (var i = 0; i < currDomResults.length; i++) {
    currDomResults[i].remove();
  }
}

var $searchIcon = document.querySelector('.navbar .fa-search');
var $searchIconTop = document.querySelector('.navbar-top .fa-search');

$searchIcon.addEventListener('click', searchIconClick);
$searchIconTop.addEventListener('click', searchIconClick);

function searchIconClick(event) {
  $searchBar.value = '';
  clearResults();
  switchViews('search-page');
}

$results.addEventListener('click', addClick);

function addClick(event) {
  event.preventDefault();

  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  var resultSelected = event.target.closest('li');

  for (var i = 0; i < data.searchList.length; i++) {
    if (data.searchList[i].mal_id === parseInt(resultSelected.getAttribute('id'))) {
      data.watchList.push(data.searchList[i]);
    }
  }
}
