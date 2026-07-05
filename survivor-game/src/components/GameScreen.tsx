import { useEffect, useRef, useState } from "react";
import { Application } from "pixi.js";
import { Game } from "../core/Game";
import { LevelUpModal } from "./LevelUpModal";

export default function GameScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Game | null>(null);

  const [levelUp, setLevelUp] = useState(false);

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
          onSelect={(weapon) => {
            console.log("선택:", weapon);

            setLevelUp(false);

            // 👉 다음 Commit에서 여기서 무기 적용
          }}
        />
      )}
    </div>
  );
}