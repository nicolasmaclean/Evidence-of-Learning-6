let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("uScore");
const computerScore_span = document.getElementById("cScore");
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissors_div = document.getElementById("scissors");
const lizard_div = document.getElementById("lizard");
const spock_div = document.getElementById("spock");
const result_div = document.getElementById("result");
const scoreboard_div = document.getElementById("scoreboard");

function getComputerChoice(){
    const choice = ["r", "p", "s", "l", "sp"];
    const random = Math.floor(Math.random()*5);
    return choice[random];
}

function convertToWord(choice){
    switch(choice){
        case "r" : return "rock";
        case "p" : return "paper";
        case "s" : return "scissors";
        case "l" : return "lizard";
        case "sp" : return "spock";
    }
}

function win(uChoice, cChoice, message){
    userScore++;
    userScore_span.innerHTML = userScore;
    if(userScore > 9)
        scoreboard_div.classList.add('bigBox');
    result_div.innerHTML = message + ". You Win!";
    let div = convertToWord(uChoice);
    document.getElementById(div).classList.add('green');
    setTimeout(function(){document.getElementById(div).classList.remove('green');}, 300);
}

function lose(uChoice, cChoice, message){
    computerScore++;
    computerScore_span.innerHTML = computerScore;
    result_div.innerHTML = message + ". You Lose.";
    let div = convertToWord(uChoice);
    document.getElementById(div).classList.add('red');
    setTimeout(function(){document.getElementById(div).classList.remove('red');}, 300);
}

function draw(uChoice, cChoice){
    result_div.innerHTML = "Draw!";
    console.log("Draw");
    let div = convertToWord(uChoice);
    document.getElementById(div).classList.add('gray');
    setTimeout(function(){document.getElementById(div).classList.remove('gray');}, 300);
}

function game(uChoice){
    cChoice = getComputerChoice();
    switch(uChoice + " " + cChoice){
        //winning cases
        case "r l" : 
            win(uChoice, cChoice, "Rock Crushes Lizard");
            break;
        case "r s" :
            win(uChoice, cChoice, "Rock Crushes Scissors");
            break;
        case "p r" :
            win(uChoice, cChoice, "Paper Covers Rock");
            break;
        case "p sp" :
            win(uChoice, cChoice, "Paper Disproves Spock");
            break;
        case "s p" :
            win(uChoice, cChoice, "Scissors Cuts Paper");
            break;
        case "s l" :
            win(uChoice, cChoice, "Scissors Decapitates Lizard");
            break;
        case "l sp" :
            win(uChoice, cChoice, "Lizard Poisons Spock");
            break;
        case "l p" :
            win(uChoice, cChoice, "Lizard Eats Paper");
            break;
        case "sp s" :
            win(uChoice, cChoice, "Spock Smashes Scissors");
            break;
        case "sp r" :
            win(uChoice, cChoice, "Spock Vaporizes Rock");
            break;
        //losing cases
        case "l r" : 
            lose(uChoice, cChoice, "Rock Crushes Lizard");
            break;
        case "s r" :
            lose(uChoice, cChoice, "Rock Crushes Scissors");
            break;
        case "r p" :
            lose(uChoice, cChoice, "Paper Covers Rock");
            break;
        case "sp p" :
            lose(uChoice, cChoice, "Paper Disproves Spock");
            break;
        case "p s" :
            lose(uChoice, cChoice, "Scissors Cuts Paper");
            break;
        case "l s" :
            lose(uChoice, cChoice, "Scissors Decapitates Lizard");
            break;
        case "sp l" :
            lose(uChoice, cChoice, "Lizard Poisons Spock");
            break;
        case "p l" :
            lose(uChoice, cChoice, "Lizard Eats Paper");
            break;
        case "s sp" :
            lose(uChoice, cChoice, "Spock Smashes Scissors");
            break;
        case "r sp" :
            lose(uChoice, cChoice, "Spock Vaporizes Rock");
            break;
        //draw
        case "r r" :
        case "p p" :
        case "s s" :
        case "l l" :
        case "sp sp" :
            draw(uChoice, cChoice);
            break;
    }
}

function main() {
    rock_div.addEventListener('click', function(){
        game("r")
    });
    paper_div.addEventListener('click', function(){
        game("p")
    });
    scissors_div.addEventListener('click', function(){
        game("s")
    });
    lizard_div.addEventListener('click', function(){
        game("l")
    });
    spock_div.addEventListener('click', function(){
        game("sp")
    });
}

main();