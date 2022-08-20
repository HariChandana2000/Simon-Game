var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gamePatterLevel = 0;
var userStartIndex = 0;
var started = false;
var level = 0;

// Keyboard Press
$(document).keypress(function () {
  if(!started){
    $("#level-title").text("Level " + level);
    started = true;
    nextSequence();
  }
});

// User Actions
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel){

  console.log("gamePatterLevel: " + gamePatterLevel);

  if(userClickedPattern[currentLevel] === gamePattern[gamePatterLevel]){
    console.log("success");
    gamePatterLevel++;

    if(gamePattern.length === userClickedPattern.slice(userStartIndex, currentLevel+1).length){
      gamePatterLevel = 0;
      userStartIndex = currentLevel + 1;
      console.log(gamePattern);
      console.log(userClickedPattern);
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }

  else {
    console.log("wrong");
    var audio = new Audio("sounds\\wrong.mp3");
    audio.play();

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}


function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}


function nextSequence() {
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(randomChosenColour);

  // Animations
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {
  // Playing Sounds
  var soundPath = "sounds\\" + name + ".mp3";
  var audio = new Audio(soundPath);
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
