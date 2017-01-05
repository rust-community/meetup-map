'use strict';
var map;
var table = document.querySelector('#list tbody');

document.addEventListener("DOMContentLoaded", function (event) {
  create_map();
});

function create_map() {
  window.map = window.L.map('map', {
    center: [20.0, 5.0],
    minZoom: 2,
    zoom: 2
  });
  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> contributors'
  }).addTo(window.map);
  add_meetups();
}

function add_meetups() {
  window.fetch('meetups.json')
  .then(function (response) {
    return response.json();
  }).then(function (json) {
    var meetups = json.meetups;
    document.querySelector('.counter').innerHTML = meetups.length + ' ';
    for (var i = 0; i < meetups.length; ++i) {
      //add marker
      var popup = '<a href="' + meetups[i].url + '" target="_blank">' + meetups[i].name + '</a>';
      popup += '<br>' + meetups[i].location;
      window.L.marker([meetups[i].lat, meetups[i].lng])
      .bindPopup(popup)
      .addTo(window.map);
      //populate list
      var rowCount = window.table.rows.length;
      var row = window.table.insertRow(rowCount);
      var cell1 = row.insertCell(0);
      cell1.innerHTML = '<a href="' + meetups[i].url + '" target="_blank">' + meetups[i].name + '</a>';
      var cell2 = row.insertCell(1);
      cell2.innerHTML = meetups[i].location;
    }
    document.querySelector('#list thead td').click();
  });
}
