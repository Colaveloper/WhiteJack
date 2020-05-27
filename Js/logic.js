document.querySelector("#hit-button").addEventListener("click", hit);
document.querySelector("#deal-button").addEventListener("click", deal);
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
  }
}

function displayCard(card, currentPlayer) {
  let cardImage = document.createElement("img");
  cardImage.src = `src/Cards/${card}.png`;
  document.querySelector(currentPlayer["div"]).appendChild(cardImage);
  hitSound.play();
}

function deal() {
  if (wj.turnsAreOver == true) {
    wj.isStand = false;
    const yourCards = document
      .querySelector("#your-cards")
      .querySelectorAll("img");
    for (i = 0; i < yourCards.length; i++) {
      yourCards[i].remove();
    }
    let botCards = document.querySelector("#bot-cards").querySelectorAll("img");
    for (i = 0; i < botCards.length; i++) {
      botCards[i].remove();
    }

    showResult(computeWinner());
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
  wj.isStand = true;
  while (BOT.score <= YOU.score && wj.isStand == true) {
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
  wj.turnsAreOver = true;
  showResult(computeWinner);
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
