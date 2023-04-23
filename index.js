let userClickedPattern=[];

let buttonColours=["red", "blue", "green", "yellow"];

let gamePattern=[];

$(".btn").click(handler);
function handler(event)
{
    let userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    let len=userClickedPattern.length-1;
    checkAnswer(len);
}


function nextSequence()
{
    let randomNumber=Math.floor(Math.random()*4);
    let randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    level = level + 1;
    $("#level-title").text("level "+level);
}


function playSound(name)
{
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
    
}


function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function()
    {
        $("#"+currentColour).removeClass("pressed");
    },100);
}

let level=0;
let started=1;


$(document).keydown(function()
{
    if(started)
    {
        started=0;
    nextSequence();
    }
});


function checkAnswer(currentLevel)
{
     if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
     {
        if(currentLevel==(gamePattern.length-1))
        {
            setTimeout(function()
            {
                userClickedPattern.splice(0,userClickedPattern.length);
                nextSequence();
            },1000);
        }
     }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
     }
} 

function startOver()
{
   level=0;
   started=1;
   gamePattern.splice(0,gamePattern.length);
   userClickedPattern.splice(0,userClickedPattern.length);
}