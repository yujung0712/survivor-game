import { useEffect, useRef } from "react";
import { Application } from "pixi.js";
import { Game } from "../core/Game";

export default function GameScreen() {
  const containerRef = useRef<HTMLDivElement>(null);

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

      new Game(app);
    };

    init();

    return () => {
      app?.destroy(true);
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
}