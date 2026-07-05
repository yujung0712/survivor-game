import React from "react";

type Weapon = "FIRE" | "ICE" | "LIGHTNING";

interface Props {
  onSelect: (weapon: Weapon) => void;
}

export const LevelUpModal: React.FC<Props> = ({ onSelect }) => {
  const cards: Weapon[] = ["FIRE", "ICE", "LIGHTNING"];

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <h2>LEVEL UP!</h2>

        <div style={styles.cards}>
          {cards.map((card) => (
            <button
              key={card}
              style={styles.card}
              onClick={() => onSelect(card)}
            >
              {card}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: any = {
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    background: "#222",
    padding: 20,
    borderRadius: 10,
    color: "white",
  },
  cards: {
    display: "flex",
    gap: 10,
    marginTop: 10,
  },
  card: {
    padding: 20,
    cursor: "pointer",
  },
};