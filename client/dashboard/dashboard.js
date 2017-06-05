import { Template } from 'meteor/templating';

Template.dashboard.onRendered(function() {
  L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images/';
  // L.tileLayer.provider('Stamen.Watercolor').addTo(map);
  var map = L.map('map');
});
