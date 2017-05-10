import * as BABYLON from 'babylonjs';

export enum TileType {
  PLANE,
  SLOPE
}

export interface ITileFactoryParams {
  scene: BABYLON.Scene;
}

export interface IHexagonalTileParams {
  meshInstance: BABYLON.InstancedMesh;
}
