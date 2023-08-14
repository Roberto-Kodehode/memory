import "./SingleCard.css";

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    console.log("clicked");
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="Card front" />
        <img
          className="back"
          src="/img/cover.png"
          onClick={handleClick}
          alt="Card back"
        />
      </div>
    </div>
  );
}
