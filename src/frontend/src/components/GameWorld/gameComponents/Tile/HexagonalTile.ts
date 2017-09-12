import * as BABYLON from "babylonjs";
import * as HexTools from "hex-tools";

import { TileDirection } from "GameWorld/gameComponents";
import { TileShape, TileType } from "GameWorld/tiles";

export interface IHexagonalTileParams extends HexTools.IHexagonParams {
  meshInstance: BABYLON.InstancedMesh | BABYLON.Mesh;
  height: number;
  shape: TileShape;
  type: TileType;
  direction: TileDirection;
}

export class HexagonalTile extends HexTools.Hexagon {
  public height: number;
  public readonly meshInstance: BABYLON.InstancedMesh | BABYLON.Mesh;
  public readonly shape: TileShape;
  public readonly type: TileType;
  public readonly direction: TileDirection;

  constructor(params: IHexagonalTileParams) {
    super(params);
    this.meshInstance = params.meshInstance;
    this.height = params.height;
    this.shape = params.shape;
    this.type = params.type;
    this.direction = params.direction;
  }
}
