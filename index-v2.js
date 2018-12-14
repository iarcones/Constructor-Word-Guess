var inquirer = require("inquirer");

var Word = require("./word.js");
var Letter = require("./letter.js");

var cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "San Francisco", "Columbus", "FortWorth", "Indianapolis", "Charlotte", "Seattle", "Denver", "Washington", "Boston", "El Paso", "Detroit", "Nashville", "Memphis", "Portland", "Oklahoma City", "Las Vegas", "Louisville", "Baltimore", "Milwaukee", "Albuquerque", "Tucson", "Fresno", "Sacramento", "Mesa", "Kansas City", "Atlanta", "Long Beach", "Omaha", "Raleigh", "Colorado Springs", "Miami", "Virginia Beach", "Oakland", "Minneapolis", "Tulsa", "Arlington", "New Orleans", "Wichita"];

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// console.log(`
//         o
//         |      
//        - -
//         | 
//        ] [
//     `)

console.log(`

  --------------------------------------  

       WELCOME TO THE WORD GUEST GAME    
  UNITED STATES 50 MOST POPULATED CITIES  
  
  --------------------------------------  

  `)

var attempts = 6;
var previousDisplay = "";
var display = "";
var lettersUsed = [];
var gameEnded = false;
var city = "";
var wins = 0;
var lost = 0;


startgame();


function startgame() {


    city = cities[Math.floor(Math.random() * cities.length)].toLocaleLowerCase();
    // console.log(city);

    wordtoGuess = new Word;

    for (i = 0; i < city.length; i++) {
        wordtoGuess.lettersObjects.push(new Letter(city[i]));
    }

    attempts = 6;
    lettersUsed = [];
    gameEnded = false;

    display = wordtoGuess.print();

    console.log(display);

    askLetter();
}


function askLetter() {

    inquirer
        .prompt([
            {
                type: "input",
                message: "letter",
                name: "item"
            },
        ])
        .then(function (response) {

            if (lettersUsed.indexOf(response.item) !== -1) {

                console.log("That letter was clicked before, try other letter. This are all the used letters: " + lettersUsed);

                askLetter();
                return;
            }
            else {
                lettersUsed.push(response.item);
            }
            previousDisplay = display;
            wordtoGuess.verify(response.item);
            display = wordtoGuess.print();

            if (display === previousDisplay) {
                attempts--;

                console.log("***** 😫 ******")
                console.log("You have " + attempts + " attempts left. This are all the used letters: " + lettersUsed);

            }
            else {
                if (display === city) {
                    gameEnded = true;
                }
            }
            console.log(display);

            if (attempts > 0 && gameEnded === false) {
                askLetter();
            }
            else if (gameEnded) {
                console.log("\n" + "***** 👏🏻👏🏻👏🏻 👍🏻 ******")
                console.log("Congrats you win" + "\n");
                wins++;
                askUser();
            }
            else {
                console.log("\n" + "***** 👎🏼👎🏼👎🏼 ******")
                console.log("Sorry you lost" + "\n");
                lost++;
                askUser();
            }
        });
}

function askUser() {
    console.log("this are your stats: wins " + wins + " | lost " + lost  + "\n");
    

    inquirer
        .prompt([
            {
                type: "confirm",
                message: "Do you want other word to guess?",
                name: "confirm",
                default: true
            },
        ])
        .then(function (response) {
            if (response.confirm) {
                startgame();
            }
            else {
                console.log("Bye bye, come back soon");
            }
        });
}