import * as BABYLON from 'babylonjs';

export class Hexagon {
  public static readonly SIZE = 48;
  public static readonly HEIGHT = Hexagon.SIZE * 2;
  public static readonly WIDTH = Math.sqrt(3) / 2 * Hexagon.HEIGHT;
  public static readonly VERTICAL_DISTANCE = Hexagon.HEIGHT * 3 / 4;
  public static readonly HORIZONTAL_DISTANCE = Hexagon.WIDTH;

  protected position: BABYLON.Vector2;
}
