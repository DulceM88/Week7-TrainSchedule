// initialize firebase

var config = {
    apiKey: "AIzaSyBwyaW-61FC4AeTVaCy7Fqb6H53i2BrTMc",
    authDomain: "week-7-train-schedule-d53a2.firebaseapp.com",
    databaseURL: "https://week-7-train-schedule-d53a2.firebaseio.com",
    storageBucket: "week-7-train-schedule-d53a2.appspot.com",
    messagingSenderId: "65948969290"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //listener for adding trains
  $("#submitBtn").on("click", function(event){
  	event.preventDefault();
  
  //capture user input and store in variables
  var name = $("#name").val().trim();
  var destination = $("#destination").val().trim();
  var start = $("#start").val().trim();
  var freq = $("#frequency").val().trim();

 
 //create a temporary object to hold our data
   var newTrain = {
    name: name,
    destination: destination,
    start: start,
    frequency: freq
  };
  // upload object to database
  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Clears all text-boxes
  $("#name").val("");
  $("#destination").val("");
  $("#start").val("");
  $("#frequency").val("");

  // Prevents moving to new page
  return false;

 });

  //firebase event that adds new train info to database and html
  database.ref().on("child_added",function(childSnapshot, prevChildKey){
  	console.log(childSnapshot.val());

  	//store snapshots in variables
  	var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var start = childSnapshot.val().start;
    var freq = childSnapshot.val().frequency;

    // Train Info
	  console.log(name);
	  console.log(destination);
	  console.log(start);
	  console.log(freq);

    // next train and minutes away calculations
    //converted start time to 1 year prior
    var firstTimeConverted = moment(start, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    //current time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    //difference between first and current time
    var diffTime = moment().diff(moment(firstTimeConverted),"minutes");
    console.log("DIFFERENCE IN TIME: "+ diffTime);

    //Time apart
    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    //minute until train
    var minNextTrain = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: "+ minNextTrain);

    //Next Train Time

    var hrNextTrain = moment().add(minNextTrain,"minutes");
    var nextArrival= moment(hrNextTrain).format("hh:mm");


 //train data from snapshot added to table
  $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
  freq + "</td><td>" + nextArrival + "</td><td>" + minNextTrain+ "</td></tr>");
  });