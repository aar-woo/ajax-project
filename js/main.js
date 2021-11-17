const $results = document.querySelector('.result-list');

function createResult(animeObj) {
  const $li = document.createElement('li');
  $li.className = 'anime-card align-items-center';
  $li.setAttribute('id', animeObj.mal_id);

  const $divRow = document.createElement('div');
  $divRow.className = 'row width-100';

  const $img = document.createElement('img');
  $img.setAttribute('src', animeObj.image_url);
  $img.className = 'img';

  const $textCard = document.createElement('div');
  $textCard.className = 'text-card';

  const $titleHeader = document.createElement('h6');
  $titleHeader.className = 'margin-0 margin-left-half';
  $titleHeader.textContent = 'Title:';

  const $title = document.createElement('p');
  $title.className = 'margin-0 indent';
  $title.textContent = animeObj.title;

  const $titleVector = document.createElement('div');
  $titleVector.className = 'vector-div title-vector flex align-items-center';

  const $infoHeader = document.createElement('h6');
  $infoHeader.className = 'margin-0';

  const $infoVector = document.createElement('div');
  $infoVector.className = 'vector-div info-vector flex align-items-center margin-top-1';

  const $divBtnrow = document.createElement('div');
  $divBtnrow.className = 'row margin-top-half';
  if (data.view === 'in-progress-list') {
    $divBtnrow.className = 'row margin-top-half justify-between align-items-center';
  }

  const $btn = document.createElement('button');
  if (data.view === 'search-results') {
    $btn.className = 'btn add-btn';
    $btn.textContent = 'ADD';
  } else if (data.view === 'watch-list' || data.view === 'in-progress-list') {
    $btn.className = 'btn remove-btn min-height-25';
    $btn.textContent = 'REMOVE';
  }

  const $priorityCol = document.createElement('div');
  $priorityCol.className = 'column-half';

  const $btnCol = document.createElement('div');
  $btnCol.className = 'column-half flex justify-end';

  const $priorityDiv = document.createElement('div');
  $priorityDiv.className = 'flex align-items-center';

  const $priorityHeader = document.createElement('h3');
  $priorityHeader.className = 'margin-0';
  $priorityHeader.textContent = 'Priority';

  const $arrowsDiv = document.createElement('div');
  $arrowsDiv.className = 'up-arrows flex padding-lr-third align-items-center';

  const arrowsList = [];

  const $upArrow = document.createElement('i');
  $upArrow.className = 'fas fa-arrow-alt-circle-up';
  $upArrow.setAttribute('id', 0);
  arrowsList.push($upArrow);

  const $upArrow2 = document.createElement('i');
  $upArrow2.className = 'fas fa-arrow-alt-circle-up';
  $upArrow2.setAttribute('id', 1);
  arrowsList.push($upArrow2);

  const $upArrow3 = document.createElement('i');
  $upArrow3.className = 'fas fa-arrow-alt-circle-up';
  $upArrow3.setAttribute('id', 2);
  arrowsList.push($upArrow3);

  const $upArrow4 = document.createElement('i');
  $upArrow4.className = 'fas fa-arrow-alt-circle-up';
  $upArrow4.setAttribute('id', 3);
  arrowsList.push($upArrow4);

  const $upArrow5 = document.createElement('i');
  $upArrow5.className = 'fas fa-arrow-alt-circle-up';
  $upArrow5.setAttribute('id', 4);
  arrowsList.push($upArrow5);

  if (animeObj.priority !== null) {
    for (let arrowFillIndex = 0; arrowFillIndex <= animeObj.priority; arrowFillIndex++) {
      arrowsList[arrowFillIndex].className = 'fill-arrow fas fa-arrow-alt-circle-up';
    }
  }

  $li.appendChild($divRow);
  $divRow.appendChild($img);
  $divRow.appendChild($textCard);
  $textCard.appendChild($titleVector);
  $titleVector.appendChild($titleHeader);
  $textCard.appendChild($title);
  $textCard.appendChild($infoVector);
  $infoVector.appendChild($infoHeader);
  if (data.view === 'in-progress-list') {
    $infoHeader.textContent = 'Episodes:';
    const $episodesRow = document.createElement('div');
    $episodesRow.className = 'row width-100';
    const $watchedCol = document.createElement('div');
    $watchedCol.className = 'column-half flex wrap justify-center margin-top-half';
    const $watchedHeader = document.createElement('h6');
    $watchedHeader.className = 'number-header';
    $watchedHeader.textContent = 'Watched';
    const $watchedNumRow = document.createElement('div');
    $watchedNumRow.className = 'row width-100 justify-center';
    const $watchedNumCard = document.createElement('div');
    $watchedNumCard.className = 'number-card flex justify-center align-items-center';
    const $watchedNum = document.createElement('h3');
    $watchedNum.className = 'margin-0';
    $watchedNum.textContent = animeObj.progress;
    const $totalCol = document.createElement('div');
    $totalCol.className = 'column-half flex wrap justify-center margin-top-half';
    const $totalHeader = document.createElement('h6');
    $totalHeader.className = 'number-header';
    $totalHeader.textContent = 'Total';
    const $totalNumRow = document.createElement('div');
    $totalNumRow.className = 'row width-100 justify-center';
    const $totalNumCard = document.createElement('div');
    $totalNumCard.className = 'number-card flex justify-center align-items-center';
    const $totalNum = document.createElement('h3');
    $totalNum.className = 'margin-0';
    $totalNum.textContent = animeObj.episodes;
    const $episodeBtnRow = document.createElement('div');
    $episodeBtnRow.className = 'row width-100';
    const $episodeBtnHalfDiv = document.createElement('div');
    $episodeBtnHalfDiv.className = 'width-50 flex justify-center';
    const $episodeBtnDiv = document.createElement('div');
    $episodeBtnDiv.className = 'ep-btn-div flex margin-top-half justify-center';
    const $decBtn = document.createElement('button');
    $decBtn.className = 'dec-btn ep-btn';
    $decBtn.textContent = '-';
    const $incBtn = document.createElement('button');
    $incBtn.className = 'inc-btn ep-btn';
    $incBtn.textContent = '+';
    const $progressBar = document.createElement('div');
    $progressBar.className = 'progress-bar';
    const $progressBarFill = document.createElement('div');
    $progressBarFill.className = 'progress-bar-fill';
    const currProgress = animeObj.progress * (100 / animeObj.episodes);
    const progressFill = `width:${currProgress}%`;

    $progressBarFill.setAttribute('style', progressFill);
    $textCard.appendChild($episodesRow);
    $episodesRow.appendChild($watchedCol);
    $watchedCol.appendChild($watchedHeader);
    $watchedCol.appendChild($watchedNumRow);
    $watchedNumRow.appendChild($watchedNumCard);
    $watchedNumCard.appendChild($watchedNum);
    $episodesRow.appendChild($totalCol);
    $totalCol.appendChild($totalHeader);
    $totalCol.appendChild($totalNumRow);
    $totalNumRow.appendChild($totalNumCard);
    $totalNumCard.appendChild($totalNum);
    $textCard.appendChild($episodeBtnRow);
    $episodeBtnRow.appendChild($episodeBtnHalfDiv);
    $episodeBtnHalfDiv.appendChild($episodeBtnDiv);
    $episodeBtnDiv.appendChild($decBtn);
    $episodeBtnDiv.appendChild($incBtn);

    $divBtnrow.appendChild($progressBar);
    $progressBar.appendChild($progressBarFill);
    $divBtnrow.appendChild($btn);
  } else {
    $infoHeader.textContent = 'Synopsis:';
    const $synopsis = document.createElement('p');
    $synopsis.className = 'margin-0 indent';
    $synopsis.textContent = animeObj.synopsis;
    $textCard.appendChild($synopsis);

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
      const $watchBtn = document.createElement('button');
      $watchBtn.className = 'btn watch-btn';
      $watchBtn.textContent = 'WATCHING';
      $btnCol.appendChild($watchBtn);
    }
    $btnCol.appendChild($btn);
  }
  $li.appendChild($divBtnrow);
  return $li;
}

