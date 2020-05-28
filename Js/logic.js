document.querySelector("#hit-button").addEventListener("click", hit);
document.querySelector("#stand-button").addEventListener("click", botLogic);

let wj = {
  you: { scoreSpan: "#your-score", div: "#your-cards", score: 0 },
  bot: { scoreSpan: "#bot-score", div: "#bot-cards", score: 0 },
  cards: [
    "1b",
    "1c",
    "1d",
    "1s",

    "2b",
    "2c",
    "2d",
    "2s",

    "3b",
    "3c",
    "3d",
    "3s",

    "4b",
    "4c",
    "4d",
    "4s",

    "5b",
    "5c",
    "5d",
    "5s",

    "6b",
    "6c",
    "6d",
    "6s",

    "7b",
    "7c",
    "7d",
    "7s",

    "8b",
    "8c",
    "8d",
    "8s",

    "9b",
    "9c",
    "9d",
    "9s",

    "10b",
    "10c",
    "10d",
    "10s",
  ],
  wins: 0,
  draws: 0,
  losses: 0,
  isStand: false,
  turnsAreOver: false,
  standable: false,
};

const YOU = wj["you"];
const BOT = wj["bot"];
const CARDS = wj["cards"];

const hitSound = new Audio("src/Sounds/swish.m4a");
const cashSound = new Audio("src/Sounds/cash.mp3");
const awwSound = new Audio("src/Sounds/aww.mp3");
const currentPlayer = YOU;

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 40);
  return wj.cards[randomIndex];
}

function hit() {
  hideResult();
  wj.turnsAreOver = false;
  if (wj.isStand == false) {
    if (currentPlayer.score <= 17) {
      let card = randomCard();
      displayCard(card, YOU);
      updateScore(card, YOU);
      displayScore(YOU);
    }
    if (YOU.score > 17) {
      document.querySelector("#your-score").textContent = "SBALLATO!";
      document.querySelector("#your-score").style.color = "yellow";
    }
    wj.standable = true;
  }
}

function displayCard(card, currentPlayer) {
  let cardImage = document.createElement("img");
  cardImage.src = `src/Cards/${card}.png`;
  document.querySelector(currentPlayer["div"]).appendChild(cardImage);
  hitSound.play();
}

async function deal() {
  if (wj.turnsAreOver == true) {
    showResult(computeWinner());
    wj.isStand = false;
    const yourCards = document
      .querySelector("#your-cards")
      .querySelectorAll("img");
    await sleep(2000);
    for (i = 0; i < yourCards.length; i++) {
      yourCards[i].remove();
    }
    let botCards = document.querySelector("#bot-cards").querySelectorAll("img");
    for (i = 0; i < botCards.length; i++) {
      botCards[i].remove();
    }

    YOU.score = 0;
    BOT.score = 0;
    document.querySelector("#your-score").textContent = "0";
    document.querySelector("#bot-score").textContent = "0";
    document.querySelector("#your-score").style.color = "white";
    document.querySelector("#bot-score").style.color = "white";
    wj.turnsAreOver = false;
  }
}

function updateScore(card, currentPlayer) {
  currentPlayer.score += parseInt(card.slice(0, -1));
}

function displayScore(currentPlayer) {
  if (currentPlayer == YOU) {
    document.querySelector("#your-score").textContent = currentPlayer.score;
  } else {
    document.querySelector("#bot-score").textContent = currentPlayer.score;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function botLogic() {
  if (wj.standable == true) {
    wj.isStand = true;
    if (wj.turnsAreOver == false) {
      wj.turnsAreOver = true;
      let card = randomCard();
      displayCard(card, BOT);
      updateScore(card, BOT);
      displayScore(BOT);
      await sleep(1000);
    }
    while (
      BOT.score < YOU.score &&
      BOT.score < 17 &&
      YOU.score <= 17 &&
      wj.isStand == true
    ) {
      let card = randomCard();
      displayCard(card, BOT);
      updateScore(card, BOT);
      displayScore(BOT);
      if (BOT.score > 17) {
        document.querySelector("#bot-score").textContent = "SBALLATO!";
        document.querySelector("#bot-score").style.color = "yellow";
      }
      await sleep(1000);
    }

    deal();
  }
}

function computeWinner() {
  let winner;
  console.log(YOU.score);
  console.log(BOT.score);
  if (YOU.score <= 17)
    if (YOU.score > BOT.score || BOT.score > 17) {
      winner = YOU;
    } else if (YOU.score < BOT.score) {
      winner = BOT;
    }
  if (YOU.score > 17 && BOT.score <= 17) {
    winner = BOT;
  }

  return winner;
}

function showResult(winner) {
  if ((wj.turnsAreOver = true)) {
    let message, messageColor;
    if (winner == YOU) {
      wj.wins++;
      document.querySelector("#wins-number").textContent = wj.wins;
      message = "Vittoria!";
      messageColor = "#32BEE8";
      cashSound.play();
    }
    if (winner == BOT) {
      wj.losses++;
      document.querySelector("#losses-number").textContent = wj.losses;
      message = "Hai perso!";
      messageColor = "#EAAE0E";
      awwSound.play();
    } else if (winner == undefined) {
      wj.draws++;
      document.querySelector("#draws-number").textContent = wj.draws;
      message = "Pareggio";
      messageColor = "#0B983A";
    }
    document.querySelector("#result-message").textContent = message;
    document.querySelector("#result-message").style.color = messageColor;
  }
}

function hideResult() {
  document.querySelector("#result-message").textContent = "";
}

// Now on I'll care bout languages

document.querySelector("#language").addEventListener("click", switchLanguage);
let languageIsEnglish = false;

function switchLanguage() {
  if (languageIsEnglish == false) {
    document.querySelector("#you").textContent = "You: ";
    document.querySelector("#bot").textContent = "Bot: ";
    document.querySelector("#result-message").innerHTML =
      "Hey bro! <br> How close to 17 will you be able to get without exceeding it?";
    document.querySelector("#wins-title").textContent = "Wins: ";
    document.querySelector("#losses-title").textContent = "Losses: ";
    document.querySelector("#draws-title").textContent = "Draws: ";
    document.querySelector("#hit-button").textContent = "hit";
    document.querySelector("#stand-button").textContent = "stand";
    document.querySelector("#language").textContent = "Versione italiana";
  } else {
    document.querySelector("#you").textContent = "Punteggio: ";
    document.querySelector("#bot").textContent = "Computer: ";
    document.querySelector("#result-message").innerHTML =
      "Ciao! <br/> Quanto vicino a 17 riuscirai ad arrivare senza superarlo?";
    document.querySelector("#wins-title").textContent = "Vincite: ";
    document.querySelector("#losses-title").textContent = "Perdite: ";
    document.querySelector("#draws-title").textContent = "Pareggi: ";
    document.querySelector("#hit-button").textContent = "carta";
    document.querySelector("#stand-button").textContent = "stai";
    document.querySelector("#language").textContent = "English version";
  }
  languageIsEnglish = !languageIsEnglish;
}
