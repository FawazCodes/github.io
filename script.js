const inputGuess = document.getElementById("inputGuess");
const btnSubmit = document.getElementById("btnSubmit");
const result = document.getElementById("result");
const attempts = document.getElementById("attempts");

let correctNumber = generateUniqueNumber();
let incorrectGuesses = 0;

btnSubmit.addEventListener("click", () => {
    const guess = inputGuess.value;
    if (guess.length !== 4) {
        alert("Please enter a 4-digit number.");
        return;
    }
    
    if (!isValidNumber(guess)) {
        alert("Please enter a number with no repeating digits.");
        return;
    }

    if (guess.toString() === correctNumber.toString()) {
        result.textContent = "Congratulations! You guessed the correct number!";
        attempts.textContent = "";
        correctNumber = generateUniqueNumber();
        incorrectGuesses = 0;
    } else {
        const { correctPosition, correctDigits } = evaluateGuess(guess, correctNumber);
        result.textContent = `+${correctPosition} -${correctDigits - correctPosition}`;
        incorrectGuesses++;

        if (incorrectGuesses === 5) {
            result.textContent = `You have reached 5 incorrect guesses. You lost! The correct number was ${correctNumber}.`;
            attempts.textContent = "";
            correctNumber = generateUniqueNumber();
            incorrectGuesses = 0;
        } else {
            attempts.textContent = `Incorrect guesses: ${incorrectGuesses}`;
        }
    }
});

function generateUniqueNumber() {
    let number = "";
    while (number.length < 4) {
        const digit = Math.floor(Math.random() * 10);
        if (number.indexOf(digit) === -1) {
            number += digit;
        }
    }
    return number;
}

function isValidNumber(number) {
    return !(/(\d).*\1/.test(number));
}

function evaluateGuess(guess, correctNumber) {
    let correctPosition = 0;
    let correctDigits = 0;

    for (let i = 0; i < 4; i++) {
        if (guess[i] === correctNumber[i]) {
            correctPosition++;
        } else if (correctNumber.includes(guess[i])) {
            correctDigits++;
        }
    }
    return { correctPosition, correctDigits: correctDigits + correctPosition };
}
