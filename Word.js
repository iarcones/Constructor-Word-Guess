const Letter = require("./letter");


const Word = function(randomword){

    // this is not clear in the assigment instructions, the way to fill the array

    this.wordArray = randomword.split("").map(letter => {return new Letter(letter)})
    this.word = randomword
    this.guessleft = 10
    this.lettersclicked = []

    this.display = function(){
        let dispWord = ""
        this.wordArray.map(letter => {
            dispWord += letter.show(letter.char)
        })
    
        return dispWord.split("").join(" ");

    }
    this.verify = function(str){
        let foundYorN = false
        this.wordArray.map(letter => {
            if(letter.guess(str)){foundYorN = true}
        })
        return foundYorN
    }
    
}

module.exports = Word;