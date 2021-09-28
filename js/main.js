// const { Linter } = require('eslint');

/*

  <div class="flex align-items-center">
    <h4 class="margin-0">Priority:</h4>
    <ul class="up-arrows padding-lr-half">
      <i class="fas fa-arrow-alt-circle-up"></i>
      <i class="fas fa-arrow-alt-circle-up"></i>
      <i class="fas fa-arrow-alt-circle-up"></i>
      <i class="fas fa-arrow-alt-circle-up"></i>
      <i class="fas fa-arrow-alt-circle-up"></i>
    </ul>
  </div>
   */
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
  $titleHeader.textContent = 'Title:';

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
  $divBtnrow.className = 'row justify-between margin-top-half';

  var $btn = document.createElement('button');
  if (data.view === 'search-results') {
    $btn.className = 'btn add-btn';
    $btn.textContent = 'ADD';
  } else if (data.view === 'watch-list') {
    $btn.className = 'btn remove-btn';
    $btn.textContent = 'REMOVE';
  }

  var $priorityDiv = document.createElement('div');
  $priorityDiv.className = 'flex align-items-center';

  var $priorityHeader = document.createElement('h3');
  $priorityHeader.className = 'margin-0';
  $priorityHeader.textContent = 'Priority';

  var $arrowsDiv = document.createElement('div');
  $arrowsDiv.className = 'up-arrows flex padding-lr-third align-items-center';

  var arrowsList = [];

  var $upArrow = document.createElement('i');
  $upArrow.className = 'fas fa-arrow-alt-circle-up';
  $upArrow.setAttribute('id', 0);
  arrowsList.push($upArrow);

  var $upArrow2 = document.createElement('i');
  $upArrow2.className = 'fas fa-arrow-alt-circle-up';
  $upArrow2.setAttribute('id', 1);
  arrowsList.push($upArrow2);

  var $upArrow3 = document.createElement('i');
  $upArrow3.className = 'fas fa-arrow-alt-circle-up';
  $upArrow3.setAttribute('id', 2);
  arrowsList.push($upArrow3);

  var $upArrow4 = document.createElement('i');
  $upArrow4.className = 'fas fa-arrow-alt-circle-up';
  $upArrow4.setAttribute('id', 3);
  arrowsList.push($upArrow4);

  var $upArrow5 = document.createElement('i');
  $upArrow5.className = 'fas fa-arrow-alt-circle-up';
  $upArrow5.setAttribute('id', 4);
  arrowsList.push($upArrow5);

  if (animeObj.priority !== null) {
    for (var arrowFillIndex = 0; arrowFillIndex <= animeObj.priority; arrowFillIndex++) {
      arrowsList[arrowFillIndex].className = 'fill-arrow fas fa-arrow-alt-circle-up';
    }
  }

  $li.appendChild($divRow);
  $divRow.appendChild($img);
  $divRow.appendChild($textCard);
  $textCard.appendChild($titleHeader);
  $textCard.appendChild($title);
  $textCard.appendChild($synopsisHeader);
  $textCard.appendChild($synopsis);
  $li.appendChild($divBtnrow);
  $divBtnrow.appendChild($priorityDiv);

  $priorityDiv.appendChild($priorityHeader);
  $priorityDiv.appendChild($arrowsDiv);
  $arrowsDiv.appendChild($upArrow);
  $arrowsDiv.appendChild($upArrow2);
  $arrowsDiv.appendChild($upArrow3);
  $arrowsDiv.appendChild($upArrow4);
  $arrowsDiv.appendChild($upArrow5);
  $divBtnrow.appendChild($btn);

  return $li;
}

var $searchBar = document.querySelector('.searchBar');
var $searchBtn = document.querySelector('.search-btn');
var $searchBarResults = document.querySelector('.searchBar.results');
var $searchBtnResults = document.querySelector('.search-btn.results');

$searchBtn.addEventListener('click', onSearch);
$searchBtnResults.addEventListener('click', resultsOnSearch);

function onSearch(event) {
  var searchBar;
  if (data.view === 'search-page') {
    searchBar = $searchBar;
  } else {
    searchBar = $searchBarResults;
  }
  data.search = searchBar.value;

  var jikanReq = new XMLHttpRequest();
  jikanReq.open('GET', 'https://api.jikan.moe/v3/search/anime?q=' + data.search);
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
  $searchBarResults.value = data.search;
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
  data.searchList = [];
  data.search = '';
  $searchBar.value = '';
  $emptyHeader.className = 'emptyHeader hidden';
  var currDomResults = document.querySelectorAll('.result-list li');
  for (var i = 0; i < currDomResults.length; i++) {
    currDomResults[i].remove();
  }
  var currWatchResults = document.querySelectorAll('.watch-list li');
  for (var j = 0; j < currWatchResults.length; j++) {
    currWatchResults[j].remove();
  }
}

