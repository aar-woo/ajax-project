/*
<li class="anime-card flex align-items-center">
  <img src="images/fmab.jpeg" class="img">
  <div class="text-card">
    <h5 class="margin-0">Title:</h5>
    <p class="margin-0">Naruto</p>
    <h5 class="margin-top-half">Synopsis:</h5>
    <p class="margin-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed possimus dignissimos vero reiciendis cumque eligendi dicta doloribus? Veritatis incidunt illum distinctio natus nemo.</p>
  </div>
</li>
*/

// const { Linter } = require('eslint');

var $results = document.querySelector('.result-list');

function createResult(animeObj) {
  var $li = document.createElement('li');
  $li.className = 'anime-card flex align-items-center';

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

  $li.appendChild($img);
  $li.appendChild($textCard);
  $textCard.appendChild($titleHeader);
  $textCard.appendChild($title);
  $textCard.appendChild($synopsisHeader);
  $textCard.appendChild($synopsis);

  return $li;
}

var $searchBar = document.querySelector('.searchBar');
var $searchBtn = document.querySelector('.search-btn');
// var $searchBarResults = document.querySelector('.searchBar.results');
// var $searchBtnResults = document.querySelector('.search-btn.results');

$searchBtn.addEventListener('click', onSearch);

function onSearch(event) {
  var searchVal = $searchBar.value;
  var jikanReq = new XMLHttpRequest();
  jikanReq.open('GET', 'https://api.jikan.moe/v3/search/anime?q=' + searchVal);
  jikanReq.responseType = 'json';
  jikanReq.addEventListener('load', function () {
    var searchList = jikanReq.response.results;
    for (var result = 0; result < 5; result++) {
      var searchResult = createResult(searchList[result]);
      $results.appendChild(searchResult);
    }
  });
  jikanReq.send();
  switchViews('search-results');
}

var $views = document.querySelectorAll('.view');

function switchViews(view) {
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === view) {
      $views[i].className = 'view';
    } else {
      $views[i].className = 'view hidden';
    }
  }
}
