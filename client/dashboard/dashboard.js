import { Template } from 'meteor/templating';

// Subscription handle used in various Template functions.
var handle;
// The Leaflet marker layers related to restaurants.
var layers = {};
// Default map bounds which encompass Manhattan.
var BOX = {
  sw: {
    lat: 40.68818804944925,
    lon: -74.05574798583986
  },
  ne: {
    lat: 40.81822635589172,
    lon: -73.88408660888673
  }
};

var subscribeWithBounds = function(template, e) {
  // Manually stop subscription if it exists.
  if (handle) {
    handle.stop();
  }

  // Subscribe to all restaurants currently displayed on the map.
  handle = template.subscribe('smartphones', getMapBounds(e));
  // console.log(handle);
};

Template.dashboard.onCreated(function() {
  var template = this;

  handle = template.subscribe('smartphones', BOX);

  template.smartphones = function() {
    // Always return all documents from the collection. Because minimongo
    // doesn't support $geoWithin we cannot use client side filtering.
    return Smartphones.find({}, {sort: {name: 1}});
  };
});

Template.dashboard.onRendered(function() {
  var template = this;

  // Use Leaflet images from bevanhunt:leaflet.
  L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images/';

  // Render map with default bounds.
  var map = L.map('map');

  map.on('load', function(e) {
    subscribeWithBounds(template, e);
  });

  map.fitBounds([
    [BOX.sw.lat, BOX.sw.lon], [BOX.ne.lat, BOX.ne.lon]
  ]);

  // Use tiles from the Standard tile layer of OpenStreetMap.
  // L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   detectRetina: true
  // }).addTo(map);

  L.tileLayer.provider('Stamen.Toner').addTo(map);

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

  // Leaflet event listener for `moveend` event, which is triggered after the
  // map was dragged or zoomed.
  map.on('moveend', function(e) {
    subscribeWithBounds(template, e);
  });

  template.smartphones().observeChanges({
    added: function(id, smartphone) {
      var marker = L.marker([
        smartphone.location.coordinates[1],
        smartphone.location.coordinates[0],
      ]);
      marker.smartphone = smartphone;
      marker.smartphone._id = id;
      // marker.on('click', function(e) {
      //   handleMarkerClick(e);
      // });
      marker.addTo(map);
      layers[id] = marker;
    },
    // removed: function(id) {
    //   map.removeLayer(layers[id]);
    //   delete layers[id];
    // }
  });
});

Template.dashboard.helpers({
  smartphones: function() {
    // var template = Template.instance();
    // return template.restaurants();
    return Template.instance().smartphones();
  },
  listIsEmpty: function() {
    // var template = Template.instance();
    // return (template.restaurants().count() === 0 && handle.ready());
    return (Template.instance().smartphones.count() === 0 && handle.ready());
  }
});

Template.dashboard.events({
  "submit #newLocation"(event, instance){
    event.preventDefault();
    // console.log("new location");
    if(!event.target.latitude.value || !event.target.longitude.value)
      return Materialize.toast('Both fields required!', 5000);

    // console.log("Lat : " + event.target.latitude.value);
    // console.log("Lon : " + event.target.longitude.value);

    Meteor.call("Smartphones.insert", event.target.latitude.value, event.target.latitude.value, function (err, res) {
      console.log(err);
      console.log(res);

    })
  }


});
