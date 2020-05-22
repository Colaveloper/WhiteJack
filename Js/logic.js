document.querySelector("#hit-button").addEventListener("click", hit);

let bj = {
  you: { scoreSpan: "#your-score", div: "#your-cards", score: 0 },
  bot: { scoreSpan: "#bot-score", div: "#bot-cards", score: 0 },
};

const YOU = bj["you"];
const BOT = bj["bot"];

const hitSound = new Audio("src/Sounds.aww.mp3");

function hit() {
  let cardImage = document.createElement("img");
  cardImage.src = "src/Cards/7d.png";
  document.querySelector(YOU["div"]).appendChild(cardImage);
  hitSound.play();
}
