const GAME_NODE = document.querySelector("#div-board");
const WIN_TEXT = document.querySelector("#winner");
const RESTART_GAME = document.querySelector("#restart");
const FRONT_IMG = document.createElement("img");
FRONT_IMG.src = "cardFront.jpg";
const VISIBLE_CARD_CLASSNAME = "visible";

const CARD_TIMEOUT = 500;

const CARD_ELEMENTS = ["♥️8", "♥️7", "♦️7", "♦️8", "♠️7", "♠️8", "♣️7", "♣️8"];
const CARD_AMOUNT = 16;
let VISIBLE_CARDS = [];
RESTART_GAME.addEventListener("click", startGame);

function startGame() {
  [GAME_NODE, WIN_TEXT].forEach((element) => (element.innerHTML = ""));
  const CARD_VALUES = generateArrayWithPairs(CARD_ELEMENTS, CARD_AMOUNT);
  CARD_VALUES.forEach(renderCard);
  const renderedCards = document.querySelectorAll(".card");

  renderedCards.forEach((card) => card.classList.add(VISIBLE_CARD_CLASSNAME));

  setTimeout(() => {
    renderedCards.forEach((card) =>
      card.classList.remove(VISIBLE_CARD_CLASSNAME)
    );
  }, CARD_TIMEOUT * 2);
}
function generateArrayWithPairs(emojis, cardAmount) {
  const randomArray = [];
  const elementCounts = {};
  for (const emoji of emojis) {
    elementCounts[emoji] = 0;
  }
  while (randomArray.length < cardAmount) {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    const randomElement = emojis[randomIndex];

    if (elementCounts[randomElement] < 2) {
      randomArray.push(randomElement);
      elementCounts[randomElement]++;
    }
  }
  return randomArray;
}
function renderCard(emoji = "") {
  const card = document.createElement("div");
  card.classList.add("card");
  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");
  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");
  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");
  cardBack.textContent = emoji;
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  card.addEventListener("click", cardClick.bind(this, card));

  GAME_NODE.appendChild(card);
}
function cardClick(card) {
  if (card.classList.contains(VISIBLE_CARD_CLASSNAME)) {
    return;
  }
  const checkVictory = () => {
    const visibleCardNotes = document.querySelectorAll(
      `.${VISIBLE_CARD_CLASSNAME}`
    );
    const isVictory = visibleCardNotes.length === CARD_AMOUNT;
    const victoryMessage = "You Win!";
    if (isVictory) {
      WIN_TEXT.textContent = victoryMessage;
    }
  };
  card
    .querySelector(".card-inner")
    .addEventListener("transitionend", checkVictory);
  card.classList.add(VISIBLE_CARD_CLASSNAME);

  VISIBLE_CARDS.push(card);

  if (VISIBLE_CARDS.length % 2 !== 0) {
    return;
  }
  const [preLastCard, lastCard] = VISIBLE_CARDS.slice(-2);
  if (lastCard.textContent !== preLastCard.textContent) {
    VISIBLE_CARDS = VISIBLE_CARDS.slice(0, VISIBLE_CARDS.length - 2);
    setTimeout(() => {
      [lastCard, preLastCard].forEach((card) =>
        card.classList.remove(VISIBLE_CARD_CLASSNAME)
      );
    }, CARD_TIMEOUT);
  }
}
startGame();
