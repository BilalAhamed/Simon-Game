var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
let level=0;
var gameStart=true;

// Game Starting Function 
function nextSequence() {
  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  // var to choose random number
  var randomNumber = Math.floor(Math.random() * 4);
  // var to choose color according to randome number
  var randomChosenColour = buttonColours[randomNumber];
  // pushing choosen color to array
  gamePattern.push(randomChosenColour);
  //funtion to create fade in and fade out effect first time
  var ranColorId = $("#" + randomChosenColour);

  ranColorId.fadeIn(100).fadeOut(100).fadeIn(100);
  // calling sound first time
  playSound(randomChosenColour);
  // increse level when nextSequence is called
  $("h1").text("Level " + level);
  level++;
  // console.log(level);
}



// button action 

$('.btn').on("click", e => {
  if(!gameStart){

    var userChosenColour = e.target.id;
    // pushing user choosen color to array
    userClickedPattern.push(userChosenColour);
    // play sound on user click 
    playSound(userChosenColour);
    var currentColour = $("#" + userChosenColour);
    // show animation on user click 
    animatePress(currentColour);

    // calling checkAnswer
    checkAnswer(userClickedPattern.length-1)

  }
});



// animation function 
function animatePress(currentColour) {
  // adding pressed class which have their own styling 
  currentColour.addClass('pressed')
  // remove pressd class after 100 milisecond
  setTimeout(() => {
    currentColour.removeClass("pressed");
  }, 100);
}



//starting game by pressing any key
var flag=false;

$(document).on('keypress',()=>{
  if(!flag){
    setTimeout(() => {
      $("h1").text("Level " + level);
      nextSequence();
      flag=true;
      gameStart=false;
    }, 500);
  }
})




// play sound of related button 
function playSound(name) {
  var audio = new Audio('./sounds/'+name+'.mp3');
  // console.log(audio);
  audio.play();
}

// check answer 
function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

    // console.log('success');
    
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound('wrong');

    $("body").addClass("game-over");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

//startover restart function
function startOver() {
  level=0;
  gamePattern=[]; 
  flag=false;
}