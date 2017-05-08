import {Game} from './Game';
import './UI';

window.addEventListener('DOMContentLoaded', () => {
  const canvasElement = document.getElementById('renderCanvas') as HTMLCanvasElement;
  const game = new Game(canvasElement);

  // Create the scene
  game.createScene();
});
