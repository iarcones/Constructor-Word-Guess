const inquirer = require("inquirer");
const randomWords = require("random-words");
const Word = require("./word");
const colors = require("colors");

const game = () => {
  
  console.log("\n******************************".blue);
  console.log("Welcome to the word guess game".toUpperCase().blue);
  console.log("******************************".blue);
  let newWord = new Word(randomWords(1)[0]);
  //console.log(newWord);
  let rightORwrong = false;

  const display = () => {

    //console.log("\n******************************".blue);
    console.log("\nthe word: ".blue, newWord.display());
    console.log("letters guessed: ".blue, newWord.lettersclicked.join(" "));
    console.log("attemps left: ".blue, newWord.guessleft, "\n");
    //console.log("******************************\n".blue);
  }

  const validations = (val) => {
    if (/[a-z]/gi.test(val) === false || val.length !== 1) {
      console.log("\n\nsorry the input need to be a letter\n".red);
    } else if (newWord.lettersclicked.indexOf(val.toLowerCase()) !== -1) {
      console.log("\n\nthe letter was clicked before\n".red);
    } else {
      return true;
    }
  }

  const win = () =>  {
    display();
    console.log("\n*** YOU DID IT ***\n".rainbow);
    askplay();
  }

  const lost = () => {
    display();
    console.log(
      "\nNo guesses left! Word was: ".yellow,
      newWord.word.toUpperCase().bgYellow.black,
      "\n"
    );
    askplay();
  }

  const askplay = () => {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "choice",
          message: "Do you want to play again?"
        }
      ])
      .then(function(res) {
        if (res.choice) {
          game();
        } else {
          quit();
        }
      });
  }

  const quit = () => {
    console.log("\nGoodbye!");
    process.exit(0);
  }
 
  const askletter = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "choice",
          message: "Guess a letter!",
          validate: function(val) {
            // The users guess must be a number or letter
            return validations(val);
          }
        }
      ])
      .then(function(res) {
        let choice = res.choice.toLowerCase();
        newWord.lettersclicked.push(choice);
        rightORwrong = newWord.verify(choice);

        if (!rightORwrong) {
          newWord.guessleft--;
        }
        if (newWord.guessleft === 0) {
          lost();
        } else if (!newWord.display().includes("_")) {
          win();
        } else {
          display();
          askletter();
        }
      });
  };


  display();

  askletter();
};

game();
