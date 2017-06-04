import * as BABYLON from 'babylonjs';

import { HexagonalTile } from './Map';

export interface ILocalWorldParams {
  daytime: Date;
  scene: BABYLON.Scene;
}

export default class LocalWorld {
  protected daytime: Date;
  protected scene: BABYLON.Scene;
  protected size: BABYLON.Vector2;
  protected tiles: HexagonalTile[];

  constructor(params: ILocalWorldParams) {
    this.daytime = params.daytime;
    this.scene = params.scene;
  }
}
