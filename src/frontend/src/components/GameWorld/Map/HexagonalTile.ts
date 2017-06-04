import * as BABYLON from 'babylonjs';
import * as HexTools from 'hex-tools';

export interface IHexagonalTileParams extends HexTools.IHexagonParams {
  meshInstance: BABYLON.Mesh;
  height: number;
  // meshInstance: BABYLON.InstancedMesh;
}

export class HexagonalTile extends HexTools.Hexagon {
  // public readonly meshInstance: BABYLON.InstancedMesh;
  public readonly meshInstance: BABYLON.Mesh;
  public height: number;

  constructor(params: IHexagonalTileParams) {
    super(params);
    this.meshInstance = params.meshInstance;
    this.height = params.height;
  }
}
