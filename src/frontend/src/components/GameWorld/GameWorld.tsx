import * as React from 'react';

import {Game} from './Game';

export class GameWorld extends React.Component<object, void> {
  protected canvas: HTMLCanvasElement;

  public render() {
    return <canvas
      ref={(element) => this.canvas = element}
      width='750'
      height='500'>
      </canvas>;
  }

  protected componentDidMount() {
    const game = new Game(this.canvas);

    // Create the scene
    game.createScene();
  }
}