var $searchIcon = document.querySelector('.navbar .fa-search');
var $searchIconTop = document.querySelector('.navbar-top .fa-search');

$searchIcon.addEventListener('click', searchIconClick);
$searchIconTop.addEventListener('click', searchIconClick);

function searchIconClick(event) {
  clearResults();
  switchViews('search-page');
}

$results.addEventListener('click', addResult);

function addResult(event) {
  event.preventDefault();
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  var resultSelected = event.target.closest('li');
  for (var i = 0; i < data.searchList.length; i++) {
    if (data.searchList[i].mal_id === parseInt(resultSelected.getAttribute('id'))) {
      data.searchList[i].priority = null;
      data.watchList.push(data.searchList[i]);
    }
  }
  renderWatchList();
}

function onDomLoad(event) {
  switchViews(data.view);
  if (data.view === 'search-results') {
    $searchBarResults.value = data.search;
    for (var i = 0; i < data.searchList.length; i++) {
      $results.appendChild(createResult(data.searchList[i]));
    }
  } else if (data.view === 'watch-list') {
    renderWatchList();
  }

}

window.addEventListener('DOMContentLoaded', onDomLoad);

var $watchListIcon = document.querySelector('.navbar .fa-list-alt');
var $watchListIconTop = document.querySelector('.navbar-top .fa-list-alt');
var $watchList = document.querySelector('.watch-list');
var $emptyHeader = document.querySelector('.emptyHeader');

$watchListIcon.addEventListener('click', renderWatchList);
$watchListIconTop.addEventListener('click', renderWatchList);

function renderWatchList(event) {
  clearResults();
  switchViews('watch-list');

  for (var i = 0; i < data.watchList.length; i++) {
    if (data.watchList[i].priority === null) {
      $watchList.prepend(createResult(data.watchList[i]));
    }
  }
  for (var priorityRank = 0; priorityRank <= 4; priorityRank++) {
    for (var watchListIndex = 0; watchListIndex < data.watchList.length; watchListIndex++) {
      if (data.watchList[watchListIndex].priority === priorityRank) {
        $watchList.prepend(createResult(data.watchList[watchListIndex]));
      }
    }
  }
  if (data.watchList.length === 0) {
    $emptyHeader.className = 'emptyHeader';
  }

}
$watchList.addEventListener('click', deleteResult);

function deleteResult(event) {
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  var resultSelected = event.target.closest('li');
  for (var i = 0; i < data.watchList.length; i++) {
    if (data.watchList[i].mal_id === parseInt(resultSelected.getAttribute('id'))) {
      resultSelected.remove();
      data.watchList.splice(i, 1);
    }
  }
  if (data.watchList.length === 0) {
    $emptyHeader.className = 'emptyHeader';
  }
}

var $resultList = document.querySelector('.result-list');
$watchList.addEventListener('click', setPriority);
$resultList.addEventListener('click', setPriority);

function setPriority(event) {
  if (event.target.tagName !== 'I') {
    return;
  }

  var resultSelected = event.target.closest('li');
  var animeObjIndex;
  var priorityVal = parseInt(event.target.getAttribute('id'));
  var $arrowsDivSelected = event.target.closest('.up-arrows');
  var $arrowsList = $arrowsDivSelected.querySelectorAll('.fa-arrow-alt-circle-up');
  var list;

  if (data.view === 'watch-list') {
    list = 'watchList';
  } else if (data.view === 'search-results') {
    list = 'searchList';
  }

  for (var i = 0; i < data[list].length; i++) {
    if (data[list][i].mal_id === parseInt(resultSelected.getAttribute('id'))) {
      animeObjIndex = i;
    }
  }

  if (data[list][animeObjIndex].priority > priorityVal) {
    for (var arrowIndex = 0; arrowIndex < $arrowsList.length; arrowIndex++) {
      $arrowsList[arrowIndex].className = 'fas fa-arrow-alt-circle-up';
    }
  }
  for (var arrowFillIndex = 0; arrowFillIndex <= priorityVal; arrowFillIndex++) {
    $arrowsList[arrowFillIndex].className = 'fill-arrow fas fa-arrow-alt-circle-up';
  }
  data[list][animeObjIndex].priority = priorityVal;
  renderWatchList();
}
