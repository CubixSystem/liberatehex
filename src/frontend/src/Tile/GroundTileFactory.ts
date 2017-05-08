import * as BABYLON from 'babylonjs';

import * as Tools from './../Tools';
import {TileFactory} from './TileFactory';
import {ITileFactoryParams} from './Types';

export class GroundTileFactory extends TileFactory {
  protected material: BABYLON.StandardMaterial[];

  constructor(params: ITileFactoryParams) {
    super(params);

    this.material = [
      new BABYLON.StandardMaterial('texture', this.scene)
    ];
    this.material[0].diffuseTexture = new BABYLON.Texture(
      'assets/textures/Ground.png',
      this.scene);
    this.material[0].specularColor = new BABYLON.Color3(0, 0, 0);

    this.meshes.plane.material = this.material[Tools.General.getRandomArbitrary(0, 0)];
  }
}
