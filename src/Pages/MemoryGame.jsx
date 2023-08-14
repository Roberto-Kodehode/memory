import { useEffect, useState } from "react";
import SingleCard from "../Components/SingleCard/SingleCard";

const cardImages = [
  { src: "/img/card1.png", matched: false },
  { src: "/img/card2.png", matched: false },
  { src: "/img/card3.png", matched: false },
  { src: "/img/card4.png", matched: false },
  { src: "/img/card5.png", matched: false },
  { src: "/img/card6.png", matched: false },
  { src: "/img/card7.png", matched: false },
  { src: "/img/card8.png", matched: false },
  { src: "/img/card9.png", matched: false },
  { src: "/img/card10.png", matched: false },
  { src: "/img/card11.png", matched: false },
  { src: "/img/card12.png", matched: false },
];

export function MemoryGame() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerName, setPlayerName] = "";

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const handleLeaderboardSubmit = (e) => {
    e.preventDefault();
    setLeaderboard([...leaderboard, { name: playerName, turns }]);
    setPlayerName("");
  };

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  //  start auto
  useEffect(() => {
    shuffleCards;
  }, []);

  return (
    <div>
      <div>
        <button onClick={shuffleCards}>New game</button>
        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
        <p>Turns: {turns}</p>
      </div>
    </div>
  );
}
