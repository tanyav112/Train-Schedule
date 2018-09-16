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

$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

// Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#time-input").val().trim(),"HH:mm").format("hh:mm a");
  var freq = $("#rate-input").val().trim();

// Creates local "temporary" object for holding train data
  var newTrain = {
    train: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: freq
  };

// Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.train);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#rate-input").val("");
});