const $searchBar = document.querySelector('.search-bar');
const $searchBtn = document.querySelector('.search-btn');
const $searchBarResults = document.querySelector('.search-bar.results');
const $searchBtnResults = document.querySelector('.search-btn.results');
const $loadBar = document.querySelector('.lds-facebook');
const $noResultsHeader = document.querySelector('.no-results-header');
const $networkErrorHeader = document.querySelector('.network-error-header');

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
  let searchBar;
  if (data.view === 'search-page') {
    searchBar = $searchBar;
  } else {
    searchBar = $searchBarResults;
  }
  data.search = searchBar.value;

  const jikanReq = new XMLHttpRequest();
  jikanReq.open('GET', 'https://api.jikan.moe/v3/search/anime?q=' + data.search);
  jikanReq.responseType = 'json';
  jikanReq.addEventListener('load', function () {
    $loadBar.className = 'lds-facebook hidden';
    if (jikanReq.status < 200 || jikanReq.status >= 300) {
      $noResultsHeader.className = 'no-results-header';
    }
    const searchList = jikanReq.response.results;
    for (let result = 0; result < 10; result++) {
      const searchResult = createResult(searchList[result]);
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

const $views = document.querySelectorAll('.view');

function switchViews(view) {
  for (let i = 0; i < $views.length; i++) {
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
  const currDomResults = document.querySelectorAll('.result-list li');
  for (let i = 0; i < currDomResults.length; i++) {
    currDomResults[i].remove();
  }
  const currWatchResults = document.querySelectorAll('.watch-list li');
  for (let j = 0; j < currWatchResults.length; j++) {
    currWatchResults[j].remove();
  }
  const currInProgressResults = document.querySelectorAll('.in-progress-list li');
  for (let k = 0; k < currInProgressResults.length; k++) {
    currInProgressResults[k].remove();
  }
}

const $searchIcon = document.querySelector('.navbar .fa-search');
const $searchIconTop = document.querySelector('.navbar-top .fa-search');

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
  const resultSelected = event.target.closest('li');
  for (let i = 0; i < data.searchList.length; i++) {
    if (data.searchList[i].mal_id === parseInt(resultSelected.getAttribute('id'))) {
      data.searchList[i].progress = 0;
      if (data.searchList[i].priority === undefined) {
        data.searchList[i].priority = null;
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
    for (let i = 0; i < data.searchList.length; i++) {
      $results.appendChild(createResult(data.searchList[i]));
    }
  } else if (data.view === 'watch-list' || data.view === 'in-progress-list') {
    renderAnimeList(data.view);
  }
}

const $watchListIcon = document.querySelector('.navbar .fa-list-alt');
const $watchListIconTop = document.querySelector('.navbar-top .fa-list-alt');
const $watchList = document.querySelector('.watch-list');
const $emptyHeader = document.querySelector('.empty-header');
const $inProgressList = document.querySelector('.in-progress-list');
const $inProgressIcon = document.querySelector('.navbar .fa-eye');
const $inProgressIconTop = document.querySelector('.navbar-top .fa-eye');
const $inProgressEmptyHeader = document.querySelector('.in-progress-empty-header');

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
  let dataList;
  let $domList;

  if (view === 'watch-list') {
    switchViews('watch-list');
    dataList = data.watchList;
    $domList = $watchList;
  } else if (view === 'in-progress-list') {
    switchViews('in-progress-list');
    dataList = data.inProgressList;
    $domList = $inProgressList;
  }

  for (let i = 0; i < dataList.length; i++) {
    if (dataList[i].priority === null) {
      $domList.prepend(createResult(dataList[i]));
    }
  }
  for (let priorityRank = 0; priorityRank <= 4; priorityRank++) {
    for (let dataListIndex = 0; dataListIndex < dataList.length; dataListIndex++) {
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
  let dataList;
  if (data.view === 'watch-list') {
    dataList = data.watchList;
  } else if (data.view === 'in-progress-list') {
    dataList = data.inProgressList;
  }
  const resultSelected = event.target.closest('li');
  for (let i = 0; i < dataList.length; i++) {
    if (dataList[i].mal_id === parseInt(resultSelected.getAttribute('id'))) {
      if (event.target.matches('.watch-btn')) {
        data.inProgressList.push(dataList[i]);
        resultSelected.remove();
        dataList.splice(i, 1);
      } else if (event.target.matches('.remove-btn')) {
        resultSelected.remove();
        dataList.splice(i, 1);
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

const $resultList = document.querySelector('.result-list');
$resultList.addEventListener('click', setPriority);
$watchList.addEventListener('click', adjustPriority);

function setPriority(event) {
  if (event.target.tagName !== 'I') {
    return;
  }

  const resultSelected = event.target.closest('li');
  const priorityVal = parseInt(event.target.getAttribute('id'));
  const $arrowsDivSelected = event.target.closest('.up-arrows');
  const $arrowsList = $arrowsDivSelected.querySelectorAll('.fa-arrow-alt-circle-up');
  let animeObjIndex;
  let list;

  if (data.view === 'watch-list') {
    list = 'watchList';
  } else if (data.view === 'search-results') {
    list = 'searchList';
  } else if (data.view === 'in-progress-list') {
    list = 'inProgressList';
  }

  for (let i = 0; i < data[list].length; i++) {
    if (data[list][i].mal_id === parseInt(resultSelected.getAttribute('id'))) {
      animeObjIndex = i;
    }
  }

  if (data[list][animeObjIndex].priority > priorityVal) {
    for (let arrowIndex = 0; arrowIndex < $arrowsList.length; arrowIndex++) {
      $arrowsList[arrowIndex].className = 'fas fa-arrow-alt-circle-up';
    }
  }
  for (let arrowFillIndex = 0; arrowFillIndex <= priorityVal; arrowFillIndex++) {
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

$inProgressList.addEventListener('click', updateProgress);

function updateProgress(event) {
  if (!event.target.matches('.inc-btn') && !event.target.matches('.dec-btn')) {
    return;
  }
  const resultSelected = event.target.closest('li');
  const $watchedNum = resultSelected.querySelector('.number-card > h3');
  const $progressFill = resultSelected.querySelector('.progress-bar-fill');
  let currProgress = parseFloat($progressFill.style.width);
  let animeObj;
  for (let i = 0; i < data.inProgressList.length; i++) {
    if (data.inProgressList[i].mal_id === parseInt(resultSelected.getAttribute('id'))) {
      animeObj = data.inProgressList[i];
    }
  }
  const incrementVal = 100 / animeObj.episodes;
  if (event.target.matches('.inc-btn')) {
    animeObj.progress++;
    currProgress += incrementVal;
    if (animeObj.progress > animeObj.episodes) {
      animeObj.progress = animeObj.episodes;
      currProgress = 100;
    }
  } else if (event.target.matches('.dec-btn')) {
    animeObj.progress--;
    currProgress -= incrementVal;
    if (animeObj.progress <= 0) {
      animeObj.progress = 0;
      currProgress = 0;
    }
    $watchedNum.textContent = animeObj.progress;
  }
  $watchedNum.textContent = animeObj.progress;
  $progressFill.style.width = currProgress + '%';
}
