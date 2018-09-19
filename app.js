// Initialize Firebase
var config = {
  apiKey: "AIzaSyCS381O2YES_uzCKYifPlCk-KlozT9emis",
  authDomain: "bootcamptrainscheduler.firebaseapp.com",
  databaseURL: "https://bootcamptrainscheduler.firebaseio.com",
  projectId: "bootcamptrainscheduler",
  storageBucket: "bootcamptrainscheduler.appspot.com",
  messagingSenderId: "16170165991"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input")
    .val()
    .trim();
  var destination = $("#destination-input")
    .val()
    .trim();
  var firstTrain = moment(
    $("#time-input")
      .val()
      .trim(),
    "HH:mm"
  ).format("hh:mm a");
  var freq = $("#rate-input")
    .val()
    .trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    train: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: freq
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#rate-input").val("");
});

//Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  // Store everything into a variable.
  var trainName = childSnapshot.val().train;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var freq = childSnapshot.val().frequency;

  // Prettify the train start
  var trainStartPretty = moment.unix(firstTrain).format("hh:mm");

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

  // Current Time
  var currentTime = moment();

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  // Time apart (remainder)
  var tRemainder = diffTime % freq;

  // Minute Until Train
  var tMinutesTillTrain = freq - tRemainder;

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  //

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(freq),
    $("<td>").text(moment(nextTrain).format("hh:mm")),
    $("<td>").text(tMinutesTillTrain)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
