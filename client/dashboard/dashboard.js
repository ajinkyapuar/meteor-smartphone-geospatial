import { Template } from 'meteor/templating';

Template.dashboard.onRendered(function() {
  L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images/';
  var map = L.map('map');
  L.tileLayer.provider('Stamen.Watercolor').addTo(map);
  
//   var CartoDB_DarkMatterNoLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
// 	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
// 	subdomains: 'abcd',
// 	maxZoom: 19
// });

//   var Stamen_Toner = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
// 	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// 	subdomains: 'abcd',
// 	minZoom: 0,
// 	maxZoom: 20,
// 	ext: 'png'
// });
});
