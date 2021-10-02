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
  $divBtnrow.className = 'row margin-top-half';

  var $btn = document.createElement('button');
  if (data.view === 'search-results') {
    $btn.className = 'btn add-btn';
    $btn.textContent = 'ADD';
  } else if (data.view === 'watch-list' || data.view === 'in-progress-list') {
    $btn.className = 'btn remove-btn';
    $btn.textContent = 'REMOVE';
    if (data.view === 'watch-list') {
      var $watchBtn = document.createElement('button');
      $watchBtn.className = 'btn watch-btn';
      $watchBtn.textContent = 'WATCH';
    }
  }

  var $priorityCol = document.createElement('div');
  $priorityCol.className = 'column-half';

  var $btnCol = document.createElement('div');
  $btnCol.className = 'column-half flex justify-end';

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
  $divBtnrow.appendChild($priorityCol);
  $priorityCol.appendChild($priorityDiv);
  $priorityDiv.appendChild($priorityHeader);
  $priorityDiv.appendChild($arrowsDiv);
  $arrowsDiv.appendChild($upArrow);
  $arrowsDiv.appendChild($upArrow2);
  $arrowsDiv.appendChild($upArrow3);
  $arrowsDiv.appendChild($upArrow4);
  $arrowsDiv.appendChild($upArrow5);
  $divBtnrow.appendChild($btnCol);
  if (data.view === 'watch-list') {
    $btnCol.appendChild($watchBtn);
  }
  $btnCol.appendChild($btn);

  return $li;
}

var $searchBar = document.querySelector('.search-bar');
var $searchBtn = document.querySelector('.search-btn');
var $searchBarResults = document.querySelector('.search-bar.results');
var $searchBtnResults = document.querySelector('.search-btn.results');
var $loadBar = document.querySelector('.lds-facebook');
var $noResultsHeader = document.querySelector('.no-results-header');
var $networkErrorHeader = document.querySelector('.network-error-header');

$searchBtn.addEventListener('click', onSearch);
$searchBtnResults.addEventListener('click', resultsOnSearch);
$searchBar.addEventListener('keydown', onSearch);
$searchBarResults.addEventListener('keydown', resultsOnSearch);

function onSearch(event) {
  if (event.code !== 'Enter' && event.target.tagName !== 'I' && event.target.tagName !== 'BUTTON') {
    return;
  }
  event.preventDefault();
  $loadBar.className = 'lds-facebook';
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
    $loadBar.className = 'lds-facebook hidden';
    if (jikanReq.status < 200 || jikanReq.status >= 300) {
      $noResultsHeader.className = 'no-results-header';
    }
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

  jikanReq.addEventListener('error', function () {
    $loadBar.className = 'lds-facebook hidden';
    $networkErrorHeader.className = 'network-error-header text-align-center';
  });
}

