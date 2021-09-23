/* exported data */
var data = {
  view: 'search-page',
  watchList: [],
  searchList: []
};

var previousDataObj = localStorage.getItem('local-data-object');

if (previousDataObj.watchList !== null) {
  var previousData = JSON.parse(previousDataObj);
  data = previousData;
}

function unload(event) {
  var dataObjJSON = JSON.stringify(data);
  localStorage.setItem('local-data-object', dataObjJSON);
}

window.addEventListener('beforeunload', unload);
