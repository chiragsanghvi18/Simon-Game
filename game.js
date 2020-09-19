
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    $("#play").css("display","none");
    
    nextSequence();
    started = true;
  }
});
$("#play").click(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    $("#play").css("display","none");
    
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log(currentLevel);
        console.log(gamePattern+"\n"+userClickedPattern);
        console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");


      startOver();
      $("#play").css("display","block");  
    }

}

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function startOver() {


  level = 0;
  gamePattern = [];
  started = false;
  
}


// Modal Window



window.onload = displayInstruction();

function displayInstruction(){
  $("#myModal").css("display","block");

}
$("#close").click(function(){
  $("#myModal").css("display","none");
})
$(window).click(function(){
  $("#myModal").css("display","none");
})
$(document).keydown(function(e){
  if(e.key==="Escape"){
    $("#myModal").css("display","none");
  }
})
// When the user clicks the button, open the modal 
// btn.click(function(){
//   modal.css("display","block");
// })

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it