function resultsOnSearch(event) {
  if (event.code !== 'Enter' && event.target.tagName !== 'I' && event.target.tagName !== 'BUTTON') {
    return;
  }
  clearResults();
  onSearch(event);
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
  $emptyHeader.className = 'empty-header hidden';
  $noResultsHeader.className = 'no-results-header hidden';
  $networkErrorHeader.className = 'network-error-header text-align-center hidden';
  $inProgressEmptyHeader.className = 'in-progress-empty-header hidden';
  var currDomResults = document.querySelectorAll('.result-list li');
  for (var i = 0; i < currDomResults.length; i++) {
    currDomResults[i].remove();
  }
  var currWatchResults = document.querySelectorAll('.watch-list li');
  for (var j = 0; j < currWatchResults.length; j++) {
    currWatchResults[j].remove();
  }
  var currInProgressResults = document.querySelectorAll('.in-progress-list li');
  for (var k = 0; k < currInProgressResults.length; k++) {
    currInProgressResults[k].remove();
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
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  var resultSelected = event.target.closest('li');
  for (var i = 0; i < data.searchList.length; i++) {
    if (data.searchList[i].mal_id === parseInt(resultSelected.getAttribute('id'))) {
      if (data.searchList[i].priority === undefined) {
        data.searchList[i].priority = null;
        data.searchList.progress = 0;
      }
      data.watchList.push(data.searchList[i]);
    }
  }
  renderAnimeList('watch-list');
}

window.addEventListener('DOMContentLoaded', onDomLoad);

function onDomLoad(event) {
  switchViews(data.view);
  if (data.view === 'search-results') {
    $searchBarResults.value = data.search;
    for (var i = 0; i < data.searchList.length; i++) {
      $results.appendChild(createResult(data.searchList[i]));
    }
  } else if (data.view === 'watch-list' || data.view === 'in-progress-list') {
    renderAnimeList(data.view);
  }
}

var $watchListIcon = document.querySelector('.navbar .fa-list-alt');
var $watchListIconTop = document.querySelector('.navbar-top .fa-list-alt');
var $watchList = document.querySelector('.watch-list');
var $emptyHeader = document.querySelector('.empty-header');
var $inProgressList = document.querySelector('.in-progress-list');
var $inProgressIcon = document.querySelector('.navbar .fa-eye');
var $inProgressIconTop = document.querySelector('.navbar-top .fa-eye');
var $inProgressEmptyHeader = document.querySelector('.in-progress-empty-header');

$watchListIcon.addEventListener('click', renderWatchList);
$watchListIconTop.addEventListener('click', renderWatchList);
$inProgressIcon.addEventListener('click', renderInProgressList);
$inProgressIconTop.addEventListener('click', renderInProgressList);

function renderWatchList(event) {
  if (!event.target.matches('.fa-list-alt') && !event.target.matches('.add-btn')) {
    return;
  }
  renderAnimeList('watch-list');
}

function renderInProgressList(event) {
  if (!event.target.matches('.fa-eye') && !event.target.matches('.fa-arrow-alt-circle-up')) {
    return;
  }
  renderAnimeList('in-progress-list');
}

function renderAnimeList(view) {
  clearResults();
  var dataList;
  var $domList;

  if (view === 'watch-list') {
    switchViews('watch-list');
    dataList = data.watchList;
    $domList = $watchList;
  } else if (view === 'in-progress-list') {
    switchViews('in-progress-list');
    dataList = data.inProgressList;
    $domList = $inProgressList;
  }

  for (var i = 0; i < dataList.length; i++) {
    if (dataList[i].priority === null) {
      $domList.prepend(createResult(dataList[i]));
    }
  }
  for (var priorityRank = 0; priorityRank <= 4; priorityRank++) {
    for (var dataListIndex = 0; dataListIndex < dataList.length; dataListIndex++) {
      if (dataList[dataListIndex].priority === priorityRank) {
        $domList.prepend(createResult(dataList[dataListIndex]));
      }
    }
  }
  if (dataList.length === 0) {
    if (data.view === 'watch-list') {
      $emptyHeader.className = 'empty-header';
    } else if (data.view === 'in-progress-list') {
      $inProgressEmptyHeader.className = 'in-progress-empty-header';
    }
  }
}

$watchList.addEventListener('click', animeListOptions);
$inProgressList.addEventListener('click', animeListOptions);

function animeListOptions(event) {
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  var dataList;
  if (data.view === 'watch-list') {
    dataList = data.watchList;
  } else if (data.view === 'in-progress-list') {
    dataList = data.inProgressList;
  }
  var resultSelected = event.target.closest('li');
  for (var i = 0; i < dataList.length; i++) {
    if (dataList[i].mal_id === parseInt(resultSelected.getAttribute('id'))) {
      if (event.target.matches('.watch-btn')) {
        data.inProgressList.push(dataList[i]);
      }
      resultSelected.remove();
      dataList.splice(i, 1);
    }
  }
  if (dataList.length === 0) {
    if (data.view === 'watch-list') {
      $emptyHeader.className = 'empty-header';
    } else if (data.view === 'in-progress-list') {
      $inProgressEmptyHeader.className = 'in-progress-empty-header';
    }
  }
}

var $resultList = document.querySelector('.result-list');
$resultList.addEventListener('click', setPriority);
$watchList.addEventListener('click', adjustPriority);
$inProgressList.addEventListener('click', adjustPriority);

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
  } else if (data.view === 'in-progress-list') {
    list = 'inProgressList';
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
}

function adjustPriority(event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  setPriority(event);
  renderAnimeList(data.view);
}
