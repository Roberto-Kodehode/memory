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
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [playerName, setPlayerName] = useState(""); // State to store player's name
  const [flippedCards, setFlippedCards] = useState(0); // State to keep track of flipped cards

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  //

  const handleLeaderboardSubmit = () => {
    // Save player name and turns in local storage
    const playerData = JSON.stringify({ name: playerName, turns });
    localStorage.setItem("playerData", playerData);
  };

  useEffect(() => {
    // Check for match when choiceTwo is selected
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setFlippedCards(flippedCards + 2);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (flippedCards === cardImages.length) {
      // All cards are flipped, show name input
      const playerName = prompt("Enter your name:");
      setPlayerName(playerName);
      handleLeaderboardSubmit();
    }
  }, [flippedCards]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(turns + 1);
    setDisabled(false);
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
    if (choiceOne && choiceTwo) return;
    if (!choiceOne) setChoiceOne(card);
    else if (choiceOne && !choiceTwo) setChoiceTwo(card);
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

  //  start auto
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div>
      {playerName ? (
        <div>
          <button onClick={shuffleCards}>New game</button>
          <p>Turns: {turns}</p>
          <div className="card-grid">
            {cards.map((card) => (
              <SingleCard
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={
                  card === choiceOne || card === choiceTwo || card.matched
                }
                disabled={disabled}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p>Enter your name to start the game:</p>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
