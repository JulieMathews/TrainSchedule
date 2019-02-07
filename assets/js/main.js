// Initialize Firebase
var config = {
    apiKey: "AIzaSyDc7X19jwKlT21d4bNXaTRJhFjp8mSuytY",
    authDomain: "trainschedule-401e9.firebaseapp.com",
    databaseURL: "https://trainschedule-401e9.firebaseio.com",
    projectId: "trainschedule-401e9",
    storageBucket: "",
    messagingSenderId: "672540979558"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

//button
$("#btn").on("click", function(event) {
    event.preventDefault();
    trainStatName = $("#formName").val();
    trainStatDest = $("#formDest").val().trim();
    firstTrain = $("#formTime").val().trim();
    minStatFreq = $("#formFreq").val().trim();
    // nextStatArriv = $("#tMinutesTillTrain").val().trim();
    var newTrain = {
        name: trainStatName,
        destination: trainStatDest,
        booger: firstTrain,
        frequency: minStatFreq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    dataRef.ref().push(newTrain);
});

// console.log(moment().format(" HH:mm ")); --military time is HH

//holds trains


 // frequency
 var tFrequency = "";

 // first train
 var firstTime = "";

 // First Time (pushed back 1 year to make sure it comes before current time)
 var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
 console.log(firstTimeConverted);

 // Current Time
 var currentTime = moment();
 console.log("Current Time: " + moment(currentTime).format("HH:mm"));

 // Difference between the times
 var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
 // console.log("Difference in Time: " + diffTime);

 // Time apart (remainder)
 var tRemainder = diffTime % tFrequency;
 console.log(tRemainder);

 // Minute Until Train
 var tMinutesTillTrain = tFrequency - tRemainder;
 console.log("Minutes Until Train: " + tMinutesTillTrain);

 // Next Train
 var nextTrain = moment().add(tMinutesTillTrain, "minutes");
 console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

// vars
var trainName = $("#formName").val().trim();  //name of the trains
var trainDest = $("#formDest").val().trim(); //name of destination
var firstTrain = moment($("#formTime").val(), "HH:mm").format("X"); //arrives at time
var minFreq = $("#formFreq").val().trim(); //arrives every __ mins afterwards
//var nextArriv = $("#catchTrain").val().trim(); //next train arrives in ____ (firstTrain + minFreq = )
//var minAway = $("#tMinutesTillTrain").val().trim(); // (firstTrain + minFreq) (nextArriv - current time = )

// logs trains to console
// console.log(newTrain);

// clears form
    $("#formName").val("");
	$("#formDest").val("");
	$("#formTime").val("");
	$("#formFreq").val("");

// button click

dataRef.ref().on("child_added", function(childSnapshot) {

// Log everything that's coming out of snapshot
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().frequency);
  console.log(childSnapshot.val().booger);
});

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    /*
    booger: "1111"
dateAdded: 1549088059668
destination: "akds ;"
frequency: "11"
name: "bob"
*/
    // Change the HTML to reflect
  $("#trainName").text(snapshot.val().name);
  $("#trainDest").text(snapshot.val().destination);
  // $("#firstTrain").text(snapshot.val().booger); // HERE
  $("#minFreq").text(snapshot.val().minFreq);
  $("#nextArriv").text(snapshot.val().nextArriv);
  $("#minAway").text(snapshot.val().minAway);
});

dataRef.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot);
    var newTrain = childSnapshot.val().trainName;
    var newLocation = childSnapshot.val().trainDest;
    var newFirstTrain = childSnapshot.val().firstTrain;
    var newFreq = childSnapshot.val().frequency;

    var startTimeConverted = moment(newFirstTrain, "HH:mm");

    // Current Time
    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % newFreq;

    // Minute(s) Until Train
    var tMinutesTillTrain = newFreq - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var catchTrain = moment(nextTrain).format("HH:mm");

    // Display On Page
    console.log('executing');
    $("#currentTrain table tbody").append(
      ' <tr>  <td>' + nextTrain +
      ' </td>  <td>' + newLocation +
      ' </td>  <td>' + newFreq +
      ' </td>  <td>' + catchTrain +
      ' </td>  <td>' + tMinutesTillTrain + ' </td>  </tr>');
});