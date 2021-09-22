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

var exampleObj = {
  image_url: 'https://cdn.myanimelist.net/images/anime/11/33657.jpg',
  title: 'Hunter x Hunter',
  synopsis: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed possimus dignissimos vero reiciendis cumque eligendi dicta doloribus? Veritatis incidunt illum distinctio natus nemo.'
};

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

$results.appendChild(createResult(exampleObj));
