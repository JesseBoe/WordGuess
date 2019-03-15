var ManySecretWords = ['tail',
    'guard',
    'prevent',
    'license',
    'coach',
    'handy',
    'ship',
    'lyrical',
    'balance',
    'busy',
    'scrape',
    'habitual',
    'monkey',
    'meaty',
    'plant',
    'group',
    'pink',
    'hole',
    'jealous',
    'bored',
    'nonchalant',
    'capable',
    'cattle',
    'cowardly',
    'tawdry',
    'precious',
    'record',
    'robust',
    'space',
    'vivacious',
    'faint',
    'bear',
    'selfish',
    'lively',
    'amused',
    'marvelous',
    'near',
    'nutritious',
    'lush',
    'romantic',
    'unnatural',
    'satisfying',
    'dolls',
    'army',
    'itchy',
    'bite-sized'];

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var game = {
    wins: 0,
    NumberOfWrongGuessesRemaining: 10,
    lettersGuessed: [],
    secretWordState: "",
    secretWord: "",
    reset: function () {
        this.NumberOfWrongGuessesRemaining = 10;
        this.lettersGuessed = [];
        this.secretWord = ManySecretWords[Math.floor(Math.random() * ManySecretWords.length)];
        this.secretWordState = "";

        document.getElementById("Wrong").textContent = "";
        document.getElementById("Guesses").textContent = this.NumberOfWrongGuessesRemaining;
        document.getElementById("Wins").textContent = this.wins;

        for (let i = 0; i < this.secretWord.length; i++) {
            this.secretWordState += "_ ";
        }

        document.getElementById("Word").textContent = this.secretWordState;
    }
};

game.secretWord = ManySecretWords[Math.floor(Math.random() * ManySecretWords.length)];

console.log(game.secretWord);

for (let i = 0; i < game.secretWord.length; i++) {
    game.secretWordState += "_ ";
}

document.getElementById("Word").textContent = game.secretWordState;

function setCharAt(str, index, chr) {
    if (index > str.length - 1)
        return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}

document.onkeyup = function (event) {

    if (game.NumberOfWrongGuessesRemaining < 1) {
        alert("You have lost! The word was: " + game.secretWord + ". Thank you for playing.");
        removeEventListener(document.onkeyup, this);
    }
    else {
        var letter = event.key;
        letter = letter.toLowerCase();
        if (alphabet.indexOf(letter) !== -1) {
            if (game.lettersGuessed.indexOf(letter) !== -1) {
                alert("You already guessed this letter!");
            }
            else {
                // User has guessed a valid letter
                if (game.secretWord.indexOf(letter) !== -1) {
                    // Player guessed something correctly!
                    for (let i = 0; i < game.secretWord.length; i++) {
                        const element = game.secretWord[i];
                        if (game.secretWord[i] == letter) {
                            game.secretWordState = setCharAt(game.secretWordState, i * 2, letter);
                            document.getElementById("Word").textContent = game.secretWordState;
                        }
                    }
                    game.lettersGuessed.push(letter);
                }
                else {
                    //Player guessed incorrectly
                    game.NumberOfWrongGuessesRemaining -= 1;
                    game.lettersGuessed.push(letter);
                    document.getElementById("Wrong").textContent += letter;
                    document.getElementById("Guesses").textContent = game.NumberOfWrongGuessesRemaining;
                    if (game.NumberOfWrongGuessesRemaining < 1) {
                        alert("You have lost! The word was: " + game.secretWord + ". Thank you for playing.");
                        removeEventListener(document.onkeyup, this);
                    }
                }
            }
        }
        else {
            //alert("Invalid input");
        }

        if (game.secretWordState.indexOf("_") == -1) {
            game.wins++;
            alert("You win! The word was: " + game.secretWord + ".");
            game.reset();
        }
    }


};