## Week7-TrainSchedule

## Live Link: 

https://dulcem88.github.io/Week7-TrainSchedule/


## App Description

This application lists Train names and departure times based on the users input. Any user can enter data into the
application and that data is listed and visible for all users to see. The app captures the train name, destination, start time, and frequency and then calculates and displays the name, destination, next arrival time and minutes away.

## Requirements

- Code this app to calculate when the next train will arrive; this should be relative to the current time.
- Users from many different machines must be able to view same train times.

## Technologies Used

- momentJs library for determining train arrival times
- firebase for database to store user input 
- jQuery in order to dynamically add elements such as new trains into html

## Code Explanation

- This application captures input from the user via event listener and stores that data as an object onto a database. the information is appended to the database and also to the html using the "child_added" method and "snapshot" is used to capture the information and store it into a variable.

Example : 
	// refrence database when child added
    database.ref().on("child_added",function(childSnapshot, prevChildKey){
  	console.log(childSnapshot.val());

  	//store snapshots in variables
	  	var name = childSnapshot.val().name;
	    var destination = childSnapshot.val().destination;
	    var start = childSnapshot.val().start;
	    var freq = childSnapshot.val().frequency;

In order to determine the arrival times for the trains the "moment" method is utilized.
	    //current time
	    var currentTime = moment();
	    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

Calculations to determine a few other variables such as difference between first and current time and time apart are calculated and declared in order to determine the  minutes until the next train and the exact time of the next train arrival.

	- var minNextTrain = freq - tRemainder;
	- var nextArrival= moment(hrNextTrain).format("hh:mm");

The minutes and exact time are then appended to table body in html dynamically via jQuery.