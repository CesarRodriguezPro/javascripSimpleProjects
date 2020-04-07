


var listOfRamdownColors = [];
var listClicks=[];


// create ramdon sequence and save it in a list
var listOfColors = ['green', 'yellow', 'blue', 'red']
var randownNumber = Math.floor(Math.random() * 4) +1;
function createRamdowNumber(){
  listOfRamdownColors.push(listOfColors[randownNumber])
  return listOfColors[randownNumber]
}


// animations and play sounds //
function animationsInButtons(colorPress){
  var keyPress = $('#'+colorPress);
  keyPress.addClass('pressed');
  playSoundEffects(colorPress);
  setTimeout(function() {
    keyPress.removeClass('pressed');
  }, 30);
}

function playSoundEffects(colorPress){
  switch (colorPress) {
      case 'green':
          var green = new Audio('sounds/green.mp3');
          green.play();
          break;
      case 'blue':
          var blue = new Audio('sounds/blue.mp3');
          blue.play();
          break;
      case 'yellow':
          var yellow = new Audio('sounds/yellow.mp3');
          yellow.play();
          break;
      case 'red':
          var red = new Audio('sounds/red.mp3');
          red.play();
          break;
        }
}


// Keys Press  //
$('.btn').on("click", function(){
    listClicks.push(this.id);
    animationsInButtons(this.id);
    
    try{
        for(var i=0; i < listClicks.length; i++){
          if(listOfRamdownColors[i] === listClicks[i]){
              createRamdowNumber();
          };
        };
    }catch (error){
      console.log('no match')
    }
});


function startGames(){
  var colorRamdon = createRamdowNumber();
  animationsInButtons(colorRamdon);

}


// control Function  //
function controlSequence(){
  document.addEventListener('keypress', function (event) {
    setTimeout(function() {
      startGames();
    }, 100);
  });
}

controlSequence()
