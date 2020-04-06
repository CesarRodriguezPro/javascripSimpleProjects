// animations//
$(".btn").on("click", function() {
  var keyPress = $("#" + this.id);
  keyPress.addClass('pressed');
  setTimeout(function() {
    keyPress.removeClass('pressed');
  }, 30);
});


// save keys press //
var listClicks=[];
$('.btn').on("click", function(){
    listClicks.push(this.id);
});


// create ramdon siquence
randownNumber = Math.floor(Math.random() * 4) +1;
var listOfRamdownNumbers = [];
