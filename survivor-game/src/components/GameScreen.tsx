import { useEffect, useRef, useState } from "react";
import { Application } from "pixi.js";
import { Game } from "../core/Game";
import { LevelUpModal } from "./LevelUpModal";

export default function GameScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Game | null>(null);

  const [levelUp, setLevelUp] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);


  useEffect(() => {
  if (!levelUp) return;

  setTimeLeft(15);

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);

        const cards = ["FIRE", "ICE", "LIGHTNING"] as const;
        const random =
          cards[Math.floor(Math.random() * cards.length)];

        console.log("자동 선택:", random);

        gameRef.current?.resumeGame();
        setLevelUp(false);

        return 15;
      }

      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [levelUp]);

  useEffect(() => {
    let app: Application | null = null;

    const init = async () => {
      app = new Application();

      await app.init({
        resizeTo: window,
        backgroundColor: 0x111111,
        antialias: true,
      });

      containerRef.current?.appendChild(app.canvas);

      const game = new Game(app);
      gameRef.current = game;

      // ✅ 레벨업 연결 핵심
      game.setLevelUpCallback(() => {
        setLevelUp(true);
        setTimeLeft(15);
      });
    };

    init();

    return () => {
      app?.destroy(true);
    };
  }, []);

  return (
    <div>
      <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />

      {levelUp && (
        <LevelUpModal
  timeLeft={timeLeft}
  onSelect={(weapon) => {
    console.log("선택:", weapon);

    gameRef.current?.resumeGame();

    setLevelUp(false);
  }}
/>
      )}
    </div>
  );
}