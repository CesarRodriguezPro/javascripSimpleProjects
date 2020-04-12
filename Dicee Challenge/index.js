function randomNumber1(){
    var number1 = Math.floor((Math.random() * 6)+1);
    document.querySelector('img').setAttribute('src',"images/dice"+number1+".png" );
    return number1
}

function randomNumber2(){
    var number2 = Math.floor((Math.random() * 6)+1);
    document.querySelectorAll('img')[1].setAttribute('src', "images/dice"+number2+".png");
    return number2
}

function changeLabel(number1, number2){
    if(number1 > number2){
        document.querySelector('h1').innerText = 'Player 1 Wins';
    }else if(number1 < number2) {
        document.querySelector('h1').innerText = 'Player 2 Wins';
    } else {
        document.querySelector('h1').innerText = 'Draw';
    }
}

function activate(){
    var number1 = randomNumber1();
    var number2 = randomNumber2();
    changeLabel(number1, number2);
}