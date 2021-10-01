/* exported data */
var data = {
  view: 'search-page',
  watchList: [],
  searchList: [],
  inProgressList: [],
  search: ''
};

var previousDataObj = localStorage.getItem('local-data-object');

if (previousDataObj !== null) {
  var previousData = JSON.parse(previousDataObj);
  data = previousData;
}

function unload(event) {
  var dataObjJSON = JSON.stringify(data);
  localStorage.setItem('local-data-object', dataObjJSON);
}

window.addEventListener('beforeunload', unload);
