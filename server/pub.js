import { Meteor } from 'meteor/meteor';

Meteor.publish('smartphones', function(box) {
  // console.log(box);
  check(box, {
    sw: {
      lat: Number,
      lon: Number
    },
    ne: {
      lat: Number,
      lon: Number
    }
  });

  return Smartphones.find({
    location: {
      $geoWithin: {
        $box: [
          [box.sw.lon, box.sw.lat],
          [box.ne.lon, box.ne.lat]
        ]
      }
    }
  });
});
