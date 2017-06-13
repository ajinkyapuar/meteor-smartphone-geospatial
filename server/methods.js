import { Meteor } from 'meteor/meteor';

Meteor.methods({
  "Smartphones.insert"(latitude, longitude){
    if(!latitude && !longitude){
      throw new Meteor.Error(406, "Not Acceptable!", "Latitude & Longitude values required.")
    }
    else {
      console.log("Co-ordinates: " + "\nLatitude: " + latitude + "\nLongitude: " + longitude);
      // console.log(coordinates.length);
      var location = {};
      location.coordinates = [latitude, longitude];
      location.createdAt = new Date();
      location.userId = this.userId;

      Smartphones._ensureIndex({
        'location.coordinates': '2dsphere'
      });
      console.log(location);


      // 	//Store to DB
      // 	if(newMenus.length == 0)
      // 		throw new Meteor.Error(406, "Not Acceptable", "At least one menu is required.")
      // 	return Restaurants.update({_id: _user.profile.restaurantId}, {$set: {menus: newMenus}});
      // } else {
      // 	throw new Meteor.Error(401, "Unauthorized Access!", "Please make sure you are logged in before using this function.");
      return true
    }
  }
})
