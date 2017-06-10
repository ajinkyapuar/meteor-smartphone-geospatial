import { Meteor } from 'meteor/meteor';

// Meteor.startup(() => {
//   // code to run on server at startup
// });

Meteor.startup(function() {
  if (Smartphones.find().count() === 0) {
    var smartphoneFixtures = JSON.parse(Assets.getText('fixtures/smartphones.json'));

    _.each(smartphoneFixtures, function(smartphone) {
      Smartphones.insert(smartphone);
    });
  }
});
