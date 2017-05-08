import * as BABYLON from 'babylonjs';

import {Hexagon} from './Hexagon';
import {IHexagonalTileParams} from './Types';

export class HexagonalTile extends Hexagon {
  public readonly meshInstance: BABYLON.InstancedMesh;

  protected gridPosition: BABYLON.Vector2;

  constructor(params: IHexagonalTileParams) {
    super();
    this.meshInstance = params.meshInstance;
   }

  set position(vector: BABYLON.Vector2) {
    this.gridPosition = vector;
    let xOffset: number;

    if (this.gridPosition.y % 2) {
      xOffset = HexagonalTile.WIDTH / 2;
    } else {
      xOffset = 0;
    }

    this.meshInstance.position = new BABYLON.Vector3(
      this.gridPosition.x * HexagonalTile.HORIZONTAL_DISTANCE + xOffset,
      0,
      this.gridPosition.y * HexagonalTile.VERTICAL_DISTANCE
    );
  }
}
