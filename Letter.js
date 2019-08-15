const Letter = function(char){

    this.char = char;
    this.guessed = false;

    this.show = function(){
        if (this.guessed){
            return this.char
        }
        else {
            return "_"
        }
    }
    this.guess = function(str){
        if (this.char === str){
            this.guessed = true

            // this is not clear in the instructions but need to have a way to verify that the letter was found or not to show a message to the user
            return true
        }
    }

}

module.exports = Letter;