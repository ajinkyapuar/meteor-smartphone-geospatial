import { Meteor } from 'meteor/meteor';

Meteor.methods({
	"Smartphones.insert"(lat, lon){
    console.log("Lat" + lat);
    console.log("Lon" + lon);

		// 	//Store to DB
		// 	if(newMenus.length == 0)
		// 		throw new Meteor.Error(406, "Not Acceptable", "At least one menu is required.")
		// 	return Restaurants.update({_id: _user.profile.restaurantId}, {$set: {menus: newMenus}});
		// } else {
		// 	throw new Meteor.Error(401, "Unauthorized Access!", "Please make sure you are logged in before using this function.");

	}
})
