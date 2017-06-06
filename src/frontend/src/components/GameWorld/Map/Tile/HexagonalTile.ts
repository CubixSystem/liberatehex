import * as BABYLON from 'babylonjs';
import * as HexTools from 'hex-tools';

import { TileDirection, TileType } from '../TileFactory';

export interface IHexagonalTileParams extends HexTools.IHexagonParams {
  meshInstance: BABYLON.Mesh;
  height: number;
  type: TileType;
  direction: TileDirection;
  // meshInstance: BABYLON.InstancedMesh;
}

export class HexagonalTile extends HexTools.Hexagon {
  // public readonly meshInstance: BABYLON.InstancedMesh;
  public height: number;
  public readonly meshInstance: BABYLON.Mesh;
  public readonly type: TileType;
  public readonly direction: TileDirection;

  constructor(params: IHexagonalTileParams) {
    super(params);
    this.meshInstance = params.meshInstance;
    this.height = params.height;
    this.type = params.type;
    this.direction = params.direction;
  }
}
