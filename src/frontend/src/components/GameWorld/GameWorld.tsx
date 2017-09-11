import * as React from "react";

import { Game } from "./Game";

export class GameWorld extends React.Component<object, object> {
  protected canvas: HTMLCanvasElement | null;

  public render() {
    return <canvas
      ref={(element) => this.canvas = element}
      width="988"
      height="500">
    </canvas>;
  }

  public componentDidMount() {
    if (this.canvas) {
      const game = new Game(this.canvas);

      // Create the scene
      game.createScene();
    }
  }
}
